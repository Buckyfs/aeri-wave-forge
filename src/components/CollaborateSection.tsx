import React from 'react';
import { ActionButton } from '@/components/ui/action-button';

type CollabCardProps = {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  variant: 'organizations' | 'students' | 'supporters';
};

const CollabCard = ({ title, description, features, buttonText, variant }: CollabCardProps) => {
  const getButtonProps = () => {
    switch (variant) {
      case 'organizations':
        return { 
          to: '/become-partner', 
          variant: 'primary' as const,
          className: 'w-full bg-primary hover:bg-primary/90 text-white'
        };
      case 'students':
        return { 
          to: '/apply-researcher', 
          variant: 'secondary' as const,
          className: 'w-full bg-[#00FFA3] hover:bg-[#00FFA3]/90 text-black'
        };
      case 'supporters':
        return { 
          to: '/support', 
          variant: 'outline' as const,
          className: 'w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white'
        };
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="font-heading text-xl font-semibold mb-4 text-primary">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            {feature}
          </li>
        ))}
      </ul>
      <ActionButton {...getButtonProps()}>
        {buttonText}
      </ActionButton>
    </div>
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
