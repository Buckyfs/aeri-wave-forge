import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProjectImage = ({ src, alt, className = '' }: ProjectImageProps) => {
  const [imageError, setImageError] = useState(false);

  const gradientColors = {
    'wave-studio': 'from-blue-400 to-indigo-600',
    'forge-components': 'from-purple-400 to-pink-600',
    'aeri-canvas': 'from-green-400 to-teal-600',
  };

  const getGradientColor = () => {
    const projectType = src.split('/').pop()?.split('.')[0] || 'wave-studio';
    return gradientColors[projectType as keyof typeof gradientColors] || 'from-gray-400 to-gray-600';
  };

  if (imageError) {
    return (
      <div 
        className={`w-full h-full min-h-[200px] bg-gradient-to-br ${getGradientColor()} flex items-center justify-center ${className}`}
      >
        <div className="text-white text-xl font-semibold">{alt}</div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  );
};

export default ProjectImage; 