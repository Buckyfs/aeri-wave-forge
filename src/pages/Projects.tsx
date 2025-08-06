import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectImage from '@/components/ProjectImage';

const Projects = () => {
  const projects = [
    {
      title: "Wave Studio",
      description: "A powerful visual editor for creating immersive digital experiences. Build interactive animations, layouts, and experiences with our intuitive drag-and-drop interface.",
      category: "Design Tools",
      image: "/projects/wave-studio.svg",
      tags: ["Design", "Creative", "Visual"],
      link: "/wave-studio"
    },
    {
      title: "Forge Components",
      description: "A comprehensive library of reusable components for rapid development. Built with modern best practices and fully customizable to match your brand.",
      category: "Development",
      image: "/projects/forge-components.svg",
      tags: ["Components", "UI", "Development"],
      link: "/forge-components"
    },
    {
      title: "Aeri Canvas",
      description: "An innovative platform for collaborative digital art creation. Work together in real-time, share feedback, and create stunning digital artwork.",
      category: "Collaboration",
      image: "/projects/aeri-canvas.svg",
      tags: ["Art", "Collaboration", "Creative"],
      link: "/aeri-canvas"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative min-h-[30vh] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
              Our Projects
            </h1>
            <p className="mt-8 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
              Explore our latest innovations in digital creation and collaboration
            </p>
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                  />
                </div>
                <div className="p-8">
                  <span className="text-sm font-medium text-indigo-600">
                    {project.category}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-base text-gray-500">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8">
                    <span className="inline-flex items-center text-sm font-medium text-gray-400 cursor-not-allowed">
                      Learn more (Coming Soon)
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
