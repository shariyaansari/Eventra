import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCodeBranch,
  FaUserFriends,
  FaMedal,
} from "react-icons/fa";
import { motion } from "framer-motion";

const GITHUB_REPO = "SandeepVashishtha/Eventra";
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN || "";

// Assign roles based on contributions
const getRoleByContributions = (c) => {
  const { contributions, login } = c;
  if (login === "sandeepvashishtha") return "Project Lead";
  if (contributions > 100) return "Core Maintainer";
  if (contributions > 50) return "Senior Dev";
  if (contributions > 20) return "Active Contributor";
  if (contributions > 10) return "Regular Contributor";
  return "New Contributor";
};

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContributors = async () => {
    try {
      let allContributors = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contributors?per_page=100&page=${page}`,
          { headers: TOKEN ? { Authorization: `token ${TOKEN}` } : undefined }
        );
        if (!res.ok) throw new Error("Failed to fetch contributors");

        const data = await res.json();
        if (data.length === 0) hasMore = false;
        else {
          allContributors = [...allContributors, ...data];
          page++;
        }
      }

      // Sort contributors by contributions
      allContributors.sort((a, b) => b.contributions - a.contributions);
      setContributors(allContributors);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributors();
  }, []);

  if (loading)
    return <p className="text-center py-20">Loading contributors...</p>;

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          🌟 Our Amazing{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Contributors
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {contributors.map((c, i) => (
            <motion.div
              key={c.id}
              className="relative bg-gradient-to-br from-white/90 to-indigo-50/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center transition-all duration-300 ease-out"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{
                scale: 1.02,
                y: -4,
                boxShadow: "0px 8px 25px rgba(99,102,241,0.25)",
              }}
            >
              {/* Avatar with glow */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <img
                    src={c.avatar_url}
                    alt={c.login}
                    className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-400/20 blur-md"></div>
                </div>
              </div>

              {/* Name + Role */}
              <div className="mt-16">
                <h3 className="text-lg font-bold text-gray-800">{c.login}</h3>
                <p className="text-indigo-600 text-sm font-medium mb-3 flex items-center justify-center gap-1">
                  <FaMedal className="text-yellow-500 animate-bounce" />{" "}
                  {getRoleByContributions(c)}
                </p>

                {/* Contribution Badge */}
                {i === 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                    🥇 Top Contributor
                  </span>
                )}
                {i === 1 && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                    🥈 Silver Contributor
                  </span>
                )}
                {i === 2 && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                    🥉 Bronze Contributor
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-sm text-gray-700 my-5 w-full">
                <div className="flex flex-col items-center bg-white/60 backdrop-blur-md p-2 rounded-lg shadow-sm">
                  <FaCodeBranch className="text-indigo-600 mb-1" />
                  <span className="font-semibold">{c.public_repos}</span>
                  <span className="text-xs text-gray-500">Repos</span>
                </div>
                <div className="flex flex-col items-center bg-white/60 backdrop-blur-md p-2 rounded-lg shadow-sm">
                  <FaUserFriends className="text-indigo-600 mb-1" />
                  <span className="font-semibold">{c.followers || 0}</span>
                  <span className="text-xs text-gray-500">Followers</span>
                </div>
                <div className="flex flex-col items-center bg-white/60 backdrop-blur-md p-2 rounded-lg shadow-sm">
                  <span className="text-indigo-600 font-bold">🔥</span>
                  <span className="font-semibold">{c.contributions}</span>
                  <span className="text-xs text-gray-500">Contribs</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                <div
                  className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{
                    width: `${
                      (c.contributions /
                        Math.max(...contributors.map((x) => x.contributions))) *
                      100
                    }%`,
                  }}
                ></div>
              </div>

              {/* Profile Button */}
              <div className="mt-auto w-full">
                <a
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 ease-out transform hover:scale-105 relative overflow-hidden"
                >
                  <FaGithub className="text-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-blue-200" />
                  <span>Profile</span>
                  <FaExternalLinkAlt className="text-xs opacity-80 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contributors;
