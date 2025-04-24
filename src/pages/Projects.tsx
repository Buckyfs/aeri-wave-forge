
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FeaturedProjects from '@/components/FeaturedProjects';

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <FeaturedProjects />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
