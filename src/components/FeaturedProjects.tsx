
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';

const FeaturedProjects = () => {
  const projects = [
    {
      title: "Carbon Capture Revolution",
      description: "Revolutionizing CO₂ absorption through advanced membrane technology",
      category: "Environmental",
      progress: 65,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80",
      teamSize: 15,
      duration: "Ongoing",
      impact: "30% reduction in industrial emissions"
    },
    {
      title: "Smart Energy Grid",
      description: "Optimizing renewable energy distribution in urban environments",
      category: "Energy",
      progress: 80,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80",
      teamSize: 12,
      duration: "6 months",
      impact: "25% energy waste reduction"
    },
    {
      title: "Water Purification System",
      description: "Affordable clean water solutions for developing regions",
      category: "Water",
      progress: 45,
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80",
      teamSize: 8,
      duration: "3 months",
      impact: "Clean water for 500+ families"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-lightbg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Currently Exploring</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our cutting-edge research projects that aim to solve real-world environmental challenges through innovative engineering solutions.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="group">
            View All Projects
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
