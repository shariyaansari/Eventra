import { useEffect, useState } from "react";
import { FaGithub, FaStar, FaCodeBranch, FaExclamationCircle, FaCode, FaUsers, FaClock, FaExternalLinkAlt } from "react-icons/fa";

// GitHub username and repo
const GITHUB_USER = "SandeepVashishtha";
const GITHUB_REPO = "Eventra";

export default function GitHubStats() {
  // Store repo stats in local state
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    issues: 0,
    contributors: 0,
    lastCommit: "",
    size: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch GitHub stats when component mounts
  useEffect(() => {
    async function fetchGitHubStats() {
      setLoading(true);
      try {
        const token = process.env.REACT_APP_GITHUB_TOKEN;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // 📦 Fetch main repo data (stars, forks, issues, last commit, size)
        const repoRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}`,
          { headers }
        );
        const repoData = await repoRes.json();
        console.log("Repo Data:", repoData); // Debugging: log fetched repo data

        // 👥 Fetch contributor count
        // per_page=100 ensures we fetch up to 100 contributors at once
        const contributorsRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contributors?per_page=100&anon=true`,
          { headers }
        );
        const contributorsData = await contributorsRes.json();

        // Format last commit date
        const formatDate = (dateString) => {
          const options = { year: 'numeric', month: 'short', day: 'numeric' };
          return new Date(dateString).toLocaleDateString(undefined, options);
        };

        setStats({
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
          issues: repoData.open_issues_count || 0,
          contributors: contributorsData.length || 0,
          lastCommit: repoData.pushed_at ? formatDate(repoData.pushed_at) : "N/A",
          size: repoData.size || 0,
        });
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubStats();
  }, []);

  // Define stat cards with consistent styling
  const statCards = [
    {
      label: "Stars",
      value: stats.stars,
      icon: <FaStar className="text-yellow-500" />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/stargazers`,
      border: "border-yellow-100"
    },
    {
      label: "Forks",
      value: stats.forks,
      icon: <FaCodeBranch className="text-blue-500" />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/network/members`,
      border: "border-blue-100"
    },
    {
      label: "Open Issues",
      value: stats.issues,
      icon: <FaExclamationCircle className="text-red-500" />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/issues`,
      border: "border-red-100"
    },
    {
      label: "Contributors",
      value: stats.contributors,
      icon: <FaUsers className="text-indigo-500" />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/graphs/contributors`,
      border: "border-indigo-100"
    },
    {
      label: "Last Update",
      value: stats.lastCommit,
      icon: <FaClock className="text-purple-500" />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/commits`,
      border: "border-purple-100"
    },
    {
      label: "Code",
      value: `${(stats.size / 1024).toFixed(1)} MB`,
      icon: <FaCode className="text-green-500" />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}`,
      border: "border-green-100"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Project Statistics
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our journey in numbers. See how our open-source community is growing and evolving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map(({ label, value, icon, link, border }) => (
            <div
              key={label}
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-2 ${border} hover:border-indigo-100`}
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="text-2xl">
                        {icon}
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{value}</p>
                      <p className="text-sm font-medium text-gray-600">
                        {label}
                      </p>
                    </div>
                  </div>
                  <FaExternalLinkAlt className="text-gray-400" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
