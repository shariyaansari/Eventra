import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import mockProjectsData from './mockProjectsData.json'

// This is the main ProjectGallery component which manages state and renders the cards.
const ProjectGallery = () => {
  const [projects, setProjects] = useState(mockProjectsData);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['all', 'AI/ML', 'Blockchain', 'Web Development', 'Data Science', 'IoT', 'Mobile'];

  // Filters and sorts the projects based on the current state.
  const filteredAndSortedProjects = projects
    .filter(project => filterCategory === 'all' || project.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'stars':
          return b.stars - a.stars;
        case 'forks':
          return b.forks - a.forks;
        default:
          return 0;
      }
    });

  // This is the ProjectCard component, now with the original class names but enhanced structure.
  const ProjectCard = ({ project }) => {
    // Bug fix: Filter out the author from the contributors list to avoid duplication.
    const uniqueContributors = project.contributors.filter(
      (contributor) => contributor !== project.author
    );

    return (
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <div className="project-image">
          <img
            src={project.image}
            alt={project.title}
          />
          <div className="project-status">
            <span className={`status-badge ${project.status.toLowerCase()}`}>
              {project.status}
            </span>
          </div>
        </div>

        <div className="project-content">
          <div className="project-header">
            <h3>{project.title}</h3>
            <div className="project-stats">
              <div className="stat">
                <span className="icon">⭐</span>
                <span>{project.stars}</span>
              </div>
              <div className="stat">
                <span className="icon">🍴</span>
                <span>{project.forks}</span>
              </div>
            </div>
          </div>

          <p className="project-description">{project.description}</p>

          {/* This section is a structural enhancement, using existing classes. */}
          <div className="project-meta-badges">
            <span className="category-tag">{project.category}</span>
            <span className={`difficulty-badge ${project.difficulty.toLowerCase()}`}>
              {project.difficulty}
            </span>
          </div>

          <div className="project-meta">
            <div className="author">
              <span className="label">By:</span>
              <span className="author-name">{project.author}</span>
            </div>
          </div>

          <div className="tech-stack">
            {project.techStack.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>

          <div className="contributors">
            <span className="contributors-label">Contributors:</span>
            <div className="contributor-list">
              {/* Use the filtered uniqueContributors array */}
              {uniqueContributors.length > 0 ? (
                uniqueContributors.map((contributor, index) => (
                  <span key={index} className="contributor">{contributor}</span>
                ))
              ) : (
                <span className="contributor">No other contributors yet</span>
              )}
            </div>
          </div>

          <div className="project-activity">
            <div className="activity-item">
              <span className="icon">🔄</span>
              <span>Updated {project.lastUpdated}</span>
            </div>
            <div className="activity-item">
              <span className="icon">🐛</span>
              <span>{project.openIssues} open issues</span>
            </div>
            <div className="activity-item">
              <span className="icon">📥</span>
              <span>{project.pullRequests} pull requests</span>
            </div>
          </div>

          <div className="project-actions">
            <button
              className="btn-primary"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              View on GitHub
            </button>
            {project.liveDemo && (
              <button
                className="btn-secondary"
                onClick={() => window.open(project.liveDemo, '_blank')}
              >
                Live Demo
              </button>
            )}
            <button className="btn-outline">⭐ Star</button>
            <button className="btn-outline">🍴 Fork</button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="project-gallery">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Project Gallery</h1>
          <p>Discover, contribute to, and showcase amazing open-source projects</p>
        </motion.div>

        <div className="gallery-controls">
          <div className="filter-section">
            <label>Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="sort-section">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recent">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="forks">Most Forks</option>
            </select>
          </div>

          <button className="btn-primary submit-project">
            Submit Your Project
          </button>
        </div>

        <div className="projects-grid">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredAndSortedProjects.length === 0 && (
          <div className="no-projects">
            <h3>No projects found</h3>
            <p>Try adjusting your filters or be the first to submit a project in this category!</p>
          </div>
        )}

        <div className="contribution-cta">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3>Ready to contribute?</h3>
            <p>Join our community of developers and start contributing to open-source projects today!</p>
            <div className="cta-actions">
              <button className="btn-primary">Submit Project</button>
              <button className="btn-secondary">Browse Issues</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
