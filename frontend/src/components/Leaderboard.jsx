import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaCode, FaStar } from "react-icons/fa";

// 🔹 GitHub repository to fetch pull requests and contributor info from
const GITHUB_REPO = "SandeepVashishtha/Eventra";

// 🔹 Personal access token from .env file (optional, avoids GitHub rate limits)
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN || "";

// 🔹 Define points for each contribution level
const POINTS = {
  "level-1": 3, // Level 1 PRs give 3 points
  "level-2": 7, // Level 2 PRs give 7 points
  level3: 10,   // Level 3 PRs give 10 points
};

// 🔹 LeaderBoard functional component
export default function LeaderBoard() {
  // 🔹 State to store fetched contributors info
  const [contributors, setContributors] = useState([]);
  // 🔹 Loading state while data is being fetched
  const [loading, setLoading] = useState(true);

  // 🔹 useEffect runs once on component mount to fetch contributors
  useEffect(() => {
    // 🔹 Async function to fetch all closed PRs and calculate points
    const fetchContributors = async () => {
      try {
        // 🔹 Map to store contributors keyed by username
        let contributorsMap = {};
        let page = 1; // Pagination: start with page 1
        let hasMore = true; // Flag to continue fetching

        // 🔹 Loop until all PRs pages are fetched
        while (hasMore) {
          // 🔹 Fetch closed PRs per page
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
            { headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {} }
          );

          // 🔹 Convert response to JSON
          const prs = await res.json();

          // 🔹 If no more PRs, stop the loop
          if (prs.length === 0) {
            hasMore = false;
            break;
          }

          // 🔹 Process each PR
          prs.forEach((pr) => {
            // 🔹 Skip if PR is not merged
            if (!pr.merged_at) return;

            // 🔹 Normalize labels to lowercase for consistency
            const labels = pr.labels.map((l) => l.name.toLowerCase());

            // 🔹 Only consider PRs related to GSSoC
            if (!labels.includes("gssoc") && !labels.includes("gssoc25")) return;

            const author = pr.user.login; // 🔹 PR author username
            let points = 0; // 🔹 Points for this PR

            // 🔹 Sum points based on level labels
            labels.forEach((label) => {
              const normalized = label.replace(/\s+/g, "").toLowerCase();
              if (POINTS[normalized]) points += POINTS[normalized];
            });

            // 🔹 Initialize contributor entry if not exists
            if (!contributorsMap[author]) {
              contributorsMap[author] = {
                username: author,      // 🔹 Username
                avatar: pr.user.avatar_url, // 🔹 GitHub avatar URL
                profile: pr.user.html_url,  // 🔹 Profile link
                points: 0,            // 🔹 Total points
                prs: 0,               // 🔹 Number of PRs
              };
            }

            // 🔹 Update contributor's total points and PR count
            contributorsMap[author].points += points;
            contributorsMap[author].prs += 1;
          });

          // 🔹 Move to next page
          page++;
        }

        // 🔹 Convert contributorsMap to array and sort by points descending
        setContributors(
          Object.values(contributorsMap).sort((a, b) => b.points - a.points)
        );
      } catch (err) {
        // 🔹 Log any errors during fetch or processing
        console.error("Error fetching contributors:", err);
      } finally {
        // 🔹 Stop loading after fetch attempt
        setLoading(false);
      }
    };

    // 🔹 Call the async fetch function
    fetchContributors();
  }, []); // 🔹 Empty dependency array → run once

  // 🔹 JSX rendering
  return (
    <div className="py-20 px-6 rounded-2xl border backdrop-blur-md bg-gray-50/70 text-gray-900 border-transparent shadow-[0_0_30px_rgba(59,130,246,0.25)]">
      {/* 🔹 Section heading with animation */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 🔹 Main title */}
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 bg-clip-text text-transparent mb-3 drop-shadow-lg mt-6">
          GSSoC'25 Leaderboard
        </h1>
        {/* 🔹 Subtitle / description */}
        <p className="text-lg opacity-80">
          Recognizing the incredible efforts ✨
        </p>
      </motion.div>

      {/* 🔹 Loading state */}
      {loading ? (
        <p className="text-center opacity-70">Loading contributors...</p>
      ) : (
        <div className="overflow-x-auto">
          {/* 🔹 Table for leaderboard */}
          <table className="min-w-full border-separate border-spacing-y-3">
            {/* 🔹 Table header */}
            <thead>
              <tr className="text-left text-sm uppercase text-gray-600">
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">Contributor</th>
                <th className="px-6 py-3">Contributions</th>
              </tr>
            </thead>

            {/* 🔹 Table body */}



            <tbody>
              {contributors.map((c, index) => (
                <motion.tr
                  key={c.username}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="rounded-xl transition-all duration-300 bg-white/70 hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-100"
                >
                  {/* 🔹 Rank column */}




                  <td className="px-6 py-4 font-semibold">
                    {index === 0 ? (
                      <FaTrophy className="text-yellow-400 text-2xl drop-shadow-md animate-pulse" />
                    ) : index === 1 ? (
                      <FaMedal className="text-gray-300 text-2xl drop-shadow" />
                    ) : index === 2 ? (
                      <FaMedal className="text-amber-600 text-2xl drop-shadow" />
                    ) : (
                      <span className="text-lg">{index + 1}</span>
                    )}
                  </td>

                  {/* 🔹 Contributor info */}






                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      src={c.avatar}
                      alt={c.username}


                      className="w-11 h-11 rounded-full border-2 border-indigo-400 shadow-md"
                    />
                    <a
                      href={c.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline text-lg"
                    >


                      {c.username}
                    </a>
                  </td>

                  {/* 🔹 Contributions: points and PRs */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-6 text-lg font-semibold">
                      <span className="flex items-center gap-2 text-yellow-500">
                        <FaStar /> {c.points}
                      </span>

                      
                      <span className="flex items-center gap-2 text-indigo-500">
                        <FaCode /> {c.prs}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

