import { FaTwitter, FaLinkedin, FaDiscord, FaTelegram } from "react-icons/fa";
import {
  FaInfoCircle,
  FaGithub,
  FaCode,
  FaFileAlt,
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
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
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
        href: "#community",
        icon: <FaUsers size={14} />,
      },
      { name: "Documentation", href: "#docs", icon: <FaBook size={14} /> },
    ],
    quick_links: [
      { name: "About", href: "/about", icon: <FaInfoCircle size={14} /> },
      { name: "Open Source", href: "#opensource", icon: <FaCode size={14} /> },
      {
        name: "GitHub",
        href: "https://github.com/sandeepvashishtha/Eventra",
        icon: <FaGithub size={14} />,
      },
      { name: "Changelog", href: "#changelog", icon: <FaFileAlt size={14} /> },
      { name: "Privacy", href: "#privacy", icon: <FaShieldAlt size={14} /> },
      { name: "Terms", href: "#terms", icon: <FaFileContract size={14} /> },
    ],
    support: [
      {
        name: "Help Center",
        href: "#help",
        icon: <FaQuestionCircle size={14} />,
      },
      { name: "Contact Us", href: "#contact", icon: <FaEnvelope size={14} /> },
      { name: "API Docs", href: "#api", icon: <FaBookOpen size={14} /> },
      { name: "Status", href: "#status", icon: <FaServer size={14} /> },
    ],
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/sandeepvashishtha/Eventra",
      icon: <FaGithub className="size-10 p-2 rounded-full text-indigo-500 bg-gray-100" size={20} />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/#",
      icon: <FaTwitter className="size-10 p-2 rounded-full text-indigo-500 bg-gray-100" size={20} />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sandeepvashishtha/",
      icon: <FaLinkedin className="size-10 p-2 rounded-full text-indigo-500 bg-gray-100" size={20} />,
    },
    {
      name: "Discord",
      href: "#discord",
      icon: <FaDiscord className="size-10 p-2 rounded-full text-indigo-500 bg-gray-100" size={20} />,
    },
    {
      name: "Telegram",
      href: "https://t.me/eventra",
      icon: <FaTelegram className="size-10 p-2 rounded-full text-indigo-500 bg-gray-100" size={20} />,
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-indigo-600">
              Eventra
            </h2>
            <p className="text-gray-600 text-sm">
              Open-source event management for communities worldwide.
            </p>
          </div>
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key} className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {key.replace('_', ' ')}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                    >
                      {link.icon && (
                        <span className="text-indigo-500">
                          {link.icon}
                        </span>
                      )}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {currentYear} Eventra. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-indigo-600 transition-colors"
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
      </div>
    </footer>
  );
};

export default Footer;
