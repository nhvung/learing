package com.example.accountmanager.repository;

import com.example.accountmanager.model.Account;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import jakarta.annotation.PostConstruct;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class AccountRepository {

    private final JdbcTemplate jdbc;

    public AccountRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @PostConstruct
    public void initSchema() {
        jdbc.execute("""
            CREATE TABLE IF NOT EXISTS accounts (
              id           SERIAL PRIMARY KEY,
              name         VARCHAR(255) NOT NULL,
              address      TEXT,
              email        VARCHAR(255) UNIQUE,
              status       SMALLINT NOT NULL DEFAULT 1,
              created_time BIGINT NOT NULL,
              updated_time BIGINT NOT NULL
            )
            """);
    }

    private final RowMapper<Account> rowMapper = (rs, rowNum) -> {
        Account a = new Account();
        a.setId(rs.getLong("id"));
        a.setName(rs.getString("name"));
        a.setAddress(rs.getString("address"));
        a.setEmail(rs.getString("email"));
        a.setStatus(rs.getInt("status"));
        a.setCreatedTime(rs.getLong("created_time"));
        a.setUpdatedTime(rs.getLong("updated_time"));
        return a;
    };

    public List<Account> findAllActive() {
        return jdbc.query(
            "SELECT * FROM accounts ORDER BY id",
            rowMapper
        );
    }

    public Optional<Account> findById(long id) {
        List<Account> results = jdbc.query(
            "SELECT * FROM accounts WHERE id = ?",
            rowMapper,
            id
        );
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    public Account create(Account a) {
        long now = System.currentTimeMillis();
        if (a.getCreatedTime() == 0) a.setCreatedTime(now);
        a.setUpdatedTime(now);
        if (a.getStatus() == 0) a.setStatus(1);

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbc.update(con -> {
            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO accounts (name, address, email, status, created_time, updated_time) VALUES (?, ?, ?, ?, ?, ?)",
                Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, a.getName());
            ps.setString(2, a.getAddress());
            ps.setString(3, a.getEmail());
            ps.setInt(4, a.getStatus());
            ps.setLong(5, a.getCreatedTime());
            ps.setLong(6, a.getUpdatedTime());
            return ps;
        }, keyHolder);

        Map<String, Object> keys = keyHolder.getKeys();
        if (keys != null && keys.containsKey("id")) {
            a.setId(((Number) keys.get("id")).longValue());
        }
        return a;
    }

    public Optional<Account> update(long id, Map<String, Object> fields) {
        if (fields.isEmpty()) {
            return findById(id);
        }

        long now = System.currentTimeMillis();
        List<Object> params = new ArrayList<>();
        StringBuilder sb = new StringBuilder("UPDATE accounts SET updated_time = ?");
        params.add(now);

        if (fields.containsKey("name")) {
            sb.append(", name = ?");
            params.add(fields.get("name"));
        }
        if (fields.containsKey("email")) {
            sb.append(", email = ?");
            params.add(fields.get("email"));
        }
        if (fields.containsKey("address")) {
            sb.append(", address = ?");
            params.add(fields.get("address"));
        }
        if (fields.containsKey("status")) {
            sb.append(", status = ?");
            params.add(fields.get("status"));
        }

        sb.append(" WHERE id = ?");
        params.add(id);

        int rows = jdbc.update(sb.toString(), params.toArray());
        if (rows == 0) return Optional.empty();
        return findById(id);
    }

    public void deleteAll() {
        jdbc.execute("DELETE FROM accounts");
    }

    public Optional<Account> softDelete(long id) {
        long now = System.currentTimeMillis();
        int rows = jdbc.update(
            "UPDATE accounts SET status = 3, updated_time = ? WHERE id = ?",
            now, id
        );
        if (rows == 0) return Optional.empty();
        return findById(id);
    }
}
