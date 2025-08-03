import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatsHappening from './components/WhatsHappening';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Community from './components/Community';
import Footer from './components/Footer';
import EventCreation from './components/common/EventCreation';
import AboutPage from './components/AboutPage';
import EventsSection from './components/EventsSection';
import HackathonHub from './components/HackathonHub';
import ProjectGallery from './components/ProjectGallery';
import createScrollToTopButton from './components/scrolltotopButton';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  useEffect(() => {
    createScrollToTopButton(); 
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <WhatsHappening />
                  <Features />
                  <Testimonials />
                  <Community />
                </>
              }
            />
            <Route path="/events" element={<EventsSection />} />
            <Route path="/hackathons" element={<HackathonHub />} />
            <Route path="/projects" element={<ProjectGallery />} />
            <Route path="/create-event" element={<EventCreation />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;