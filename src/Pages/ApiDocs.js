import React from "react";
import { motion } from "framer-motion";
import { Server, AlertCircle, BookOpen, Users, Trophy } from "lucide-react";

const endpoints = [
  {
    icon: <Server className="w-7 h-7 text-blue-400" />,
    title: "Hackathons",
    desc: "Fetch upcoming and ongoing hackathons.",
    method: "GET",
    url: "/api/hackathons",
    example: `fetch("/api/hackathons")
  .then(res => res.json())
  .then(data => console.log(data));`,
    response: `[
  {
    "id": 1,
    "title": "CodeFest 2025",
    "startDate": "2025-09-20",
    "endDate": "2025-09-25",
    "participants": 150
  }
]`,
  },
  {
    icon: <BookOpen className="w-7 h-7 text-green-400" />,
    title: "Projects",
    desc: "Retrieve projects submitted to hackathons.",
    method: "GET",
    url: "/api/projects?hackathonId=<id>",
    example: `curl -X GET https://example.com/api/projects?hackathonId=1`,
    response: `[
  {
    "id": 42,
    "title": "AI-Powered Chatbot",
    "author": "Jane Doe",
    "votes": 120
  }
]`,
  },
  {
    icon: <Users className="w-7 h-7 text-purple-400" />,
    title: "Contributors",
    desc: "Get a list of top contributors and GSOC participants.",
    method: "GET",
    url: "/api/contributors",
    example: `fetch("/api/contributors", {
  headers: { Authorization: "Bearer <API_KEY>" }
})`,
    response: `[
  {
    "id": 7,
    "username": "dev_ankita",
    "points": 230,
    "rank": 2
  }
]`,
  },
  {
    icon: <Trophy className="w-7 h-7 text-yellow-400" />,
    title: "Leaderboard",
    desc: "Fetch leaderboard rankings of participants.",
    method: "GET",
    url: "/api/leaderboard?limit=10",
    example: `curl -X GET https://example.com/api/leaderboard?limit=10`,
    response: `[
  {
    "rank": 1,
    "username": "coder123",
    "points": 500
  }
]`,
  },
];

const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 px-6 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          API Documentation
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Use our RESTful APIs to interact with{" "}
          <span className="text-blue-400">Hackathons</span>,{" "}
          <span className="text-green-400">Projects</span>,{" "}
          <span className="text-purple-400">Contributors</span>, and{" "}
          <span className="text-yellow-400">Leaderboards</span>{" "}
          programmatically.
        </p>
      </section>

      {/* Endpoints Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Available Endpoints
        </h2>
        <div className="overflow-x-auto rounded-xl shadow border border-gray-800">
          <table className="w-full border-collapse">
            <thead className="bg-[#1c1c1c]">
              <tr>
                <th className="p-4 text-left">API</th>
                <th className="p-4 text-left">Method</th>
                <th className="p-4 text-left">Endpoint</th>
                <th className="p-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((ep, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-800 hover:bg-[#1a1a1a] transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    {ep.icon}
                    <span className="font-medium">{ep.title}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-bold rounded bg-blue-900 text-blue-300">
                      {ep.method}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-sm text-gray-300">
                    {ep.url}
                  </td>
                  <td className="p-4 text-gray-400">{ep.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Endpoint Details with Examples */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Examples & Responses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {endpoints.map((ep, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                {ep.icon}
                <h3 className="text-xl font-semibold">{ep.title}</h3>
              </div>
              <p className="text-gray-400 mb-3">{ep.desc}</p>

              {/* Example Request */}
              <h4 className="font-semibold mb-2">Example Request</h4>
              <pre className="bg-black text-green-400 text-sm rounded-lg p-3 overflow-x-auto">
                <code>{ep.example}</code>
              </pre>

              {/* Example Response */}
              <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
              <pre className="bg-black text-yellow-300 text-sm rounded-lg p-3 overflow-x-auto">
                <code>{ep.response}</code>
              </pre>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Error Codes */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Error Codes</h2>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-semibold">Common Errors</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#222]">
                <tr>
                  <th className="p-3 text-left">Code</th>
                  <th className="p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-800">
                  <td className="p-3 text-red-400 font-bold">400</td>
                  <td className="p-3">
                    Bad Request (missing or invalid parameters)
                  </td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="p-3 text-red-400 font-bold">401</td>
                  <td className="p-3">
                    Unauthorized (invalid or missing API key)
                  </td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="p-3 text-red-400 font-bold">404</td>
                  <td className="p-3">
                    Not Found (endpoint or resource not available)
                  </td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="p-3 text-red-400 font-bold">500</td>
                  <td className="p-3">
                    Server Error (something went wrong on our side)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiDocs;
