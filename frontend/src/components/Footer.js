import { FaTwitter, FaLinkedin, FaDiscord, FaTelegram } from "react-icons/fa";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bulbs, setBulbs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    {
      const colors = [
        "#35001bff",
        "#006effff",
        "#ed3b3bff",
        "#930114ff",
        "#00ffa2ff",
        "#11ff00ff",
        "#00ccffff",
        "#ff0000ff",
        "#00e5ffff",
        "#0037ffff",
        "#abffa5ff",
        "#ff00ddff",
      ];
      const newBulbs = [];
      for (let i = 0; i < 15; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = `${50 + Math.random() * 100}px`;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const blur = `${20 + Math.random() * 20}px`;
        const opacity = 0.1 + Math.random() * 0.1;
        newBulbs.push({ color, size, top, left, blur, opacity });
      }
      setBulbs(newBulbs);
    }
  }, []);

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
      icon: <FaGithub size={20} />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/#",
      icon: <FaTwitter size={20} />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sandeepvashishtha/",
      icon: <FaLinkedin size={20} />,
    },
    {
      name: "Discord",
      href: "#discord",
      icon: <FaDiscord size={20} />,
    },
    {
      name: "Telegram",
      href: "https://t.me/eventra",
      icon: <FaTelegram size={20} />,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-indigo-50">
      {/* Bulbs Layer */}
      {bulbs.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            backgroundColor: b.color,
            filter: `blur(${b.blur})`,
            opacity: b.opacity,
            zIndex: 0, // behind glass
          }}
        />
      ))}

      {/* Glass Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 rounded-3xl bg-white/20 backdrop-blur-12xl shadow-xl">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold mt-20 bg-gradient-to-r from-pink-700 via-purple-500 to-indigo-700 text-transparent bg-clip-text drop-shadow-lg">
              Eventra
            </h2>
            <p className="text-gray-600 text-base">
              Open-source event management for communities worldwide.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key} className="space-y-4 ml-20">
              <h4 className="text-lg font-semibold text-black uppercase tracking-wider mb-3">
                {key}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name} className="flex items-center gap-2">
                    <a
                      href={link.href}
                      className="flex items-center gap-2 group text-gray-800 text-sm transition-colors hover:text-indigo-900"
                    >
                      {/* Icon with hover animation */}
                      {link.icon && (
                        <span className="text-blue-700 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
                          {link.icon}
                        </span>
                      )}

                      {/* Text with underline on hover */}
                      <span className="relative">
                        {link.name}
                        <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100 rounded"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-400 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between px-6">
          {/* Left side: Text */}
          <p className="text-gray-800 text-sm flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            <span>© {currentYear} Eventra - Made with ❤️ by</span>
            <a
              href="https://github.com/sandeepvashishtha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium relative group hover:text-indigo-900"
            >
              Sandeep Vashishtha
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100 rounded"></span>
            </a>
            <span>& contributors</span>
          </p>

          {/* Right side: Social icons */}
          <div className="flex space-x-3 mt-3 md:mt-0 mr-20">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                title={link.name}
                className="p-3 rounded-full bg-white/80 shadow-md text-indigo-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:text-pink-500 hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
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
