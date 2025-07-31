import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatsHappening from './components/WhatsHappening';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Community from './components/Community';
import Footer from './components/Footer';

function HomePage() {

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

export default HomePage;