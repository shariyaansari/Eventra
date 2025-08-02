import React from 'react';
import './shared-layout.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    community: [
      { name: 'Create Event', href: '/create-event' },
      { name: 'Event Templates', href: '#templates' },
      { name: 'Community Events', href: '#community' },
      { name: 'Documentation', href: '#docs' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Open Source', href: '#opensource' },
      { name: 'GitHub', href: 'https://github.com/sandeepvashishtha/Eventra' },
      { name: 'Changelog', href: '#changelog' },
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'API Docs', href: '#api' },
      { name: 'Status', href: '#status' }
    ]
  };

  const socialLinks = [
  {
  name: 'X (Twitter)',
  href: 'https://twitter.com',
  icon: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.53 3H21L13.91 10.71L22.5 21H16.07L11.05 14.87L5.25 21H1.5L9.06 12.76L0.75 3H7.34L11.85 8.65L17.53 3ZM16.3 19.26H18.18L7.05 4.59H5.03L16.3 19.26Z" />
    </svg>
  ),
},

  {
    name: 'Discord',
    href: '#discord',
    icon: (
      <svg
        width="28"
        height="28"
        fill="white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.317 4.369A19.791 19.791 0 0 0 16.237 3a14.433 14.433 0 0 0-.676 1.375 18.539 18.539 0 0 0-6.264 0A14.432 14.432 0 0 0 8.621 3a19.796 19.796 0 0 0-4.08 1.369C2.257 8.246 1.523 12.024 2.001 15.729a19.885 19.885 0 0 0 5.958 2.91 14.786 14.786 0 0 0 1.26-2.082 9.31 9.31 0 0 1-1.459-.71c.123-.09.243-.18.361-.271a11.448 11.448 0 0 0 9.799 0c.118.09.239.181.361.271a9.325 9.325 0 0 1-1.459.71c.398.732.837 1.428 1.26 2.082a19.867 19.867 0 0 0 5.957-2.91c.515-4.148-.53-8.118-3.402-11.36zM8.448 13.646c-.938 0-1.701-.864-1.701-1.927 0-1.063.745-1.928 1.701-1.928s1.71.874 1.71 1.928c0 1.063-.755 1.927-1.71 1.927zm7.105 0c-.937 0-1.7-.864-1.7-1.927 0-1.063.745-1.928 1.7-1.928s1.71.874 1.71 1.928c0 1.063-.755 1.927-1.71 1.927z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/eventra',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 240 240"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm53.4 81.3-16.9 79.6c-1.3 5.9-4.9 7.3-9.9 4.5l-27.4-20.2-13.2 12.7c-1.5 1.5-2.7 2.7-5.5 2.7l2-28.7 52.3-47.1c2.3-2-0.5-3.1-3.6-1.1l-64.7 40.7-27.9-8.7c-6.1-1.9-6.2-6.1 1.3-9l108.3-41.8c5-1.9 9.4 1.2 7.8 8.4z"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/sandeepvashishtha',
    icon: (
      <svg
        width="28"
        height="28"
        fill="white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
        3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
        0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
        C4.422 17.07 3.633 16.7 3.633 16.7c-1.087-.744.084-.729.084-.729 
        1.205.084 1.838 1.236 1.838 1.236 
        1.07 1.834 2.807 1.304 3.495.997 
        .108-.775.42-1.304.763-1.604 
        -2.665-.3-5.467-1.334-5.467-5.933 
        0-1.31.467-2.38 1.236-3.22 
        -.123-.303-.536-1.523.117-3.176 
        0 0 1.008-.322 3.301 1.23 
        .96-.267 1.98-.399 3-.405 
        1.02.006 2.04.138 3 .405 
        2.29-1.552 3.297-1.23 3.297-1.23 
        .655 1.653.242 2.873.12 3.176 
        .77.84 1.235 1.91 1.235 3.22 
        0 4.61-2.807 5.63-5.48 5.922 
        .432.372.816 1.103.816 2.222 
        0 1.604-.015 2.896-.015 3.293 
        0 .318.216.694.825.576 
        C20.565 22.092 24 17.592 24 12.297 
        c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg
        width="28"
        height="28"
        fill="white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.028-3.036-1.852-3.036-1.853 0-2.136 1.445-2.136 2.939v5.666H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.368 4.268 5.452v6.291zM5.337 7.433a2.07 2.07 0 1 1 0-4.139 2.07 2.07 0 0 1 0 4.139zM6.788 20.452H3.884V9h2.904v11.452z"/>
      </svg>
    ),
  }
];




  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="text-gradient">Eventra</h3>
            <p className="footer-tagline">
              Open-source event management for communities worldwide.
            </p>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="social-link"
                  title={link.name}
                >
                  <span className="social-icon">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4 className="link-group-title">Community</h4>
              <ul className="link-list">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-group">
              <h4 className="link-group-title">Company</h4>
              <ul className="link-list">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-group">
              <h4 className="link-group-title">Support</h4>
              <ul className="link-list">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-tech">
            <p>
              Built with ❤️ using React.js, Spring Boot, and MySQL. 
              Open-source and designed for communities by communities. 
              Powered by passionate developers worldwide.
            </p>
          </div>
          <div className="footer-copyright">
            <p>© {currentYear}, Eventra - Created by Sandeep Vashishtha</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
