import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  Search,
  Award,
  Users,
  FileText,
  Star,
  Calendar, Settings
} from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Import for navigation

const categories = [
  {
    icon: <Calendar className="w-8 h-8 text-blue-500" />,
    title: "Hosting Hackathons",
    description: "Learn how to create, manage, and publish hackathons.",
    link: "/hackathons",
  },
  {
    icon: <FileText className="w-8 h-8 text-green-500" />,
    title: "Project Submission",
    description: "Step-by-step guide for submitting projects correctly.",
    link: "/submit-project",
  },
  {
    icon: <Search className="w-8 h-8 text-yellow-500" />,
    title: "Explore Projects",
    description: "Search, filter, and bookmark projects on the platform.",
    link: "/projects",
  },
  {
    icon: <Users className="w-8 h-8 text-purple-500" />,
    title: "Contributing",
    description: "Guides for contributors and GSOC participants.",
    link: "/contributorguide",
  },
  {
    icon: <Award className="w-8 h-8 text-red-500" />,
    title: "Leaderboard",
    description: "Understand points, ranks, and top contributors.",
    link: "/leaderBoard",
  },
  {
    icon: <Star className="w-8 h-8 text-pink-500" />,
    title: "Tips & Best Practices",
    description: "Maximize your visibility, submissions, and participation.",
    link: "/documentation",
  },
  {
    icon: <Calendar className="w-8 h-8 text-indigo-500" />,
    title: "Events",
    description: "Stay updated with upcoming hackathons and events.",
    link: "/events",
  },
  {
    icon: <FileText className="w-8 h-8 text-gray-600" />,
    title: "See on GitHub",
    description: "Browse our open-source repositories and contributions.",
    link: "https://github.com/SandeepVashishtha/Eventra",
  },
  {
    icon: <Settings className="w-8 h-8 text-teal-500" />,
    title: "API Docs",
    description: "Explore our API documentation for developers.",
    link: "/apiDocs",
  },
];

const faqs = [
  {
    question: "How do I host a hackathon?",
    answer:
      "Go to the 'Host Hackathon' page, fill in the details including title, dates, description, prizes, and publish. Ensure all fields are correctly filled.",
  },
  {
    question: "How can I submit a project?",
    answer:
      "Navigate to 'Submit Project', fill in the required fields, upload your files, and submit before the deadline.",
  },
  {
    question: "How are leaderboard points calculated?",
    answer:
      "Points are awarded based on hackathon wins, contributions, and project submissions. Leaderboard updates in real-time.",
  },
  {
    question: "How can I contribute to GSOC tasks?",
    answer:
      "Check the 'Contribute' page for open issues, fork the repository, make a PR, and follow contribution guidelines.",
  },
  {
    question: "Can I explore projects without signing up?",
    answer:
      "Yes, projects are publicly viewable, but you need an account to submit or bookmark projects.",
  },
];

const HelpCenter = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Need Help with Hackathons, Projects, or Contributions?
        </motion.h1>
        <motion.p
          className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          Find step-by-step guides, FAQs, and tips to make the most of our
          platform.
        </motion.p>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }}>
              {/* ✅ Use React Router <Link> */}
              <Link
                to={cat.link}
                className="block bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="mb-4">{cat.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {cat.description}
                </p>
              </Link>

              {/* ❌ If not using React Router, uncomment below and remove <Link> */}
              {/* 
              <a
                href={cat.link}
                className="block bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="mb-4">{cat.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {cat.description}
                </p>
              </a> 
              */}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tutorials / Guides Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Step-by-Step Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Hosting a Hackathon",
              icon: (
                <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              ),
              link: "/guides/hosting",
            },
            {
              title: "Submitting a Project",
              icon: (
                <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
              ),
              link: "/guides/submission",
            },
            {
              title: "Contributing to GSOC",
              icon: (
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              ),
              link: "/guides/contributing",
            },
          ].map((guide, idx) => (
            <motion.a
              href={guide.link}
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center justify-center"
            >
              {guide.icon}
              <h3 className="font-semibold text-lg text-center">
                {guide.title}
              </h3>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-8 px-4 max-w-6xl mx-auto mt-2 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Guidelines for Using the Platform
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Always check the hackathon rules before submitting a project.</li>
            <li>Use descriptive titles and proper documentation for your submissions.</li>
            <li>Follow contribution guidelines for GSOC or other open-source tasks.</li>
            <li>Respect deadlines for hackathons and project submissions.</li>
            <li>Explore existing projects before submitting to avoid duplicates.</li>
            <li>Reach out to support if you encounter any issues or errors.</li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow cursor-pointer"
              onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{faq.question}</h4>
                {expandedFAQ === idx ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {expandedFAQ === idx && (
                <motion.p
                  className="mt-2 text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
