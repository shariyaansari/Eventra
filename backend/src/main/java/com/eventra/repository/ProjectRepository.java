package com.eventra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventra.entity.Project;
import com.eventra.entity.ProjectStatus;
import com.eventra.entity.User;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	List<Project> findByStatus(ProjectStatus status);
	List<Project> findByCategoryAndStatus(String category,ProjectStatus status);
	List<Project> findBySubmittedBy(User submittedBy);

}
