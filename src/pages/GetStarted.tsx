
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const GetStarted = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-8">Get Started with AERI</h1>
            <div className="prose prose-lg max-w-4xl">
              <p className="text-gray-700 mb-8">
                Join our community of innovators and start making an impact today. Choose your path to begin your journey with AERI.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 my-12">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">For Researchers</h3>
                  <p className="mb-4">Lead innovative projects and gain hands-on experience.</p>
                  <Button className="w-full">Apply Now</Button>
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">For Mentors</h3>
                  <p className="mb-4">Share your expertise and guide the next generation.</p>
                  <Button variant="secondary" className="w-full">Join as Mentor</Button>
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">For Partners</h3>
                  <p className="mb-4">Collaborate with us on groundbreaking research.</p>
                  <Button variant="outline" className="w-full">Partner With Us</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
