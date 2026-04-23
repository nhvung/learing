package com.example.accountmanager.controller;

import com.example.accountmanager.model.Account;
import com.example.accountmanager.repository.AccountRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountRepository repo;

    public AccountController(AccountRepository repo) {
        this.repo = repo;
    }

    private Map<String, String> error(String msg) {
        return Map.of("error", msg);
    }

    @GetMapping
    public ResponseEntity<?> listAccounts() {
        try {
            List<Account> accounts = repo.findAllActive();
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccount(@PathVariable long id) {
        try {
            Optional<Account> account = repo.findById(id);
            if (account.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error("Account not found"));
            }
            return ResponseEntity.ok(account.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody Map<String, Object> body) {
        try {
            String name = (String) body.get("name");
            String email = (String) body.get("email");

            if (name == null || name.isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error("name is required"));
            }
            Account a = new Account();
            a.setName(name.trim());
            a.setEmail(email != null ? email.trim() : null);
            a.setAddress(body.get("address") != null ? (String) body.get("address") : null);

            Object statusObj = body.get("status");
            if (statusObj != null) {
                a.setStatus(((Number) statusObj).intValue());
            } else {
                a.setStatus(1);
            }

            Object ctObj = body.get("created_time");
            if (ctObj != null) {
                a.setCreatedTime(((Number) ctObj).longValue());
            }

            Account created = repo.create(a);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error("Email already exists"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable long id, @RequestBody Map<String, Object> body) {
        try {
            Map<String, Object> fields = new HashMap<>();
            if (body.containsKey("name") && body.get("name") != null) {
                fields.put("name", ((String) body.get("name")).trim());
            }
            if (body.containsKey("email") && body.get("email") != null) {
                fields.put("email", ((String) body.get("email")).trim());
            }
            if (body.containsKey("address")) {
                fields.put("address", body.get("address"));
            }
            if (body.containsKey("status") && body.get("status") != null) {
                fields.put("status", ((Number) body.get("status")).intValue());
            }

            Optional<Account> updated = repo.update(id, fields);
            if (updated.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error("Account not found"));
            }
            return ResponseEntity.ok(updated.get());
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error("Email already exists"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error(e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAllAccounts() {
        try {
            repo.deleteAll();
            return ResponseEntity.ok(Map.of("message", "all accounts deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable long id) {
        try {
            Optional<Account> deleted = repo.softDelete(id);
            if (deleted.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error("Account not found"));
            }
            return ResponseEntity.ok(deleted.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error(e.getMessage()));
        }
    }
}
