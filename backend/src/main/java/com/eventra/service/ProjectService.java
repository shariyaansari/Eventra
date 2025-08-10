package com.eventra.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.eventra.dto.ProjectSubmission;
import com.eventra.entity.Project;
import com.eventra.entity.ProjectStatus;
import com.eventra.entity.User;
import com.eventra.repository.ProjectRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {
	
	private final ProjectRepository projectRepository;
	
	public List<Project> getApprovedProjects(){
		return projectRepository.findByStatus(ProjectStatus.APPROVED);
	}
	
	public List<Project> getApprovedProjectsByCategory(String category){
		return projectRepository.findByCategoryAndStatus(category, ProjectStatus.APPROVED);
	}
	
	@Transactional
	public Project submitProject(ProjectSubmission submission, User submittingUser) { // <-- Modified method signature
		// Create a new Project entity and map data from the DTO
		Project newProject = Project.builder()
			.title(submission.getTitle())
			.description(submission.getDescription())
			.author(submission.getAuthor())
			.category(submission.getCategory())
			.techStack(submission.getTechStack())
			.githubUrl(submission.getGithubUrl())
			.liveDemo(submission.getLiveDemo())
			.image(submission.getImage())
			.difficulty(submission.getDifficulty())
			.openIssues(submission.getOpenIssues())
			.pullRequests(submission.getPullRequests())
			.stars(submission.getStars())
			.forks(submission.getForks())
			.submittedBy(submittingUser)
			.status(ProjectStatus.PENDING) // Set the default status
			.build();

		Project savedProject = projectRepository.save(newProject);
		log.info("Project '{}' submitted by user {} with status PENDING", newProject.getTitle(), submittingUser.getEmail());
		return savedProject;
	}
	
	@Transactional
	public Optional<Project> updateProjectStatus(Long projectId, ProjectStatus newStatus){
		return projectRepository.findById(projectId).map(project->{
			project.setStatus(newStatus);
			Project updatedProject = projectRepository.save(project);
			log.info("Project '{}' status updated to {}", project.getTitle(), newStatus);
			return updatedProject;
		});
	}
}