import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import CommunityShowcase from '@/components/CommunityShowcase';
import ImpactMetrics from '@/components/ImpactMetrics';
import CollaborateSection from '@/components/CollaborateSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProjects />
        <CommunityShowcase />
        <ImpactMetrics />
        <CollaborateSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
