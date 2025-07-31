import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatsHappening from './components/WhatsHappening';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Community from './components/Community';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import createScrollToTopButton from './components/scrolltotopButton';
import './App.css';

function App() {

  useEffect(() => {
    createScrollToTopButton(); // ✅ Run once after mount
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <WhatsHappening />
                <Features />
                <Testimonials />
                <Community />
              </>
            } />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

