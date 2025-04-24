import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Community = () => {
  const communityHighlights = [
    {
      title: "Creator Spotlight",
      description: "Weekly features of outstanding projects and creators from our community",
      icon: "🌟",
    },
    {
      title: "Community Events",
      description: "Regular meetups, workshops, and collaborative sessions",
      icon: "📅",
    },
    {
      title: "Learning Resources",
      description: "Tutorials, guides, and documentation created by the community",
      icon: "📚",
    },
    {
      title: "Discussion Forums",
      description: "Active spaces for sharing ideas, getting help, and connecting",
      icon: "💭",
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-[30vh] bg-gradient-to-br from-purple-50 to-blue-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
              Join Our Community
            </h1>
            <p className="mt-8 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
              Connect, learn, and create with fellow digital creators
            </p>
          </motion.div>
        </div>
      </div>

      {/* Community Highlights */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
              Community Highlights
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {communityHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative p-8 bg-white rounded-lg shadow-sm"
                >
                  <div className="text-4xl mb-6">{highlight.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {highlight.title}
                  </h3>
                  <p className="mt-4 text-gray-500">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Get Involved Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get Involved</h2>
            <p className="mt-8 text-lg text-gray-500 max-w-2xl mx-auto">
              There are many ways to contribute to and benefit from our community. 
              Join us and be part of something special.
            </p>
            <div className="mt-12">
              <button className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Join Our Discord
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;
