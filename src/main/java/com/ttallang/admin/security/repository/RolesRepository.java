package com.ttallang.admin.security.repository;

import com.ttallang.admin.commonModel.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Integer> {
    Roles findByUserName(String userName);
}
