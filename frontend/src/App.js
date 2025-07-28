import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatsHappening from './components/WhatsHappening';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Community from './components/Community';
import Footer from './components/Footer';
import { ThemeProvider } from './ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Hero />
          <WhatsHappening />
          <Features />
          <Testimonials />
          <Community />
        </main>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;

