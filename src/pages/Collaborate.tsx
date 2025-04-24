import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Collaborate = () => {
  const collaborationWays = [
    {
      title: "Open Source",
      description: "Contribute to our core platform and help shape the future of digital creation",
      icon: "💻",
      link: "#"
    },
    {
      title: "Community Projects",
      description: "Join forces with other creators on community-driven initiatives",
      icon: "🤝",
      link: "#"
    },
    {
      title: "Education",
      description: "Share your knowledge through tutorials, workshops, and documentation",
      icon: "📚",
      link: "#"
    },
    {
      title: "Beta Testing",
      description: "Test new features and provide valuable feedback to improve the platform",
      icon: "🔍",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-[30vh] bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
              Collaborate With Us
            </h1>
            <p className="mt-8 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
              Join forces with our community to build the future of digital creation
            </p>
          </motion.div>
        </div>
      </div>

      {/* Ways to Collaborate */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
              Ways to Collaborate
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {collaborationWays.map((way, index) => (
                <motion.div
                  key={way.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-6">{way.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {way.title}
                  </h3>
                  <p className="mt-4 text-gray-500">
                    {way.description}
                  </p>
                  <a
                    href={way.link}
                    className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Learn more
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
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <p className="mt-8 text-lg text-gray-500">
                Have a specific collaboration idea? We'd love to hear from you!
              </p>
              <div className="mt-12">
                <button className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Collaborate;
