import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
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
              About Applied Engineering Research Institute (AERI)
            </h1>
            <p className="mt-8 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
              Empowering creators to build the next generation of digital experiences
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <div className="mt-8 prose prose-indigo prose-lg text-gray-500 max-w-4xl">
                            <p className="text-lg leading-relaxed">
                At Applied Engineering Research Institute (AERI), we're dedicated to revolutionizing the way digital experiences are created and shared.
                Our platform combines cutting-edge technology with intuitive design tools to empower creators of all skill levels.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Our Values</h2>
            <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
                <p className="mt-4 text-gray-500">
                  We push the boundaries of what's possible in digital creation
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">Accessibility</h3>
                <p className="mt-4 text-gray-500">
                  Making powerful tools available to creators of all backgrounds
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">Community</h3>
                <p className="mt-4 text-gray-500">
                  Building a supportive ecosystem for creators to thrive
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Vision</h2>
            <div className="mt-8 prose prose-lg max-w-4xl">
              <p className="text-lg text-gray-500 leading-relaxed">
                We envision a world where creators of all backgrounds can bring their digital ideas to life without technical barriers.
                Through our platform, we're building a future where innovation knows no bounds and creativity flows seamlessly from imagination to reality.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Our Team</h2>
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                We're a diverse group of designers, developers, and creators passionate about building the future of digital creation.
                Our team brings together expertise from various fields to create tools that empower creators worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
