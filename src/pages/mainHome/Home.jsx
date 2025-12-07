import Navbar from "../../components/Home/components/Navbar.jsx";
import HeroSection from "../../components/Home/components/HeroSection.jsx";
import StatsSection from "../../components/Home/components/StatsSection.jsx";
import ServicesSection from "../../components/Home/components/ServicesSection.jsx";
import HowItWorksSection from "../../components/Home/components/HowItWorksSection.jsx";
import TestimonialsSection from "../../components/Home/components/TestimonialsSection.jsx";
import PricingSection from "../../components/Home/components/PricingSection.jsx";
import FAQSection from "../../components/Home/components/FAQSection.jsx";
import CTASection from "../../components/Home/components/CTASection.jsx";
import Footer from "../../components/Home/components/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../components/Home/styles/home.css"


const Home = () => {
    return (
        <div>
            <Navbar />
            <main>
                <HeroSection />
                <StatsSection />
                <ServicesSection />
                <HowItWorksSection />
                <TestimonialsSection />
                <PricingSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;