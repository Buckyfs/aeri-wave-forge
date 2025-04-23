
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CollabCardProps {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  variant: "organizations" | "students" | "supporters";
}

const CollabCard = ({ title, description, features, buttonText, variant }: CollabCardProps) => {
  const getGradient = () => {
    switch (variant) {
      case "organizations":
        return "from-primary to-primary/80";
      case "students":
        return "from-secondary to-secondary/80";
      case "supporters":
        return "from-accent to-accent/80";
      default:
        return "from-primary to-primary/80";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "organizations":
        return "text-white";
      case "students":
        return "text-primary";
      case "supporters":
        return "text-white";
      default:
        return "text-white";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-3 bg-gradient-to-r ${getGradient()}`}></div>
      <CardContent className="p-6 md:p-8">
        <h3 className="font-heading text-xl font-semibold mb-3 text-primary">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-3"></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${
            variant === "students" 
              ? "bg-secondary text-primary hover:bg-secondary/90" 
              : variant === "supporters" 
                ? "bg-accent hover:bg-accent/90" 
                : "bg-primary hover:bg-primary/90"
          } group`}
        >
          {buttonText}
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

const CollaborateSection = () => {
  const collabOptions = [
    {
      title: "For Organizations",
      description: "Partner with us to accelerate environmental innovation",
      features: [
        "Access cutting-edge research",
        "Mentor talented students",
        "Contribute to sustainable solutions"
      ],
      buttonText: "Become a Partner",
      variant: "organizations" as const
    },
    {
      title: "For Students",
      description: "Join our community of innovators",
      features: [
        "Lead research projects",
        "Gain industry experience",
        "Build professional network"
      ],
      buttonText: "Apply as Researcher",
      variant: "students" as const
    },
    {
      title: "For Supporters",
      description: "Help empower young innovators",
      features: [
        "Fund specific projects",
        "Provide resources",
        "Share expertise"
      ],
      buttonText: "Support Our Work",
      variant: "supporters" as const
    }
  ];

  return (
    <section id="collaborate" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Collaborate With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Together, we can accelerate innovation and create meaningful solutions to our most pressing environmental challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collabOptions.map((option, index) => (
            <CollabCard key={index} {...option} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborateSection;
