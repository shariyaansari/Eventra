package com.eventra.Dao;

import com.eventra.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserAuthRepo extends JpaRepository<User, String> {
    Optional<User> findByEmail(java.lang.String email);
}
