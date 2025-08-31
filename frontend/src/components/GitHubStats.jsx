import { useEffect, useState } from "react";

// 🔹 Define the GitHub username and repo we are fetching stats for
const GITHUB_USER = "SandeepVashishtha";
const GITHUB_REPO = "Eventra";

export default function GitHubStats() {
  // 🔹 Store repo stats in local state
  // Using an object so we can easily access each stat by key
  const [stats, setStats] = useState({
    stars: 0, // ⭐ Star count
    forks: 0, // 🍴 Fork count
    issues: 0, // 🐛 Open issue count
    contributors: 0, // 👥 Number of contributors
    lastCommit: "", // ⏰ Last commit date
    size: 0, // 💾 Repo size in KB
  });

  // 🔹 Fetch GitHub stats when component mounts
  // useEffect ensures this runs once when component is mounted
  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        // 🔑 Fetch GitHub token from environment variables (CRA)
        // Helps to avoid rate limiting on public API
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

        // ✅ Update local state with fetched values
        // Using fallback values to avoid NaN or undefined
        setStats({
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
          issues: repoData.open_issues_count || 0,
          contributors: contributorsData.length || 0, // Counts total contributors
          lastCommit: repoData.pushed_at
            ? formatLastCommitDate(repoData.pushed_at)
            : "N/A",
          size: repoData.size || 0, // Repo size in KB
        });
      } catch (err) {
        // 🚨 Handle network or API errors gracefully
        // This prevents the app from crashing on fetch errors
        console.error("Error fetching GitHub stats:", err);
      }
    }

    // 🔹 Trigger the fetch function
    fetchGitHubStats();
  }, []); // Empty dependency array ensures this runs only once

  function formatLastCommitDate(isoDate) {
    const commitDate = new Date(isoDate);
    const today = new Date();

    // Format as DD/MM/YY
    const formatDate = (d) =>
      d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

    const commitDateStr = formatDate(commitDate);
    const todayStr = formatDate(today);

    // Check if yesterday
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = formatDate(yesterday);

    if (commitDateStr === todayStr) {
      return `Today (${commitDateStr})`;
    } else if (commitDateStr === yesterdayStr) {
      return `Yesterday (${commitDateStr})`;
    } else {
      return commitDateStr;
    }
  }


  // 🔹 Define all stat cards with labels, values, icons & GitHub links
  // Array makes it easy to map and render dynamically
  const statCards = [
    {
      label: "Stars", // Title for the card
      value: stats.stars, // Number of stars
      icon: "⭐", // Emoji icon to visually represent stars
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/stargazers`, // Link to GitHub stars
    },
    {
      label: "Forks",
      value: stats.forks,
      icon: "🍴",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/network/members`,
    },
    {
      label: "Issues",
      value: stats.issues,
      icon: "🐛",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/issues`,
    },
    {
      label: "Contributors",
      value: stats.contributors,
      icon: "👥",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/graphs/contributors`,
    },
    {
      label: "Last Commit",
      value: stats.lastCommit,
      icon: "⏰",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/commits`,
    },
    {
      label: "Repo Size (KB)",
      value: stats.size,
      icon: "💾",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}`,
    },
  ];

  return (
    // 🔹 Section wrapper with light mode styling
    // Includes padding, border radius, shadow and background color


    <section className="py-20 px-6 rounded-2xl border bg-gray-50 text-gray-900 border-transparent shadow-[0_0_25px_rgba(59,130,246,0.25)]">
      <div className="max-w-7xl mx-auto text-center">
        {/* 🔹 Section heading with gradient underline */}

        <h3 className="relative text-3xl sm:text-4xl font-bold mb-14 tracking-tight inline-block text-gray-900">
          Project Stats
          {/* Underline effect using gradient and absolute positioning */}



          <span className="absolute left-0 -bottom-2 w-full h-1 rounded-full bg-gradient-to-r from-blue-500 to-transparent"></span>
        </h3>

        {/* 🔹 Responsive grid layout for stats (2 → 6 columns) */}



        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {statCards.map(({ label, value, icon, link }) => (
            // 🔹 Each stat card is clickable → navigates to GitHub


            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center border bg-white text-gray-900 border-transparent shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]"
            >
              {/* 🔹 Emoji icon displayed on top of card */}
              <div className="text-4xl mb-3">{icon}</div>



              {/* 🔹 Number display without animation */}
              <div className="text-2xl font-semibold text-gray-900">
                {value}
              </div>



              {/* 🔹 Card label with hover color change */}
              <div className="mt-2 text-sm font-medium text-gray-600 group-hover:text-indigo-600">
                {label}
              </div>
            </a>
          ))}
        </div>

        
      </div>
    </section>
  );
}
