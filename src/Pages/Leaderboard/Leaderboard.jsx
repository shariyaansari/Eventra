import { useEffect, useState } from "react";
import { FaCode, FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import confetti from "canvas-confetti"; // 🎉 Import confetti

const GITHUB_REPO = "SandeepVashishtha/Eventra";
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN || "";

const POINTS = {
  "level-1": 3,
  "level-2": 7,
  level3: 10,
};

export default function LeaderBoard() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const CONTRIBUTORS_PER_PAGE = 10;

  // 🎉 Trigger confetti once on page load
  useEffect(() => {
    // Fire a "party bomb" burst 🎉
    confetti({
      particleCount: 150, // number of confetti pieces
      spread: 80, // how wide they fly out
      origin: { x: 0.5, y: 0.6 }, // center-bottom of screen
      startVelocity: 45, // smooth upward speed
      gravity: 0.9, // fall speed
      scalar: 1.2, // size scaling
    });
  }, []);

  const loadLeaderboardData = async () => {
    setLoading(true);
    const cachedData = localStorage.getItem("leaderboardData");
    const now = Date.now();

    if (cachedData) {
      try {
        const { data, timestamp } = JSON.parse(cachedData);
        const isDataFresh = now - timestamp < 60 * 60 * 1000;
        if (isDataFresh) {
          setContributors(data);
          setLastUpdated(
            `Last updated: ${new Date(timestamp).toLocaleString()} (cached)`
          );
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error parsing cached data:", error);
      }
    }

    await fetchContributors();
  };

  const fetchContributors = async () => {
    try {
      let contributorsMap = {};
      let page = 1;
      let hasMore = true;

      const contributorsRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contributors`,
        { headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {} }
      );

      if (!contributorsRes.ok) throw new Error("Failed to fetch contributors");

      const contributorsData = await contributorsRes.json();
      const contributorsInfo = {};

      contributorsData.forEach((contributor) => {
        contributorsInfo[contributor.login] = {
          name: contributor.name || contributor.login,
          avatar: contributor.avatar_url,
          profile: contributor.html_url,
        };
      });

      while (hasMore) {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
          { headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {} }
        );

        const prs = await res.json();
        if (prs.length === 0) {
          hasMore = false;
          break;
        }

        prs.forEach((pr) => {
          if (!pr.merged_at) return;
          const labels = pr.labels.map((l) => l.name.toLowerCase());
          const hasGsocLabel = labels.some(
            (label) => label.includes("gssoc") || label.includes("gsoc")
          );
          if (!hasGsocLabel) return;

          const author = pr.user.login;
          let points = 0;
          labels.forEach((label) => {
            const normalized = label.replace(/\s+/g, "").toLowerCase();
            if (POINTS[normalized]) points += POINTS[normalized];
          });

          if (!contributorsMap[author]) {
            const contributorInfo = contributorsInfo[author] || {
              name: author,
              avatar: pr.user.avatar_url,
              profile: pr.user.html_url,
            };
            contributorsMap[author] = {
              username: author,
              name: contributorInfo.name,
              avatar: contributorInfo.avatar,
              profile: contributorInfo.profile,
              points: 0,
              prs: 0,
            };
          }

          contributorsMap[author].points += points;
          contributorsMap[author].prs += 1;
        });

        page++;
      }

      const sortedContributors = Object.values(contributorsMap).sort(
        (a, b) => b.points - a.points
      );
      setContributors(sortedContributors);
      const timestamp = Date.now();
      setLastUpdated(new Date(timestamp).toLocaleString());

      localStorage.setItem(
        "leaderboardData",
        JSON.stringify({ data: sortedContributors, timestamp: Date.now() })
      );
    } catch (err) {
      console.error("Error fetching contributors:", err);

      const cachedData = localStorage.getItem("leaderboardData");
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        setContributors(data);
        setLastUpdated(
          `Last updated: ${new Date(timestamp).toLocaleString()} (cached)`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  // 🔹 Filtered contributors
  const filteredContributors = contributors.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.username.toLowerCase().includes(q) ||
      (c.name && c.name.toLowerCase().includes(q))
    );
  });

  // 🔹 Pagination
  const indexOfLast = currentPage * CONTRIBUTORS_PER_PAGE;
  const indexOfFirst = indexOfLast - CONTRIBUTORS_PER_PAGE;
  const currentContributors = filteredContributors.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(
    filteredContributors.length / CONTRIBUTORS_PER_PAGE
  );

  // 🔹 Map usernames to global ranks
  const ranksMap = {};
  contributors.forEach((c, i) => {
    ranksMap[c.username] = i + 1;
  });

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="block text-indigo-700">GSSoC'25</span>
            <span className="text-gray-800">Contributor Leaderboard</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Recognizing the amazing contributions from our open source community
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search contributors..."
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="overflow-x-auto">{/* Skeleton loader */}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contributor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PRs
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {currentContributors.map((c) => {
                    const rank = ranksMap[c.username]; // ✅ Correct global rank
                    return (
                      <tr
                        key={c.username}
                        className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                              <span
                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-medium 
                                ${
                                  rank === 1
                                    ? "bg-yellow-500 text-white"
                                    : rank === 2
                                    ? "bg-gray-300 text-gray-800"
                                    : rank === 3
                                    ? "bg-amber-500 text-white"
                                    : "bg-indigo-50 text-indigo-700"
                                }`}
                              >
                                {rank}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full border-2 border-indigo-200"
                                src={c.avatar}
                                alt={c.username}
                              />
                            </div>
                            <div className="ml-4">
                              <a
                                href={c.profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                              >
                                {c.username}
                              </a>
                              <div className="text-sm text-gray-500">
                                {c.name && c.name !== c.username ? c.name : ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="font-medium">{c.points}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaCode className="text-indigo-500 mr-1" />
                            <span className="font-medium">{c.prs}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 py-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm rounded-lg border border-gray-300 disabled:opacity-50 flex items-center"
                  >
                    <FaChevronLeft />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 text-sm rounded-lg border ${
                        currentPage === i + 1
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "border-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm rounded-lg border border-gray-300 disabled:opacity-50 flex items-center"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="bg-gray-50 px-6 py-2 text-right border-t border-gray-200">
            {lastUpdated && (
              <span className="text-xs text-gray-500">{lastUpdated}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
