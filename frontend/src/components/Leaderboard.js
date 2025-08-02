import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [contributors, setContributors] = useState([]);
  const [timeFrame, setTimeFrame] = useState('all-time');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const mockContributors = [
      {
        id: 1,
        name: "Sarah Chen",
        username: "sarahchen",
        avatar: "/api/placeholder/60/60",
        points: 2850,
        contributions: 145,
        projects: 8,
        pullRequests: 67,
        issuesResolved: 89,
        rank: 1,
        badge: "🏆 Gold Contributor",
        level: "Expert",
        streak: 45,
        specialties: ["AI/ML", "Frontend"],
        recentActivity: "Merged PR in AI-Task-Manager",
        joinDate: "2024-01-15"
      },
      {
        id: 2,
        name: "David Kim",
        username: "davidkim",
        avatar: "/api/placeholder/60/60",
        points: 2720,
        contributions: 132,
        projects: 6,
        pullRequests: 78,
        issuesResolved: 54,
        rank: 2,
        badge: "🥈 Silver Contributor",
        level: "Expert",
        streak: 32,
        specialties: ["Blockchain", "Backend"],
        recentActivity: "Created new issue in Voting System",
        joinDate: "2024-02-20"
      },
      {
        id: 3,
        name: "Emma Thompson",
        username: "emmathompson",
        avatar: "/api/placeholder/60/60",
        points: 2450,
        contributions: 118,
        projects: 5,
        pullRequests: 45,
        issuesResolved: 73,
        rank: 3,
        badge: "🥉 Bronze Contributor",
        level: "Advanced",
        streak: 28,
        specialties: ["Data Science", "Visualization"],
        recentActivity: "Updated Climate Visualizer docs",
        joinDate: "2024-03-10"
      },
      {
        id: 4,
        name: "Alex Rodriguez",
        username: "alexrodriguez",
        avatar: "/api/placeholder/60/60",
        points: 2180,
        contributions: 98,
        projects: 7,
        pullRequests: 56,
        issuesResolved: 42,
        rank: 4,
        badge: "⭐ Rising Star",
        level: "Advanced",
        streak: 21,
        specialties: ["Full Stack", "Mobile"],
        recentActivity: "Fixed critical bug in Chat App",
        joinDate: "2024-04-05"
      },
      {
        id: 5,
        name: "Maria Garcia",
        username: "mariagarcia",
        avatar: "/api/placeholder/60/60",
        points: 1950,
        contributions: 87,
        projects: 4,
        pullRequests: 34,
        issuesResolved: 53,
        rank: 5,
        badge: "🚀 Fast Learner",
        level: "Intermediate",
        streak: 15,
        specialties: ["Frontend", "UI/UX"],
        recentActivity: "Improved responsive design",
        joinDate: "2024-05-12"
      },
      {
        id: 6,
        name: "Roberto Silva",
        username: "robertosilva",
        avatar: "/api/placeholder/60/60",
        points: 1820,
        contributions: 76,
        projects: 3,
        pullRequests: 29,
        issuesResolved: 47,
        rank: 6,
        badge: "🔧 Hardware Guru",
        level: "Intermediate",
        streak: 12,
        specialties: ["IoT", "Embedded"],
        recentActivity: "Added sensor calibration feature",
        joinDate: "2024-06-18"
      },
      {
        id: 7,
        name: "Lisa Wang",
        username: "lisawang",
        avatar: "/api/placeholder/60/60",
        points: 1650,
        contributions: 65,
        projects: 5,
        pullRequests: 23,
        issuesResolved: 42,
        rank: 7,
        badge: "📚 Documentation Master",
        level: "Intermediate",
        streak: 8,
        specialties: ["DevOps", "Documentation"],
        recentActivity: "Updated API documentation",
        joinDate: "2024-07-25"
      },
      {
        id: 8,
        name: "Tom Anderson",
        username: "tomanderson",
        avatar: "/api/placeholder/60/60",
        points: 1480,
        contributions: 58,
        projects: 2,
        pullRequests: 19,
        issuesResolved: 39,
        rank: 8,
        badge: "🐛 Bug Hunter",
        level: "Beginner",
        streak: 6,
        specialties: ["Testing", "QA"],
        recentActivity: "Found critical security issue",
        joinDate: "2024-08-30"
      }
    ];
    setContributors(mockContributors);
  }, []);

  const ContributorCard = ({ contributor, index }) => (
    <motion.div
      className="contributor-card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="rank-section">
        <div className={`rank-number ${contributor.rank <= 3 ? 'top-three' : ''}`}>
          #{contributor.rank}
        </div>
        {contributor.rank <= 3 && (
          <div className="trophy">
            {contributor.rank === 1 ? '🏆' : contributor.rank === 2 ? '🥈' : '🥉'}
          </div>
        )}
      </div>

      <div className="avatar-section">
        <img src={contributor.avatar} alt={contributor.name} className="contributor-avatar" />
        <div className="level-badge">{contributor.level}</div>
      </div>

      <div className="contributor-info">
        <h3 className="contributor-name">{contributor.name}</h3>
        <p className="contributor-username">@{contributor.username}</p>
        <div className="contributor-badge">{contributor.badge}</div>
      </div>

      <div className="points-section">
        <div className="points-display">
          <span className="points-number">{contributor.points.toLocaleString()}</span>
          <span className="points-label">points</span>
        </div>
        <div className="streak">
          <span className="streak-icon">🔥</span>
          <span>{contributor.streak} day streak</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-number">{contributor.contributions}</span>
          <span className="stat-label">Contributions</span>
        </div>
        <div className="stat">
          <span className="stat-number">{contributor.projects}</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat">
          <span className="stat-number">{contributor.pullRequests}</span>
          <span className="stat-label">PRs</span>
        </div>
        <div className="stat">
          <span className="stat-number">{contributor.issuesResolved}</span>
          <span className="stat-label">Issues</span>
        </div>
      </div>

      <div className="specialties">
        <span className="specialties-label">Specialties:</span>
        <div className="specialty-tags">
          {contributor.specialties.map((specialty, index) => (
            <span key={index} className="specialty-tag">{specialty}</span>
          ))}
        </div>
      </div>

      <div className="recent-activity">
        <span className="activity-icon">⚡</span>
        <span className="activity-text">{contributor.recentActivity}</span>
      </div>

      <div className="contributor-actions">
        <button className="btn-outline">View Profile</button>
        <button className="btn-secondary">Follow</button>
      </div>
    </motion.div>
  );

  return (
    <div className="leaderboard">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Contributor Leaderboard</h1>
          <p>Celebrating our top contributors and community champions</p>
        </motion.div>

        <div className="leaderboard-controls">
          <div className="time-filter">
            <label>Time Frame:</label>
            <select 
              value={timeFrame} 
              onChange={(e) => setTimeFrame(e.target.value)}
              className="filter-select"
            >
              <option value="all-time">All Time</option>
              <option value="this-month">This Month</option>
              <option value="this-week">This Week</option>
              <option value="today">Today</option>
            </select>
          </div>

          <div className="category-filter">
            <label>Category:</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="contributions">Most Contributions</option>
              <option value="projects">Most Projects</option>
              <option value="pull-requests">Most PRs</option>
              <option value="issues">Most Issues Resolved</option>
            </select>
          </div>
        </div>

        <div className="podium-section">
          {contributors.slice(0, 3).map((contributor, index) => (
            <motion.div
              key={contributor.id}
              className={`podium-place place-${contributor.rank}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="podium-avatar">
                <img src={contributor.avatar} alt={contributor.name} />
                <div className="crown">
                  {contributor.rank === 1 ? '👑' : contributor.rank === 2 ? '🥈' : '🥉'}
                </div>
              </div>
              <h3>{contributor.name}</h3>
              <div className="podium-points">{contributor.points.toLocaleString()} pts</div>
              <div className="podium-badge">{contributor.badge}</div>
            </motion.div>
          ))}
        </div>

        <div className="contributors-list">
          {contributors.map((contributor, index) => (
            <ContributorCard key={contributor.id} contributor={contributor} index={index} />
          ))}
        </div>

        <div className="achievements-section">
          <motion.div
            className="achievements-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3>🏅 Achievement System</h3>
            <p>Earn points and badges by contributing to projects, helping others, and building amazing things!</p>
            
            <div className="achievement-grid">
              <div className="achievement">
                <span className="achievement-icon">🏆</span>
                <span className="achievement-name">Gold Contributor</span>
                <span className="achievement-desc">2500+ points</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🥈</span>
                <span className="achievement-name">Silver Contributor</span>
                <span className="achievement-desc">1500+ points</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🥉</span>
                <span className="achievement-name">Bronze Contributor</span>
                <span className="achievement-desc">750+ points</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">⭐</span>
                <span className="achievement-name">Rising Star</span>
                <span className="achievement-desc">Fast growing contributor</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🚀</span>
                <span className="achievement-name">Fast Learner</span>
                <span className="achievement-desc">Quick skill progression</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🐛</span>
                <span className="achievement-name">Bug Hunter</span>
                <span className="achievement-desc">Finding critical issues</span>
              </div>
            </div>

            <button className="btn-primary">View All Achievements</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
