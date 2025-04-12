import { useQuery } from "@tanstack/react-query";
import { fetchPreventionsByDiseaseId } from "@/lib/api";
import { Wind, Droplets, Ban, Sun, Sprout, Flame, CalendarDays } from "lucide-react";

interface PreventionMethodsProps {
  diseaseId: number;
}

const PreventionMethods = ({ diseaseId }: PreventionMethodsProps) => {
  const { data: methods, isLoading, error } = useQuery({
    queryKey: [`/api/diseases/${diseaseId}/prevention`],
    queryFn: () => fetchPreventionsByDiseaseId(diseaseId)
  });
  
  // Helper to map icon names to Lucide icons
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'wind': return <Wind className="text-primary mr-3" />;
      case 'tint-slash': return <Ban className="text-primary mr-3" />; // Replaced DropletOff with Ban
      case 'sun': return <Sun className="text-primary mr-3" />;
      case 'seedling': return <Sprout className="text-primary mr-3" />;
      case 'broom': return <Flame className="text-primary mr-3" />;
      case 'calendar-alt': return <CalendarDays className="text-primary mr-3" />;
      default: return <Sprout className="text-primary mr-3" />;
    }
  };
  
  if (isLoading) {
    return (
      <div>
        <h4 className="font-medium text-lg mb-4">Prevention Methods</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error || !methods) {
    return (
      <div>
        <h4 className="font-medium text-lg mb-4">Prevention Methods</h4>
        <div className="text-center p-4 text-red-500">
          Error loading prevention methods
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h4 className="font-medium text-lg mb-4">Prevention Methods</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {methods.map(method => (
          <div key={method.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              {getIconComponent(method.icon)}
              <h5 className="font-medium">{method.name}</h5>
            </div>
            <p className="text-sm text-neutral-medium">{method.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreventionMethods;
