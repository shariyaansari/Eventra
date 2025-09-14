import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiCheck, FiChevronDown, FiChevronUp } from "react-icons/fi";

const ContributorGuide = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [copied, setCopied] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const commands = [
    {
      id: "clone",
      title: "Clone Repository",
      cmd: "git clone https://github.com/YOUR-USERNAME/Eventra.git",
    },
    {
      id: "branch",
      title: "Create Branch",
      cmd: "git checkout -b feature/your-feature",
    },
    { id: "add", title: "Stage Changes", cmd: "git add ." },
    {
      id: "commit",
      title: "Commit Changes",
      cmd: 'git commit -m "Describe your changes"',
    },
    {
      id: "push",
      title: "Push Branch",
      cmd: "git push origin feature/your-feature",
    },
  ];

  const faqs = [
    {
      question: "What is a fork?",
      answer:
        "A fork is your personal copy of the repository where you can safely make changes.",
    },
    {
      question: "What is a pull request?",
      answer:
        "A pull request is a request to merge your changes back into the main project.",
    },
    {
      question: "How should I name branches?",
      answer:
        "Use descriptive names like 'feature/login' or 'fix/header-bug' to indicate purpose clearly.",
    },
  ];

  const copyCommand = (cmd, id) => {
    navigator.clipboard.writeText(cmd);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12 max-w-6xl mx-auto space-y-16">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          Welcome to Eventra Contributions!
        </h1>
        <p className="text-gray-700 text-base max-w-3xl mx-auto">
          "We're excited to have you join the Eventra community as a
          contributor. Whether you're fixing a bug, adding a feature, or
          improving documentation, this guide will help you navigate the process
          smoothly."
        </p>
      </div>

      {/* Step-by-Step Contribution Section */}
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Step-by-Step Contribution Journey
        </h2>
        <p className="text-gray-700 mb-6">
          Follow these steps to make your first contribution confidently.
        </p>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="text-xl font-semibold text-gray-900">
              1. Fork the Repository
            </h3>
            <p className="text-gray-700">
              Click the "Fork" button on GitHub to create your personal copy of
              Eventra.
            </p>
          </div>
          <div className="border-l-4 border-green-600 pl-4">
            <h3 className="text-xl font-semibold text-gray-900">
              2. Clone Locally
            </h3>
            <p className="text-gray-700">
              Download the repository to your local machine using git clone.
            </p>
          </div>
          <div className="border-l-4 border-purple-600 pl-4">
            <h3 className="text-xl font-semibold text-gray-900">
              3. Create a Branch
            </h3>
            <p className="text-gray-700">
              Make a new branch for your feature or bugfix to keep your changes
              organized.
            </p>
          </div>
          <div className="border-l-4 border-orange-600 pl-4">
            <h3 className="text-xl font-semibold text-gray-900">
              4. Make Changes
            </h3>
            <p className="text-gray-700">
              Edit files, fix bugs, or add features while following coding
              standards.
            </p>
          </div>
          <div className="border-l-4 border-red-600 pl-4">
            <h3 className="text-xl font-semibold text-gray-900">
              5. Commit & Push
            </h3>
            <p className="text-gray-700">
              Commit your changes with clear messages and push them to your
              forked repo.
            </p>
          </div>
          <div className="border-l-4 border-teal-600 pl-4">
            <h3 className="text-xl font-semibold text-gray-900">
              6. Create Pull Request
            </h3>
            <p className="text-gray-700">
              Open a PR to submit your changes for review. Be descriptive and
              polite!
            </p>
          </div>
        </div>
      </div>

      {/* Git Commands Section */}
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Essential Git Commands
        </h2>
        <p className="text-gray-700 mb-6">
          These commands will help you manage your local repository and push
          changes.
        </p>
        <div className="space-y-4">
          {commands.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center bg-gray-200 p-4 rounded shadow-sm border border-gray-100"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{c.title}</h3>
                <code className="text-blue-600">{c.cmd}</code>
              </div>
              <button
                onClick={() => copyCommand(c.cmd, c.id)}
                className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                {copied === c.id ? <FiCheck /> : <FiCopy />}
                <span>{copied === c.id ? "Copied" : "Copy"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-700 mb-6">
          Some common questions from new contributors.
        </p>
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = expandedFAQ === index;
            return (
              <div key={index} className="border rounded overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="text-gray-900">{faq.question}</span>
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 text-gray-700 bg-gray-50"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Ready to Contribute?
        </h2>
        <p className="text-gray-700 mb-6">
          Take the first step and submit your pull request today!
        </p>
        <a
          href="https://github.com/SandeepVashishtha/Eventra"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go to GitHub
        </a>
      </div>
    </div>
  );
};

export default ContributorGuide;
