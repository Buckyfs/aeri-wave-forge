
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-8">About AERI</h1>
            <div className="prose prose-lg max-w-4xl">
              <p className="text-gray-700 mb-6">
                The Applied Engineering Research Institute (AERI) is a pioneering organization dedicated to empowering young innovators in their quest to solve pressing environmental challenges through applied engineering solutions.
              </p>
              <p className="text-gray-700 mb-6">
                Our mission is to bridge the gap between academic research and real-world environmental solutions by providing students with the resources, mentorship, and collaborative opportunities they need to turn their innovative ideas into impactful projects.
              </p>
              <h2 className="font-heading text-2xl font-semibold text-primary mt-12 mb-6">Our Vision</h2>
              <p className="text-gray-700 mb-6">
                We envision a world where young engineers and researchers are at the forefront of environmental innovation, leading the charge in creating sustainable solutions for future generations.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
