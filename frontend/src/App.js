import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatsHappening from './components/WhatsHappening';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Community from './components/Community';
import Footer from './components/Footer';

import EventCreation from './components/common/EventCreation'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <WhatsHappening />
                <Features />
                <Testimonials />
                <Community />
              </main>
            }
          />
          <Route path="/create-event" element={<EventCreation />} /> {/* ✅ New route */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
