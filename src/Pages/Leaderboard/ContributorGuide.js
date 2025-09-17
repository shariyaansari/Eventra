import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
} from "react-icons/fi";
import {
  FiFile,
  FiLock,
  FiCode,
  FiFileText,
  FiPackage,
  FiCheckCircle,
  FiServer,
  FiClipboard,
} from "react-icons/fi";
import { FiGitBranch } from "react-icons/fi";
import { FiGithub, FiArrowRightCircle } from "react-icons/fi";

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
    {
      question: "Can I contribute without coding?",
      answer: "Yes! You can improve documentation, design, or testing.",
    },
  ];

  const contributionTypes = [
    {
      title: "Bug Fixes",
      description:
        "Identify bugs from issues tagged 'bug' and submit a PR with a clear explanation and test cases if possible.",
      example: "Example: Fix header alignment issue in responsive view.",
    },
    {
      title: "Features",
      description:
        "Add a new feature or improve an existing one. Make sure to follow existing patterns and code structure.",
      example: "Example: Add dark mode toggle button with smooth animation.",
    },
    {
      title: "Documentation",
      description:
        "Improve README, add examples, or clarify instructions for contributors.",
      example: "Example: Add step-by-step setup instructions with screenshots.",
    },
    {
      title: "Testing",
      description:
        "Write unit or integration tests for existing code to ensure stability and prevent regressions.",
      example: "Example: Add Jest tests for new login form components.",
    },
    {
      title: "Design & UI",
      description:
        "Improve the user interface, accessibility, or design consistency across the project.",
      example:
        "Example: Update button styles for better contrast and hover effects.",
    },
    {
      title: "Code Refactoring",
      description:
        "Improve existing code structure without changing functionality to make it cleaner, readable, and maintainable.",
      example:
        "Example: Simplify a complex function or restructure components into smaller reusable pieces.",
    },
  ];

  const copyCommand = (cmd, id) => {
    navigator.clipboard.writeText(cmd);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    // UPDATED: Main page background
    <div className="bg-gray-50 dark:bg-black min-h-screen px-4 sm:px-6 lg:px-12 py-12 max-w-6xl mx-auto space-y-16">
      {/* Page Heading */}
      <div className="text-center mb-12">
        {/* UPDATED: Text colors */}
        <h1 className="text-5xl font-bold text-indigo-900 dark:text-gray-100 mb-4">
          Welcome to Eventra Contributions!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-base max-w-3xl mx-auto">
          We're excited to have you join the Eventra community! This guide
          provides detailed, actionable instructions, examples, and interactive
          tips to help first-time contributors succeed.
        </p>
      </div>

      {/* Step-by-Step Contribution Section */}
      {/* UPDATED: Section card background */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        {/* UPDATED: Title text */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 mt-8 text-center">
          Step-by-Step Contribution Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contributionTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-l-4 border-indigo-500 dark:border-indigo-400 p-4 bg-gray-200 dark:bg-gray-700 rounded shadow-sm"
            >
              <div className="flex items-center mb-2">
                <FiInfo className="text-indigo-500 dark:text-indigo-400 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {type.title}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{type.description}</p>
              <p className="text-gray-600 dark:text-gray-400 italic">💡 {type.example}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Important Files Section */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center flex items-center justify-center gap-3">
          <FiFile className="text-indigo-500 dark:text-indigo-400" size={32} />
          Important Files in This Project
        </h2>
        <div className="overflow-x-auto">
          {/* UPDATED: Table styles */}
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
            <thead className="bg-indigo-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">File</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
              {/* Table rows will have updated text and hover colors */}
              <tr className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 flex items-center gap-2 font-mono text-indigo-500 dark:text-indigo-400">
                  <FiLock /> .env
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  Stores environment variables like API keys. Do not commit this file.
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 flex items-center gap-2 font-mono text-indigo-500">
                  <FiLock /> .env.example
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  Example environment file. Use it as a template to create your
                  own .env file.
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 flex items-center gap-2 font-mono text-indigo-500">
                  <FiCode /> .gitignore
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  Lists files/folders to ignore in Git commits, like
                  node_modules or .env.
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 flex items-center gap-2 font-mono text-indigo-500">
                  <FiFileText /> LICENSE
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  Contains the license details for the project.
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 flex items-center gap-2 font-mono text-indigo-500">
                  <FiClipboard /> README.md
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  Main documentation for the project. Explains setup, usage, and
                  contribution guide.
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 flex items-center gap-2 font-mono text-indigo-500">
                  <FiPackage /> package.json
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  Contains project metadata, scripts, and dependencies.
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 flex items-center gap-2 font-mono text-indigo-500">
                  <FiCheckCircle /> package-lock.json
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  Locks dependency versions for consistent installs across
                  environments.
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 flex items-center gap-2 font-mono text-indigo-500">
                  <FiServer /> vercel.json
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  Configuration file for deployment on Vercel.
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 flex items-center gap-2 font-mono text-indigo-500">
                  <FiFileText /> CODE_OF_CONDUCT.md
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  Outlines expected behavior and guidelines for contributors.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue & PR Workflow Section */}
      {/* UPDATED: Section card background */}
<div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md mt-10">
  {/* UPDATED: Title text and icon color */}
  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center flex items-center justify-center gap-3">
    <FiGitBranch className="text-indigo-500 dark:text-indigo-400" size={32} />
    Issue & PR Workflow
  </h2>


        {/* Numbered Steps */}
        <div className="space-y-8">
          {[
            {
              step: 1,
              icon: <FiFileText />,
              title: "Pick an Issue",
              description: (
                <>
                  Browse issues labeled{" "}
                  <span className="font-mono text-indigo-500">
                    good-first-issue
                  </span>{" "}
                  or <span className="font-mono text-indigo-500">bug</span>.
                  Choose one you can work on.
                </>
              ),
            },
            {
              step: 2,
              icon: <FiGitBranch />,
              title: "Create a Branch",
              description: (
                <>
                  Use descriptive branch names like{" "}
                  <span className="font-mono text-indigo-500">
                    feature/add-login
                  </span>{" "}
                  or{" "}
                  <span className="font-mono text-indigo-500">
                    fix/navbar-bug
                  </span>
                  .
                </>
              ),
            },
            {
              step: 3,
              icon: <FiCheckCircle />,
              title: "Make Changes & Commit",
              description: (
                <>
                  Make your code changes locally. Commit with clear messages
                  like{" "}
                  <span className="font-mono text-indigo-500">
                    Add login form component
                  </span>
                  .
                </>
              ),
            },
            {
              step: 4,
              icon: <FiArrowRightCircle />,
              title: "Open a Pull Request",
              description: (
                <>
                  Push your branch to GitHub and open a PR. Follow the template
                  below:
                </>
              ),
              code: `### Description
Explain what your PR does.

### Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

### Checklist
- [ ] I have tested my changes
- [ ] I have updated documentation if needed

### Related Issue
Closes #<issue_number>`,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col md:flex-row items-start gap-4 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-lg">
                  {item.step}
                </div>
              </div>
              <div className="flex-1">
                {/* UPDATED: Text colors */}
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2">
                  {item.icon} {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{item.description}</p>
                {item.code && (
                  // UPDATED: Code block styles
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                    {item.code}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional visual flowchart */}
        <div className="mt-10 flex justify-center items-center gap-6 overflow-x-auto">
          <div className="flex flex-col items-center gap-2">
            <FiFileText className="text-indigo-500 dark:text-indigo-400" size={36} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Pick Issue
            </span>
          </div>
          <div className="text-indigo-300 dark:text-gray-600 text-2xl">→</div>
          <div className="flex flex-col items-center gap-2">
            <FiGitBranch className="text-indigo-500 dark:text-indigo-400" size={36} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Create Branch
            </span>
          </div>
          <div className="text-indigo-300 dark:text-gray-600 text-2xl">→</div>
          <div className="flex flex-col items-center gap-2">
            <FiCheckCircle className="text-indigo-500 dark:text-indigo-400" size={36} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Commit Changes
            </span>
          </div>
          <div className="text-indigo-300 dark:text-gray-600 text-2xl">→</div>
          <div className="flex flex-col items-center gap-2">
            <FiArrowRightCircle className="text-indigo-500 dark:text-indigo-400" size={36} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Open PR</span>
          </div>
        </div>
      </div>

      {/* Git Commands Section */}
      {/* UPDATED: Section card background */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        {/* UPDATED: Title text */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Essential Git Commands
        </h2>
        <div className="space-y-4">
          {commands.map((c) => (
            <div
              key={c.id}
              // UPDATED: Command item background and border
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div>
                {/* UPDATED: Text colors */}
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{c.title}</h3>
                <pre className="bg-gray-200 dark:bg-gray-900/50 p-2 rounded mt-1 overflow-x-auto text-sm text-blue-600 dark:text-blue-400">
                  {c.cmd}
                </pre>
              </div>
              <button
                onClick={() => copyCommand(c.cmd, c.id)}
                // UPDATED: Copy button styles
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition"
              >
                {copied === c.id ? <FiCheck /> : <FiCopy />}
                <span>{copied === c.id ? "Copied" : "Copy"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        {/* UPDATED: Title text */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = expandedFAQ === index;
            return (
              // UPDATED: Accordion border
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(isOpen ? null : index)}
                  // UPDATED: Accordion button styles
                  className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <span className="text-gray-900 dark:text-gray-100">{faq.question}</span>
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50"
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

      <div className="relative overflow-hidden rounded-xl p-10 shadow-xl text-center text-white bg-gradient-to-r from-black via-indigo-600 via-purple-600 to-pink-900">
        {/* Decorative Icons */}
        <FiArrowRightCircle className="absolute top-5 left-5 text-white/20 text-6xl rotate-12" />
        <FiArrowRightCircle className="absolute bottom-5 right-5 text-white/20 text-6xl -rotate-12" />

        {/* Content */}
        <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
          <FiArrowRightCircle /> Ready to Contribute?
        </h2>
        <p className="mb-6 text-white/90 text-lg">
          Take the first step and submit your pull request today!
        </p>
        <motion.a
          href="https://github.com/SandeepVashishtha/Eventra"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-300 to-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
        >
          <FiGithub className="text-lg" /> Go to GitHub
        </motion.a>
      </div>
    </div>
  );
};

export default ContributorGuide;
