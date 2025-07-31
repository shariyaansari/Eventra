import React from 'react';
import './App.css';
import WhatsHappening from "./components/WhatsHappening";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Community from "./components/Community";
import Footer from "./components/Footer";
function App() {
    return (
        <>
            <div className="App">
                <Navbar/>
                <main>
                    <Hero/>
                    <WhatsHappening/>
                    <Features/>
                    <Testimonials/>
                    <Community/>
                </main>
                <Footer/>
            </div>
        </>);
}

export default App;
