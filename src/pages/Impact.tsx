
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ImpactMetrics from '@/components/ImpactMetrics';

const Impact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <ImpactMetrics />
      </main>
      <Footer />
    </div>
  );
};

export default Impact;
