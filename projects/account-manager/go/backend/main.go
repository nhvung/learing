package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

// ---------------------------------------------------------------------------
// Domain model
// ---------------------------------------------------------------------------

type Account struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Address     string `json:"address"`
	Email       string `json:"email"`
	Status      int    `json:"status"`
	CreatedTime int64  `json:"created_time"`
	UpdatedTime int64  `json:"updated_time"`
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

func addCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// isPgDuplicate returns true when err is a PostgreSQL unique-violation (23505).
func isPgDuplicate(err error) bool {
	return err != nil && strings.Contains(err.Error(), "23505")
}

// ---------------------------------------------------------------------------
// Database bootstrap
// ---------------------------------------------------------------------------

func initSchema(db *pgxpool.Pool) error {
	_, err := db.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS accounts (
			id           SERIAL PRIMARY KEY,
			name         VARCHAR(255) NOT NULL,
			address      TEXT,
			email        VARCHAR(255) UNIQUE,
			status       SMALLINT NOT NULL DEFAULT 1,
			created_time BIGINT NOT NULL,
			updated_time BIGINT NOT NULL
		)
	`)
	return err
}

// ---------------------------------------------------------------------------
// CRUD helpers
// ---------------------------------------------------------------------------

func listAccounts(db *pgxpool.Pool) ([]Account, error) {
	rows, err := db.Query(context.Background(),
		`SELECT id, name, COALESCE(address,''), COALESCE(email,''), status, created_time, updated_time
		 FROM accounts ORDER BY id`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var accounts []Account
	for rows.Next() {
		var a Account
		if err := rows.Scan(&a.ID, &a.Name, &a.Address, &a.Email, &a.Status, &a.CreatedTime, &a.UpdatedTime); err != nil {
			return nil, err
		}
		accounts = append(accounts, a)
	}
	if accounts == nil {
		accounts = []Account{}
	}
	return accounts, rows.Err()
}

func getAccount(db *pgxpool.Pool, id int64) (*Account, error) {
	var a Account
	err := db.QueryRow(context.Background(),
		`SELECT id, name, COALESCE(address,''), COALESCE(email,''), status, created_time, updated_time
		 FROM accounts WHERE id = $1`, id).
		Scan(&a.ID, &a.Name, &a.Address, &a.Email, &a.Status, &a.CreatedTime, &a.UpdatedTime)
	if err != nil {
		return nil, err
	}
	return &a, nil
}

func createAccount(db *pgxpool.Pool, name, email, address string, status int, createdTime int64) (*Account, error) {
	now := time.Now().UnixMilli()
	if status == 0 {
		status = 1
	}
	if createdTime == 0 {
		createdTime = now
	}
	var emailArg interface{}
	if strings.TrimSpace(email) != "" {
		emailArg = strings.TrimSpace(email)
	}
	var a Account
	err := db.QueryRow(context.Background(),
		`INSERT INTO accounts (name, email, address, status, created_time, updated_time)
		 VALUES ($1, $2, $3, $4, $5, $6)
		 RETURNING id, name, COALESCE(address,''), COALESCE(email,''), status, created_time, updated_time`,
		name, emailArg, address, status, createdTime, now).
		Scan(&a.ID, &a.Name, &a.Address, &a.Email, &a.Status, &a.CreatedTime, &a.UpdatedTime)
	if err != nil {
		return nil, err
	}
	return &a, nil
}

// updateAccount applies only the fields that are non-zero / non-empty in the patch.
func updateAccount(db *pgxpool.Pool, id int64, patch map[string]any) (*Account, error) {
	now := time.Now().UnixMilli()

	setClauses := []string{"updated_time = $1"}
	args := []any{now}
	argIdx := 2

	if v, ok := patch["name"]; ok {
		setClauses = append(setClauses, fmt.Sprintf("name = $%d", argIdx))
		args = append(args, v)
		argIdx++
	}
	if v, ok := patch["email"]; ok {
		setClauses = append(setClauses, fmt.Sprintf("email = $%d", argIdx))
		if s, ok := v.(string); ok && strings.TrimSpace(s) != "" {
			args = append(args, strings.TrimSpace(s))
		} else {
			args = append(args, nil)
		}
		argIdx++
	}
	if v, ok := patch["address"]; ok {
		setClauses = append(setClauses, fmt.Sprintf("address = $%d", argIdx))
		args = append(args, v)
		argIdx++
	}
	if v, ok := patch["status"]; ok {
		setClauses = append(setClauses, fmt.Sprintf("status = $%d", argIdx))
		args = append(args, v)
		argIdx++
	}

	args = append(args, id)
	query := fmt.Sprintf(
		`UPDATE accounts SET %s WHERE id = $%d
		 RETURNING id, name, COALESCE(address,''), COALESCE(email,''), status, created_time, updated_time`,
		strings.Join(setClauses, ", "), argIdx,
	)

	var a Account
	err := db.QueryRow(context.Background(), query, args...).
		Scan(&a.ID, &a.Name, &a.Address, &a.Email, &a.Status, &a.CreatedTime, &a.UpdatedTime)
	if err != nil {
		return nil, err
	}
	return &a, nil
}

func softDeleteAccount(db *pgxpool.Pool, id int64) (*Account, error) {
	now := time.Now().UnixMilli()
	var a Account
	err := db.QueryRow(context.Background(),
		`UPDATE accounts SET status = 3, updated_time = $1 WHERE id = $2
		 RETURNING id, name, COALESCE(address,''), COALESCE(email,''), status, created_time, updated_time`,
		now, id).
		Scan(&a.ID, &a.Name, &a.Address, &a.Email, &a.Status, &a.CreatedTime, &a.UpdatedTime)
	if err != nil {
		if strings.Contains(err.Error(), "no rows") {
			return nil, fmt.Errorf("not found")
		}
		return nil, err
	}
	return &a, nil
}

// ---------------------------------------------------------------------------
// HTTP handlers
// ---------------------------------------------------------------------------

// accountsHandler routes /api/accounts and /api/accounts/{id}.
func accountsHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		addCORS(w)

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		// Parse path: /api/accounts or /api/accounts/{id}
		path := strings.TrimSuffix(r.URL.Path, "/")
		parts := strings.Split(path, "/") // ["", "api", "accounts", ...]
		hasID := len(parts) == 4 && parts[3] != ""

		var id int64
		if hasID {
			var err error
			id, err = strconv.ParseInt(parts[3], 10, 64)
			if err != nil {
				writeError(w, http.StatusBadRequest, "invalid id")
				return
			}
		}

		switch {
		// DELETE /api/accounts — empty all
		case r.Method == http.MethodDelete && !hasID:
			_, err := db.Exec(context.Background(), "DELETE FROM accounts")
			if err != nil {
				writeError(w, http.StatusInternalServerError, err.Error())
				return
			}
			writeJSON(w, http.StatusOK, map[string]string{"message": "all accounts deleted"})

		// GET /api/accounts
		case r.Method == http.MethodGet && !hasID:
			accounts, err := listAccounts(db)
			if err != nil {
				writeError(w, http.StatusInternalServerError, err.Error())
				return
			}
			writeJSON(w, http.StatusOK, accounts)

		// GET /api/accounts/{id}
		case r.Method == http.MethodGet && hasID:
			a, err := getAccount(db, id)
			if err != nil {
				if strings.Contains(err.Error(), "no rows") {
					writeError(w, http.StatusNotFound, "account not found")
				} else {
					writeError(w, http.StatusInternalServerError, err.Error())
				}
				return
			}
			writeJSON(w, http.StatusOK, a)

		// POST /api/accounts
		case r.Method == http.MethodPost && !hasID:
			var body struct {
				Name        string `json:"name"`
				Email       string `json:"email"`
				Address     string `json:"address"`
				Status      int    `json:"status"`
				CreatedTime int64  `json:"created_time"`
			}
			if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
				writeError(w, http.StatusBadRequest, "invalid JSON")
				return
			}
			if strings.TrimSpace(body.Name) == "" {
				writeError(w, http.StatusBadRequest, "name is required")
				return
			}
			a, err := createAccount(db, body.Name, body.Email, body.Address, body.Status, body.CreatedTime)
			if err != nil {
				if isPgDuplicate(err) {
					writeError(w, http.StatusConflict, "email already exists")
				} else {
					writeError(w, http.StatusInternalServerError, err.Error())
				}
				return
			}
			writeJSON(w, http.StatusCreated, a)

		// PUT /api/accounts/{id}
		case r.Method == http.MethodPut && hasID:
			var raw map[string]any
			if err := json.NewDecoder(r.Body).Decode(&raw); err != nil {
				writeError(w, http.StatusBadRequest, "invalid JSON")
				return
			}

			// Build a typed patch — only include fields present in the body.
			patch := map[string]any{}
			if v, ok := raw["name"]; ok {
				s, _ := v.(string)
				if strings.TrimSpace(s) == "" {
					writeError(w, http.StatusBadRequest, "name cannot be empty")
					return
				}
				patch["name"] = strings.TrimSpace(s)
			}
			if v, ok := raw["email"]; ok {
				s, _ := v.(string)
				patch["email"] = strings.TrimSpace(s)
			}
			if v, ok := raw["address"]; ok {
				patch["address"] = v
			}
			if v, ok := raw["status"]; ok {
				// JSON numbers decode as float64
				switch n := v.(type) {
				case float64:
					patch["status"] = int(n)
				case int:
					patch["status"] = n
				}
			}

			a, err := updateAccount(db, id, patch)
			if err != nil {
				if strings.Contains(err.Error(), "no rows") {
					writeError(w, http.StatusNotFound, "account not found")
				} else if isPgDuplicate(err) {
					writeError(w, http.StatusConflict, "email already exists")
				} else {
					writeError(w, http.StatusInternalServerError, err.Error())
				}
				return
			}
			writeJSON(w, http.StatusOK, a)

		// DELETE /api/accounts/{id}
		case r.Method == http.MethodDelete && hasID:
			a, err := softDeleteAccount(db, id)
			if err != nil {
				if err.Error() == "not found" {
					writeError(w, http.StatusNotFound, "account not found")
				} else {
					writeError(w, http.StatusInternalServerError, err.Error())
				}
				return
			}
			writeJSON(w, http.StatusOK, a)

		default:
			writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		}
	}
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

func main() {
	// Database connection string
	host := getEnv("DB_HOST", "localhost")
	port := getEnv("DB_PORT", "5432")
	dbName := getEnv("DB_NAME", "testaccounts")
	user := getEnv("DB_USER", "postgres")
	password := getEnv("DB_PASSWORD", "1234")
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", user, password, host, port, dbName)

	config, err := pgxpool.ParseConfig(connStr)
	if err != nil {
		log.Fatalf("unable to parse database config: %v", err)
	}
	config.MaxConns = 10
	config.MaxConnIdleTime = 5 * time.Second

	db, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("unable to connect to database: %v", err)
	}
	defer db.Close()

	// Retry a few times so Docker compose startup ordering is handled gracefully.
	for i := range 10 {
		if err = db.Ping(context.Background()); err == nil {
			break
		}
		log.Printf("waiting for database... attempt %d/10", i+1)
		time.Sleep(2 * time.Second)
	}
	if err != nil {
		log.Fatalf("could not ping database: %v", err)
	}

	if err := initSchema(db); err != nil {
		log.Fatalf("initSchema: %v", err)
	}
	log.Println("database ready")

	// Routing
	mux := http.NewServeMux()

	// API routes
	mux.HandleFunc("/api/accounts/", accountsHandler(db))
	mux.HandleFunc("/api/accounts", accountsHandler(db))

	// Serve frontend static files
	frontendDir := getEnv("FRONTEND_DIR", "../frontend")
	fs := http.FileServer(http.Dir(frontendDir))
	mux.Handle("/", fs)

	addr := ":" + getEnv("PORT", "3000")
	log.Printf("server listening on %s  (frontend: %s)", addr, frontendDir)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
