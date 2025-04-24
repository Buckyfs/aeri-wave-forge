
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CollaborateSection from '@/components/CollaborateSection';
import CtaSection from '@/components/CtaSection';

const Collaborate = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <CollaborateSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Collaborate;
