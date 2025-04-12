import { Card, CardContent } from "@/components/ui/card";
import type { PlantDisease } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

interface DiseaseCardProps {
  disease: PlantDisease;
}

const DiseaseCard = ({ disease }: DiseaseCardProps) => {
  const getSeverityClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe':
        return 'bg-[#D32F2F] bg-opacity-10 text-[#D32F2F]';
      case 'moderate':
        return 'bg-[#F5F7F2] text-neutral-dark';
      case 'low':
        return 'bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]';
      default:
        return 'bg-[#F5F7F2] text-neutral-dark';
    }
  };

  return (
    <Card className="overflow-hidden bg-white shadow-md">
      <div className="w-full h-48">
        <img 
          src={disease.images[0]} 
          alt={disease.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2">{disease.name}</h3>
        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="outline" className="bg-primary bg-opacity-10 text-primary text-xs">
            {disease.type}
          </Badge>
          <Badge variant="outline" className={`${getSeverityClass(disease.severity)} text-xs`}>
            {disease.severity}
          </Badge>
        </div>
        <p className="text-neutral-medium text-sm mb-4">{disease.symptoms}</p>
        <div className="border-t border-gray-200 pt-4 mt-2">
          <h4 className="font-medium text-sm mb-2">Affects:</h4>
          <div className="flex flex-wrap gap-1">
            {disease.affectedPlants.slice(0, 3).map((plant, index) => (
              <span key={index} className="bg-gray-100 text-xs px-2 py-1 rounded">
                {plant}
              </span>
            ))}
            {disease.affectedPlants.length > 3 && (
              <span className="bg-gray-100 text-xs px-2 py-1 rounded">
                +{disease.affectedPlants.length - 3} more
              </span>
            )}
          </div>
        </div>
        <a href="#" className="mt-4 inline-block text-primary hover:underline text-sm font-medium">
          View detailed information
        </a>
      </CardContent>
    </Card>
  );
};

export default DiseaseCard;
