// src/Pages/Documentation/DocumentationPage.jsx
import React from "react";
import {
  FiBookOpen,
  FiLayers,
  FiCpu,
  FiCode,
  FiPlay,
  FiGitBranch,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";

export default function DocumentationPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

   // UPDATED: Code block styles for dark mode
  const codeBlockClass =
    "bg-indigo-50 dark:bg-gray-900 p-6 rounded-xl overflow-x-auto shadow text-indigo-900 dark:text-indigo-300 text-lg font-mono";

  return (
    // UPDATED: Main page background and text color
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-300 px-6 py-12 space-y-12">
      {/* Header */}
      <header className="text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          // UPDATED: Header text colors
          className="text-5xl font-extrabold text-indigo-900 dark:text-indigo-300 mb-4"
        >
          Eventra Documentation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-indigo-700 dark:text-indigo-400 text-xl"
        >
          Modern Event Management Platform for Builders & Communities
        </motion.p>
      </header>

      {/* Features Section */}
      <motion.section
        // UPDATED: Card background
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        {/* UPDATED: Title icon and text colors */}
        <div className="flex items-center mb-6 text-indigo-800 dark:text-indigo-400">
          <FiBookOpen className="mr-3 text-3xl" />
          <h2 className="text-3xl font-bold">Features</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-indigo-900 dark:text-gray-300">
          <div className="space-y-2">
            <h3 className="font-semibold text-xl">Core Features</h3>
            <ul className="list-disc list-inside space-y-1">
              {/* List items will inherit text color */}
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-xl">Platform Features</h3>
            <ul className="list-disc list-inside space-y-1">
              {/* List items will inherit text color */}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        // UPDATED: Card background
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        {/* UPDATED: Title icon and text colors */}
        <div className="flex items-center mb-6 text-indigo-800 dark:text-indigo-400">
          <FiCpu className="mr-3 text-3xl" />
          <h2 className="text-3xl font-bold">Tech Stack</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-indigo-900 dark:text-gray-300 text-lg">
          <div>
            <h3 className="text-2xl font-semibold mb-3">Backend</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Spring Boot 3.3.1 (Java 17)</li>
              <li>Database: MySQL (Aiven) / H2 (dev)</li>
              <li>Spring Security + JWT</li>
              <li>Maven build tool</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3">Frontend</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>React 18.2.0</li>
              <li>React Router DOM 6.8.0</li>
              <li>Framer Motion 8.5.2 for animations</li>
              <li>Tailwind CSS for modern styling</li>
              <li>Create React App build setup</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Architecture Section */}
      <motion.section
        // UPDATED: Card background
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        {/* UPDATED: Title icon and text colors */}
        <div className="flex items-center mb-6 text-indigo-800 dark:text-indigo-400">
          <FiLayers className="mr-3 text-3xl" />
          <h2 className="text-3xl font-bold">Architecture</h2>
        </div>
        <pre className={codeBlockClass}>
          {`Eventra/
├── .github/                   # GitHub workflows and templates
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                       # React source code
│   ├── components/            # React components
│   │   ├── admin/             # Admin dashboard components
│   │   │   ├── AdminDashboard.js
│   │   │   └── AdminDashboard.css
│   │   ├── auth/              # Authentication components
│   │   │   ├── Auth.css
│   │   │   ├── Login.js
│   │   │   ├── PasswordReset.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── Signup.js
│   │   │   └── Unauthorized.js
│   │   ├── common/            # Shared components
│   │   │   ├── common-components.css
│   │   │   ├── ErrorMessage.js
│   │   │   ├── EventCreation.js
│   │   │   ├── EventCreation.css
│   │   │   ├── Loading.js
│   │   │   ├── ProjectSubmission.js
│   │   │   └── ProjectSubmission.css
│   │   ├── Layout/            # Layout components
│   │   │   ├── Footer.js
│   │   │   └── Navbar.js
│   │   ├── styles/            # Component-specific styles
│   │   │   ├── components.css
│   │   │   ├── Contributors.css
│   │   │   ├── notFound.css
│   │   │   ├── scrolltotopButton.css
│   │   │   └── shared-layout.css
│   │   ├── user/              # User-specific components
│   │   │   ├── UserDashboard.css
│   │   │   └── UserDashboard.js
│   │   ├── CollaborationHub.js       # Collaboration features
│   │   ├── Contributors.js           # Contributors display
│   │   ├── Dashboard.js              # Main dashboard
│   │   ├── NotFound.js               # 404 page
│   │   ├── ScrollToTop.js            # Scroll to top button
│   │   └── SearchFilter.js           # Search and filter
│   ├── config/                # Configuration files
│   │   └── api.js                    # API endpoints and utilities
│   ├── context/               # React context providers
│   │   └── AuthContext.js            # Authentication context
│   ├── Pages/                 # Page components
│   │   ├── About/             # About page components
│   │   │   ├── AboutPage.js
│   │   │   ├── Features.js
│   │   │   ├── MissionVision.js
│   │   │   └── ModernAbout.js
│   │   ├── Contact/           # Contact page
│   │   │   └── ContactUs.js
│   │   ├── Events/            # Events pages
│   │   │   ├── eventsMockData.json
│   │   │   └── EventsPage.js
│   │   ├── Hackathons/        # Hackathons section
│   │   │   ├── HackathonHero.js
│   │   │   ├── hackathonMockData.json
│   │   │   └── HackathonPage.js
│   │   ├── Home/              # Home page
│   │   │   ├── HomePage.jsx
│   │   │   └── components/
│   │   │       ├── Community.js
│   │   │       ├── Features.js
│   │   │       ├── GitHubStats.jsx
│   │   │       ├── Hero.js
│   │   │       ├── Testimonials.js
│   │   │       └── WhatsHappening.js
│   │   ├── Leaderboard/       # Leaderboard page
│   │   │   └── Leaderboard.jsx
│   │   └── Projects/          # Projects section
│   │       ├── mockProjectsData.json
│   │       ├── ProjectHero.js
│   │       └── ProjectsPage.js
│   ├── App.js                 # Main App component
│   ├── App.css                # Global app styles
│   ├── index.js               # React entry point
│   └── index.css              # Global CSS styles
├── build/                     # Production build output
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── LICENSE                    # Apache 2.0 license
├── package.json               # npm dependencies and scripts
├── package-lock.json          # npm lock file
├── README.md                  # Project documentation
└── vercel.json                # Vercel deployment configuration`}
        </pre>
      </motion.section>

      {/* Quick Start Section */}
      <motion.section
        // UPDATED: Card background
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        {/* UPDATED: Title icon and text colors */}
        <div className="flex items-center mb-6 text-indigo-800 dark:text-indigo-400">
          <FiPlay className="mr-3 text-3xl" />
          <h2 className="text-3xl font-bold">Quick Start</h2>
        </div>
        <p className="text-indigo-900 dark:text-gray-300 text-lg mb-3">
          <strong>Prerequisites:</strong> Node.js 16+, npm/yarn, Git
        </p>
        <pre className={codeBlockClass}>
          {`git clone https://github.com/SandeepVashishtha/Eventra.git
cd Eventra
npm install
npm start`}
        </pre>
      </motion.section>

      {/* Deployment Section */}
      <motion.section
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-800 dark:text-indigo-400">
          <FiGitBranch className="mr-3 text-3xl" />
          <h2 className="text-3xl font-bold">Deployment</h2>
        </div>
        <ul className="list-disc list-inside text-indigo-900 dark:text-gray-300 text-lg space-y-1">
          <li>Frontend: Hosted on Vercel</li>
          <li>Backend: Spring Boot deployment on Azure or preferred host</li>
        </ul>
      </motion.section>

      {/* License Section */}
      <motion.section
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-800 dark:text-indigo-400">
          <FiCode className="mr-3 text-3xl" />
          <h2 className="text-3xl font-bold">License</h2>
        </div>
        <p className="text-indigo-900 dark:text-gray-300 text-lg">
          Apache License 2.0 - see the LICENSE file for details.
        </p>
      </motion.section>

      {/* Contributing Section */}
      <motion.section
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-800 dark:text-indigo-400">
          <FiUsers className="mr-3 text-3xl" />
          <h2 className="text-3xl font-bold">Contributing</h2>
        </div>
        <ol className="list-decimal list-inside space-y-2 text-indigo-900 dark:text-gray-300 text-lg">
          <li>Fork the repository</li>
          <li>
            Create a feature branch:{" "}
            <code className="bg-indigo-100 dark:bg-gray-700 px-2 py-1 rounded">
              git checkout -b feature/your-feature
            </code>
          </li>
          <li>
            Commit changes:{" "}
            <code className="bg-indigo-100 dark:bg-gray-700 px-2 py-1 rounded">
              git commit -m "Add feature"
            </code>
          </li>
          <li>Push branch and open a Pull Request</li>
        </ol>
      </motion.section>

      {/* UPDATED: Footer text, border, and link colors */}
      <footer className="text-center text-indigo-700 dark:text-indigo-400 mt-24 border-t border-indigo-200 dark:border-gray-700 pt-8 pb-6">
        <p className="text-indigo-800 dark:text-indigo-300 text-lg font-medium">
          Built with <span className="text-red-500">❤️</span> by the Eventra Team.
        </p>
        <p className="mt-2 text-indigo-700 dark:text-indigo-400 text-base">
          Visit{" "}
          <a
            href="https://eventra-psi.vercel.app/"
            className="text-indigo-900 dark:text-indigo-200 font-semibold underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Live Demo
          </a>
        </p>
      </footer>
    </div>
  );
}