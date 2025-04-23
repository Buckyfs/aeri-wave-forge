
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  progress: number;
  image: string;
  teamSize: number;
  duration: string;
  impact: string;
}

const ProjectCard = ({
  title,
  description,
  category,
  progress,
  image,
  teamSize,
  duration,
  impact
}: ProjectCardProps) => {
  return (
    <div className="card-hover bg-white rounded-lg overflow-hidden shadow-md">
      {/* Top image section with progress bar */}
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0">
          <Progress value={progress} className="h-1.5 rounded-none bg-gray-300/50" indicatorClassName="bg-secondary" />
        </div>
        <Badge className="absolute top-4 left-4 bg-primary text-xs font-medium">
          {category}
        </Badge>
      </div>
      
      {/* Content section */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold mb-2 text-primary">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        
        {/* Project details */}
        <div className="border-t border-gray-100 pt-4 mt-4">
          <h4 className="text-xs uppercase text-gray-500 font-semibold mb-3">Project Details</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Team Size</p>
              <p className="font-medium">{teamSize} members</p>
            </div>
            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-medium">{duration}</p>
            </div>
            <div>
              <p className="text-gray-500">Impact</p>
              <p className="font-medium">{impact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
