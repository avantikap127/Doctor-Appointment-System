package com.doctorappoint.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.doctorappoint.model.User;
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
