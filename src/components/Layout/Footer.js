import { useState } from "react";
import { FaLinkedin, FaDiscord, FaTelegram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import {
  FaInfoCircle,
  FaGithub,
  FaShieldAlt,
  FaFileContract,
  FaQuestionCircle,
  FaEnvelope,
  FaBookOpen,
  FaPlus,
  FaClipboardList,
  FaUsers,
  FaBook,
  FaServer,
  FaHome,
  FaCalendarAlt,
  FaRocket,
  FaFolder,
  FaTrophy,
  FaComments,
} from "react-icons/fa";

// Toast Component
const Toast = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } transition-opacity duration-300`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showToast("Please enter your email address", "error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real application, you would make an API call to your backend here
      console.log("Submitting email:", email);

      showToast("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = {
    quick_links: [
      { name: "Home", href: "/", icon: <FaHome size={14} /> },
      { name: "Events", href: "/events", icon: <FaCalendarAlt size={14} /> },
      { name: "Hackathons", href: "/hackathons", icon: <FaRocket size={14} /> },
      { name: "Projects", href: "/projects", icon: <FaFolder size={14} /> },
      { name: "About", href: "/about", icon: <FaInfoCircle size={14} /> },
      { name: "Privacy", href: "/privacy", icon: <FaShieldAlt size={14} /> },
      { name: "Terms", href: "/terms", icon: <FaFileContract size={14} /> },
    ],
    community: [
      {
        name: "Create Event",
        href: "/create-event",
        icon: <FaPlus size={14} />,
      },
      {
        name: "Event Templates",
        href: "#templates",
        icon: <FaClipboardList size={14} />,
      },
      {
        name: "Community Events",
        href: "/communityEvent",
        icon: <FaUsers size={14} />,
      },
      {
        name: "Documentation",
        href: "/documentation",
        icon: <FaBook size={14} />,
      },
      {
        name: "Contributors",
        href: "/contributors",
        icon: <FaUsers size={14} />,
      },
      {
        name: "Contributors Guide",
        href: "/contributorguide",
        icon: <FaBook size={14} />,
      },
      {
        name: "LeaderBoard",
        href: "/leaderBoard",
        icon: <FaTrophy size={14} />,
      },
    ],
    support: [
      {
        name: "Help Center",
        href: "/helpcenter",
        icon: <FaQuestionCircle size={14} />,
      },
      { name: "Contact Us", href: "/contact", icon: <FaEnvelope size={14} /> },
      { name: "Feedback", href: "/feedback", icon: <FaComments size={14} /> },
      { name: "API Docs", href: "/apiDocs", icon: <FaBookOpen size={14} /> },
      { name: "Status", href: "#status", icon: <FaServer size={14} /> },
    ],
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/sandeepvashishtha/Eventra",
      icon: (
        <FaGithub
          // UPDATED: Added dark mode background and hover colors
          className="size-10 p-2 rounded-full text-indigo-500 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-gray-600"
          size={20}
        />
      ),
    },
    {
      name: "X (formerly Twitter)",
      href: "https://x.com/#",
      icon: (
        <SiX
          // UPDATED: Added dark mode background and hover colors
          className="size-10 p-2 rounded-full text-indigo-500 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-gray-600"
          size={20}
        />
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sandeepvashishtha/",
      icon: (
        <FaLinkedin
          // UPDATED: Added dark mode background and hover colors
          className="size-10 p-2 rounded-full text-indigo-500 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-gray-600"
          size={20}
        />
      ),
    },
    {
      name: "Discord",
      href: "#discord",
      icon: (
        <FaDiscord
          // UPDATED: Added dark mode background and hover colors
          className="size-10 p-2 rounded-full text-indigo-500 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-gray-600"
          size={20}
        />
      ),
    },
    {
      name: "Telegram",
      href: "https://t.me/eventra",
      icon: (
        <FaTelegram
          // UPDATED: Added dark mode background and hover colors
          className="size-10 p-2 rounded-full text-indigo-500 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-gray-600"
          size={20}
        />
      ),
    },
  ];

  return (
    <>
      {/* UPDATED: Added dark mode background and border colors */}
      <footer className="bg-indigo-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="space-y-4 md:col-span-2">
              {/* UPDATED: Added dark mode text color */}
              <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Eventra</h2>
              {/* UPDATED: Added dark mode text color */}
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Open-source event management for communities worldwide.
              </p>

              {/* Newsletter Subscription Form */}
              <div className="mt-4">
                {/* UPDATED: Added dark mode text color */}
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
                  Subscribe to our newsletter
                </h4>
                {/* UPDATED: Added dark mode text color */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Get the latest updates, event tips, and community news.
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    // UPDATED: Added dark mode background, text, border, and placeholder colors
                    className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent flex-grow"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
                {/* UPDATED: Added dark mode text color */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>

            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key} className="space-y-3">
                {/* UPDATED: Added dark mode text color */}
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                  {key.replace("_", " ")}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        // UPDATED: Added dark mode text and hover colors
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-2 transition-colors"
                      >
                        {link.icon && (
                          // UPDATED: Added dark mode icon text color
                          <span className="text-indigo-500 dark:text-indigo-400">{link.icon}</span>
                        )}
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media Icons - Above the line, right side */}
          <div className="mt-3 pt-2 flex justify-end">
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  // UPDATED: Added dark mode text and hover colors
                  className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright - Below the line, centered */}
          {/* UPDATED: Added dark mode border color */}
          <div className="border-t border-gray-400 dark:border-gray-700 mt-4 pt-3 pb-2 flex justify-center">
            {/* UPDATED: Added dark mode text color */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Eventra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}
    </>
  );
};

export default Footer;
