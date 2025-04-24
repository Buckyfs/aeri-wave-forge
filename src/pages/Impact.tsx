import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Impact = () => {
  const stats = [
    { label: "Active Users", value: "50K+", description: "Creators using our platform" },
    { label: "Projects Created", value: "100K+", description: "Digital experiences launched" },
    { label: "Countries", value: "120+", description: "Global community reach" },
    { label: "Community Events", value: "500+", description: "Workshops and meetups" }
  ];

  const successStories = [
    {
      title: "Digital Art Revolution",
      author: "Sarah Chen",
      quote: "Aeri Wave Forge transformed how I create and share digital art with my audience.",
      impact: "Reached 1M+ viewers"
    },
    {
      title: "Educational Platform",
      author: "James Rodriguez",
      quote: "Built an interactive learning platform that's now used by 50+ schools.",
      impact: "20K+ students impacted"
    },
    {
      title: "Virtual Gallery",
      author: "Maria Kowalski",
      quote: "Created a virtual art gallery that's breaking down geographical barriers.",
      impact: "Featured in Art Weekly"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-[30vh] bg-gradient-to-br from-green-50 to-blue-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
              Our Global Impact
            </h1>
            <p className="mt-8 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
              Transforming digital creation and empowering creators worldwide
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-indigo-600">{stat.value}</div>
                <div className="mt-2 text-xl font-semibold text-gray-900">{stat.label}</div>
                <div className="mt-1 text-base text-gray-500">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{story.title}</h3>
                  <p className="mt-4 text-gray-600 italic">"{story.quote}"</p>
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-900">{story.author}</p>
                    <p className="text-sm text-indigo-600">{story.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to Make an Impact?</h2>
            <p className="mt-8 text-lg text-gray-500 max-w-2xl mx-auto">
              Join our community of creators and start building something amazing today.
            </p>
            <div className="mt-12">
              <button className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Get Started
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Impact;
