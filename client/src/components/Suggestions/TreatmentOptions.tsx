import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, FlaskRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTreatmentsByDiseaseId } from "@/lib/api";

interface TreatmentOptionsProps {
  diseaseId: number;
}

const TreatmentOptions = ({ diseaseId }: TreatmentOptionsProps) => {
  const { data: treatments, isLoading, error } = useQuery({
    queryKey: [`/api/diseases/${diseaseId}/treatments`],
    queryFn: () => fetchTreatmentsByDiseaseId(diseaseId)
  });
  
  if (isLoading) {
    return (
      <div className="border-t border-b border-gray-200 py-4 my-4">
        <h4 className="font-medium text-lg mb-4">Treatment Options</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#F5F7F2] rounded-lg p-4 animate-pulse h-32"></div>
          <div className="bg-[#F5F7F2] rounded-lg p-4 animate-pulse h-32"></div>
        </div>
      </div>
    );
  }
  
  if (error || !treatments) {
    return (
      <div className="border-t border-b border-gray-200 py-4 my-4">
        <h4 className="font-medium text-lg mb-4">Treatment Options</h4>
        <Card className="p-4 text-center text-red-500">
          Error loading treatment options
        </Card>
      </div>
    );
  }
  
  // Group treatments by type
  const organicTreatments = treatments.filter(t => t.type.toLowerCase() === 'organic');
  const chemicalTreatments = treatments.filter(t => t.type.toLowerCase() === 'chemical');
  
  return (
    <div className="border-t border-b border-gray-200 py-4 my-4">
      <h4 className="font-medium text-lg mb-4">Treatment Options</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Organic Solutions */}
        <div className="bg-[#F5F7F2] rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-[#8BC34A] bg-opacity-20 flex items-center justify-center mr-3">
              <Leaf className="text-[#8BC34A] h-4 w-4" />
            </div>
            <h5 className="font-medium">Organic Solutions</h5>
          </div>
          {organicTreatments.length > 0 ? (
            <ul className="list-disc pl-5 text-sm space-y-2">
              {organicTreatments.map(treatment => (
                <li key={treatment.id}>
                  <span className="font-medium">{treatment.name}:</span> {treatment.instructions}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No organic treatments available</p>
          )}
        </div>
        
        {/* Chemical Controls */}
        <div className="bg-[#F5F7F2] rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3">
              <FlaskRound className="text-primary h-4 w-4" />
            </div>
            <h5 className="font-medium">Chemical Controls</h5>
          </div>
          {chemicalTreatments.length > 0 ? (
            <ul className="list-disc pl-5 text-sm space-y-2">
              {chemicalTreatments.map(treatment => (
                <li key={treatment.id}>
                  <span className="font-medium">{treatment.name}:</span> {treatment.instructions}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No chemical treatments available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreatmentOptions;
