
import { Card } from "@/components/ui/card";

interface MemberProps {
  name: string;
  role: string;
  description: string;
  image: string;
  quote?: string;
}

const MemberProfile = ({ name, role, description, image, quote }: MemberProps) => {
  return (
    <div className="group relative">
      <div className="hexagon aspect-square bg-white shadow-md overflow-hidden group-hover:shadow-lg transition-all duration-300">
        <div className="relative h-full w-full">
          {/* Image */}
          <div className="h-1/2 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Content */}
          <div className="h-1/2 p-4 bg-white">
            <h3 className="font-heading text-sm font-semibold text-primary">{name}</h3>
            <p className="text-xs text-gray-600 mb-2">{role}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
      
      {/* Quote bubble that appears on hover */}
      {quote && (
        <div className="absolute -right-4 -top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <Card className="bg-white shadow-lg p-3 text-xs max-w-[180px] relative">
            <p className="italic text-gray-700">"{quote}"</p>
            <div className="absolute bottom-[-6px] left-5 w-3 h-3 bg-white transform rotate-45"></div>
          </Card>
        </div>
      )}
    </div>
  );
};

const CommunityShowcase = () => {
  const members = [
    {
      name: "Alex Chen",
      role: "Environmental Engineering Student",
      description: "Leading carbon capture membrane research team",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300",
      quote: "I never thought I could contribute to climate solutions until I joined AERI. Now I'm leading a project that could impact thousands."
    },
    {
      name: "Maya Patel",
      role: "Computer Science Major",
      description: "Smart Grid Optimization Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=300&h=300",
      quote: "AERI showed me how coding skills can create real environmental impact."
    },
    {
      name: "Dr. Rachel Kim",
      role: "Materials Science Expert",
      description: "Mentoring 3 research teams",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=300&h=300", 
      quote: "The creativity and dedication of AERI members inspires me daily."
    },
    {
      name: "James Wilson",
      role: "Mechanical Engineering Student",
      description: "Solar panel efficiency research",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=300&h=300"
    },
    {
      name: "Sofia Rodriguez",
      role: "Chemistry PhD Candidate",
      description: "Bio-materials development lead",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=300&h=300"
    },
    {
      name: "David Park",
      role: "Data Science Student",
      description: "Energy usage analytics team",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=300&h=300"
    },
  ];

  return (
    <section id="community" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Innovators</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AERI brings together passionate students, experienced mentors, and industry experts to foster collaboration and drive sustainable innovation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {members.map((member, index) => (
            <MemberProfile key={index} {...member} />
          ))}
        </div>

        {/* Connection lines visualization */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-wave-pattern opacity-5"></div>
          <div className="text-center relative z-10">
            <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Connected by Purpose</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Our community spans across 15 universities and 8 countries, united by the mission to create sustainable environmental solutions through applied engineering research.
            </p>
            <div className="inline-flex items-center justify-center px-4 py-2 border border-primary/30 rounded-full text-sm text-primary">
              <span className="mr-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              500+ Community Members and Growing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityShowcase;
