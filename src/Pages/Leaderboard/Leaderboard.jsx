import { useEffect, useState, Fragment, useRef } from "react";
import {
  FaCode,
  FaStar,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
} from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import confetti from "canvas-confetti";
import GSSoCContribution from "./GSSoCContribution";

const GITHUB_REPO = "SandeepVashishtha/Eventra";
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN || "";

const CACHE_KEY = "leaderboardData";
const MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours

const POINTS = {
  "level-1": 3,
  "level-2": 7,
  "level-3": 10,
};

export default function LeaderBoard() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("points");
  const [isDark, setIsDark] = useState(false);

  const CONTRIBUTORS_PER_PAGE = 10;
  const hasMountedRef = useRef(false);

  // 🎉 Confetti on first mount
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { x: 0.5, y: 0.6 },
      startVelocity: 45,
      gravity: 0.9,
      scalar: 1.2,
    });
  }, []);

  useEffect(() => {
    // on mount: show cache if present, then refresh if stale
    initLoad();

    // also: auto-refresh every 2 hours while page open
    const interval = setInterval(() => {
      refreshInBackground(); // will keep old data on failure
    }, MAX_AGE_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initLoad = async () => {
    const cached = readCache();
    if (cached) {
      setContributors(cached.data);
      setLastUpdated(
        `Last updated: ${new Date(cached.timestamp).toLocaleString()} (cached)`
      );
      setLoading(false);

      // if stale => background refresh; else do nothing
      if (Date.now() - cached.timestamp > MAX_AGE_MS) {
        refreshInBackground();
      }
    } else {
      // No cache yet -> show loader (NOT zeros), then foreground fetch
      setLoading(true);
      await fetchAndUpdate({ background: false });
    }
    hasMountedRef.current = true;
  };

  const refreshInBackground = () => fetchAndUpdate({ background: true });

  const fetchAndUpdate = async ({ background }) => {
    if (background) setIsRefreshing(true);

    const headers = {
      ...(TOKEN ? { Authorization: `token ${TOKEN}` } : {}),
      Accept: "application/vnd.github+json",
    };

    try {
      // meta
      const cRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contributors`,
        { headers }
      );
      if (!cRes.ok) throw new Error(`contributors ${cRes.status}`);
      const contributorsData = await cRes.json();

      const contributorsInfo = {};
      (contributorsData || []).forEach((c) => {
        contributorsInfo[c.login] = {
          name: c.login,
          avatar: c.avatar_url,
          profile: c.html_url,
        };
      });

      // aggregate PRs
      const map = {};
      let page = 1;

      /* IMPORTANT: do NOT clear state while fetching pages */
      // fetch all closed PRs (paginated)
      // stop when a page returns empty
      while (true) {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
          { headers }
        );
        if (!res.ok) throw new Error(`pulls ${res.status}`);
        const prs = await res.json();
        if (!Array.isArray(prs) || prs.length === 0) break;

        prs.forEach((pr) => {
          if (!pr?.merged_at) return;

          const labels = (pr.labels || []).map((l) =>
            String(l?.name || "").toLowerCase()
          );
          const hasGsocLabel = labels.some(
            (label) => label.includes("gssoc") || label.includes("gsoc")
          );
          if (!hasGsocLabel) return;

          const author = pr.user?.login;
          if (!author) return;

          let points = 0;
          labels.forEach((label) => {
            const m = label.match(/level[\s-]?([1-3])/);
            if (m) points += POINTS[`level-${m[1]}`] || 0;
          });

          if (!map[author]) {
            const info = contributorsInfo[author] || {
              name: author,
              avatar: pr.user?.avatar_url,
              profile: pr.user?.html_url,
            };
            map[author] = {
              username: author,
              name: info.name,
              avatar: info.avatar,
              profile: info.profile,
              points: 0,
              prs: 0,
            };
          }
          map[author].points += points;
          map[author].prs += 1;
        });

        page += 1;
      }

      const next = Object.values(map).sort((a, b) => b.points - a.points);

      // Only update if we have non-empty data
      if (next.length > 0) {
        setContributors(next);
        const ts = Date.now();
        setLastUpdated(`Last updated: ${new Date(ts).toLocaleString()}`);
        writeCache({ data: next, timestamp: ts });
      } else {
        // keep old data; DO NOT show zeros
        console.warn("Refresh returned empty; keeping previous cache/UI");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      // keep old data; DO NOT show zeros
    } finally {
      if (background) setIsRefreshing(false);
      setLoading(false);
    }
  };

  // cache helpers
  const readCache = () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.data) && parsed.data.length > 0) return parsed;
      return null;
    } catch {
      return null;
    }
  };
  const writeCache = (payload) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch {}
  };

  // ===== Derived UI state
  const filteredContributors = contributors.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.username.toLowerCase().includes(q) ||
      (c.name && c.name.toLowerCase().includes(q))
    );
  });

  const sortedContributors = [...filteredContributors].sort((a, b) => {
    if (sortBy === "points") return b.points - a.points;
    if (sortBy === "prs") return b.prs - a.prs;
    if (sortBy === "username") return a.username.localeCompare(b.username);
    return 0;
  });

  const indexOfLast = currentPage * CONTRIBUTORS_PER_PAGE;
  const indexOfFirst = indexOfLast - CONTRIBUTORS_PER_PAGE;
  const currentContributors = sortedContributors.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedContributors.length / CONTRIBUTORS_PER_PAGE);

  const ranksMap = {};
  contributors.forEach((c, i) => (ranksMap[c.username] = i + 1));

  const stats = {
    totalContributors: contributors.length,
    flooredTotalPRs: contributors.reduce((s, c) => s + c.prs, 0),
    flooredTotalPoints: contributors.reduce((s, c) => s + c.points, 0),
  };

  const sortOptions = [
    { label: "Points", value: "points" },
    { label: "PRs", value: "prs" },
    { label: "Username", value: "username" },
  ];

  // helper to avoid showing 0s when empty
  const displayNum = (n) =>
    loading ? "…" : contributors.length === 0 ? "—" : n;

  return (
    <div className="bg-white dark:bg-black py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <span className="block text-indigo-700 dark:text-indigo-400">GSSoC'25</span>
            <span className="text-gray-800 dark:text-gray-200">Contributor Leaderboard</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recognizing the amazing contributions from our open source community
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex justify-center items-center mb-6 space-x-4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search contributors..."
            className="w-full max-w-xs px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center w-48 px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
              Sort by: {sortOptions.find((opt) => opt.value === sortBy)?.label}
              <FaChevronDown className="ml-2 h-4 w-4" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg focus:outline-none z-50">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy(option.value)}
                        className={`${
                          active ? "bg-indigo-500 text-white" : "text-gray-700 dark:text-gray-300"
                        } group flex w-full items-center px-4 py-2 text-sm`}
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 18, marginBottom: 16, flexWrap: "wrap" }}>
          <StatCard
            isDark={isDark}
            icon={<FaUsers style={{ fontSize: 22 }} />}
            title="Contributors"
            value={displayNum(stats.totalContributors)}
            iconBgLight="#dbeafe"
            iconColorLight="#2563eb"
            iconBgDark="rgba(59,130,246,0.2)"
            iconColorDark="#60a5fa"
          />
          <StatCard
            isDark={isDark}
            icon={<FaCode style={{ fontSize: 22 }} />}
            title="Pull Requests"
            value={displayNum(stats.flooredTotalPRs)}
            iconBgLight="#bbf7d0"
            iconColorLight="#059669"
            iconBgDark="rgba(16,185,129,0.2)"
            iconColorDark="#34d399"
          />
          <StatCard
            isDark={isDark}
            icon={<FaStar style={{ fontSize: 22 }} />}
            title="Total Points"
            value={displayNum(stats.flooredTotalPoints)}
            iconBgLight="#ede9fe"
            iconColorLight="#7c3aed"
            iconBgDark="rgba(139,92,246,0.2)"
            iconColorDark="#a78bfa"
          />
        </div>

        {/* Table */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm text-gray-500 dark:text-gray-400">
              Loading leaderboard…
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contributor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      PRs
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black divide-y divide-gray-400 dark:divide-gray-500">
                  {currentContributors.map((c) => {
                    const rank = ranksMap[c.username];
                    return (
                      <tr key={c.username} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-medium ${
                              rank === 1
                                ? "bg-yellow-500 text-white"
                                : rank === 2
                                ? "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                                : rank === 3
                                ? "bg-amber-800 text-white"
                                : "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                            }`}
                          >
                            {rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full border-2 border-indigo-200 dark:border-gray-600"
                              src={c.avatar}
                              alt={c.username}
                            />
                            <div className="ml-4">
                              <a
                                href={c.profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                              >
                                {c.username}
                              </a>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
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
                <div className="flex justify-center items-center space-x-2 py-4 bg-white dark:bg-black/80">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 flex items-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
                          : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 flex items-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-black/70 px-6 py-2 text-right border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-3">
            {isRefreshing && (
              <span className="text-xs text-indigo-600 dark:text-indigo-300 animate-pulse">
                Refreshing…
              </span>
            )}
            {lastUpdated && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{lastUpdated}• Updates every 2 hours</span>
            )}
          </div>
        </div>
      </div>

      <GSSoCContribution />
    </div>
  );
}

function StatCard({
  isDark,
  icon,
  title,
  value,
  iconBgLight,
  iconColorLight,
  iconBgDark,
  iconColorDark,
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 220,
        padding: 24,
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        border: `1px solid ${isDark ? "#444" : "#eee"}`,
        background: isDark
          ? "linear-gradient(135deg,#23272f,#1a1d23)"
          : "linear-gradient(135deg,#e0e7ff,#f3f4f6)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            background: isDark ? iconBgDark : iconBgLight,
            color: isDark ? iconColorDark : iconColorLight,
            marginRight: 16,
          }}
        >
          {icon}
        </div>
        <div>
          <p style={{ fontSize: 14, color: isDark ? "#b3b3b3" : "#555" }}>{title}</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: isDark ? "#fff" : "#222" }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
