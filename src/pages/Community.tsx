
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CommunityShowcase from '@/components/CommunityShowcase';

const Community = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <CommunityShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Community;
