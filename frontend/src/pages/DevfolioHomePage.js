import React from 'react';
import { 
  Code, 
  Users, 
  Trophy, 
  Star, 
  GitHub, 
  Twitter, 
  Discord,
  ArrowRight,
  CheckCircle
} from '@mui/icons-material';
import './DevfolioHomePage.css';

const DevfolioHomePage = () => {
  const stats = [
    { number: '800,000+', label: 'builders' },
    { number: '75,000+', label: 'projects' },
    { number: '1,300+', label: 'hackathons' }
  ];

  const features = [
    {
      icon: <Code className="feature-icon" />,
      title: 'Your digital up-to-date resumé',
      description: 'Showcase to the world your skills, links to your social profile, where you have worked and what you have worked on and the projects you have built.',
      cta: 'Create your Portfolio'
    },
    {
      icon: <Trophy className="feature-icon" />,
      title: 'A showcase of all your projects',
      description: 'Give your weekend projects, side projects, hobby projects, serious ventures a place to breathe, invite collaborators and inspire other builders.',
      cta: 'Add your project'
    },
    {
      icon: <Users className="feature-icon" />,
      title: 'Your portal to the best hackathons',
      description: 'Applying to hackathons is as simple as a click of a button. We save all the required info so that you don\'t have to fill them over and over again.',
      cta: 'Browse all hackathons'
    },
    {
      icon: <Star className="feature-icon" />,
      title: 'Your skill assessment playground',
      description: 'Take our quiz, earn a badge and see where you stand among the rest of the builders.',
      cta: 'Take the quiz'
    }
  ];

  const testimonials = [
    {
      quote: "The fact that our hack [InstaDApp] saw the light of the day is a great signal about the success of the hackathons.",
      author: "Samyak and Sowmay Jain",
      role: "Co-founders, InstaDApp"
    },
    {
      quote: "Magical hacking experience plus fun and enriched networking. The journey to build Incento started at one of such amazing hackathon.",
      author: "Chetan Badhe",
      role: "Co-founder, Incento"
    },
    {
      quote: "Connected me to awesome developers & made me feel inclusive. Has been doing an amazing job in keeping the community intact.",
      author: "Devika K Das",
      role: "Software Engineer, Google"
    }
  ];

  const hackathons = [
    {
      name: 'InOut 6.0',
      date: 'October 19, 2024',
      location: 'Bengaluru, India',
      status: 'Live'
    },
    {
      name: 'ETHIndia 3.0',
      date: 'December 02, 2024',
      location: 'Bengaluru, India',
      status: 'Upcoming'
    },
    {
      name: 'DevCon 2024',
      date: 'November 15, 2024',
      location: 'Mumbai, India',
      status: 'Upcoming'
    }
  ];

  return (
    <div className="devfolio-homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Redefining economic opportunities
              <br />
              <span className="hero-title-highlight">for builders</span>
            </h1>
            <p className="hero-description">
              Your premier platform for discovering, creating, and managing developer portfolios,
              projects and hackathons. Connect with your community and showcase your skills.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                Get Started <ArrowRight className="btn-icon" />
              </button>
              <button className="btn-secondary">
                Explore Projects
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="floating-card card-1">
                <Code className="card-icon" />
                <span>Projects</span>
              </div>
              <div className="floating-card card-2">
                <Users className="card-icon" />
                <span>Community</span>
              </div>
              <div className="floating-card card-3">
                <Trophy className="card-icon" />
                <span>Hackathons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="stats-title">We drop jaws!</h2>
          <p className="stats-subtitle">
            In January 2019, we powered our first community hackathon. Since then we've grown to
          </p>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathons Section */}
      <section className="hackathons-section">
        <div className="container">
          <h2 className="section-title">Happening now</h2>
          <div className="hackathons-grid">
            {hackathons.map((hackathon, index) => (
              <div key={index} className="hackathon-card">
                <div className="hackathon-header">
                  <h3 className="hackathon-name">{hackathon.name}</h3>
                  <span className={`hackathon-status status-${hackathon.status.toLowerCase()}`}>
                    {hackathon.status}
                  </span>
                </div>
                <div className="hackathon-details">
                  <p className="hackathon-date">{hackathon.date}</p>
                  <p className="hackathon-location">{hackathon.location}</p>
                </div>
                <button className="hackathon-btn">View Submissions</button>
              </div>
            ))}
          </div>
          <div className="hackathons-footer">
            <button className="btn-outline">See all hackathons</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            DevPortfolio is <span className="title-highlight">everything</span>.
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <button className="feature-cta">
                  {feature.cta} <ArrowRight className="cta-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <div className="container">
          <h2 className="section-title">We speak, we listen, we discuss, we grow.</h2>
          <p className="section-subtitle">
            Share ideas, feedback, connect with people over the love of our community.
          </p>
          <div className="community-actions">
            <button className="btn-primary large">
              <Discord className="btn-icon" />
              Join our Discord
            </button>
            <button className="btn-outline large">
              <Twitter className="btn-icon" />
              Follow on Twitter
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-card">
              <h3 className="cta-title">DevPortfolio for communities</h3>
              <p className="cta-description">
                No more creating Google Forms and managing participants in an Excel sheet. 
                You focus on your people, leave the rest to us.
              </p>
              <button className="btn-primary">
                Request platform
              </button>
              <p className="cta-note">*absolutely free for student-run hackathons.</p>
            </div>
            <div className="cta-card">
              <h3 className="cta-title">DevPortfolio for companies</h3>
              <p className="cta-description">
                Your engineering team and developer products need a brand and a fan base. 
                That's where we come in.
              </p>
              <button className="btn-primary">
                Copy email address
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <h2 className="footer-title">
              We love software and the
              <br />
              <span className="footer-title-highlight">people who build them</span>.
            </h2>
            <div className="social-links">
              <a href="#" className="social-link"><Discord /></a>
              <a href="#" className="social-link"><Twitter /></a>
              <a href="#" className="social-link"><GitHub /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">COMMUNITY</h4>
              <ul className="footer-link-list">
                <li><a href="#">Organize a hackathon</a></li>
                <li><a href="#">Explore hackathons</a></li>
                <li><a href="#">Code of Conduct</a></li>
                <li><a href="#">Brand Assets</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">COMPANY</h4>
              <ul className="footer-link-list">
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Jobs</a></li>
                <li><a href="#">Changelog</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">SUPPORT</h4>
              <ul className="footer-link-list">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Refund Policy</a></li>
                <li><a href="#">Status</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-copy">
              Built with React, Tailwind CSS and a bunch of other libraries that help making 
              beautiful things on the internet possible. We are forever in your debt.
            </p>
            <p className="footer-copyright">
              © 2025, DevPortfolio Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DevfolioHomePage;
