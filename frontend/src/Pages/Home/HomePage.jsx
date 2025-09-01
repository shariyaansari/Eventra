import Hero from './components/Hero';
import WhatsHappening from './components/WhatsHappening';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import GitHubStats from './components/GitHubStats';
import Contributors from '../../components/Contributors';
import Community from './components/Community';

const HomePage = () => {
    return (
        <>
            <Hero />
            <WhatsHappening />
            <Features />
            <Testimonials />
            <GitHubStats />
            <Contributors />
            <Community />
        </>
    );
};

export default HomePage;
