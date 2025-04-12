import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchAllDiseases, fetchDiseaseById } from "@/lib/api";
import TreatmentOptions from "@/components/Suggestions/TreatmentOptions";
import PreventionMethods from "@/components/Suggestions/PreventionMethods";
import Resources from "@/components/Suggestions/Resources";
import { Lightbulb } from "lucide-react";

const SuggestionsPage = () => {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<number | null>(null);
  
  const { data: diseases, isLoading: diseasesLoading } = useQuery({
    queryKey: ['/api/diseases'],
    queryFn: fetchAllDiseases
  });
  
  const { data: selectedDisease, isLoading: diseaseLoading } = useQuery({
    queryKey: ['/api/diseases', selectedDiseaseId],
    queryFn: () => fetchDiseaseById(selectedDiseaseId!),
    enabled: !!selectedDiseaseId
  });
  
  // Effect to set first disease as default when data loads
  useEffect(() => {
    if (diseases && diseases.length > 0 && !selectedDiseaseId) {
      setSelectedDiseaseId(diseases[0].id);
    }
  }, [diseases, selectedDiseaseId]);
  
  const handleDiseaseChange = (value: string) => {
    setSelectedDiseaseId(parseInt(value));
  };
  
  const isLoading = diseasesLoading || (selectedDiseaseId && diseaseLoading);
  
  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        <Card className="bg-white shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Treatment Suggestions</CardTitle>
            <CardDescription>Find effective treatment methods and preventative measures for plant diseases.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Select 
                onValueChange={handleDiseaseChange}
                value={selectedDiseaseId?.toString()}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a disease to see treatment options" />
                </SelectTrigger>
                <SelectContent>
                  {diseases?.map(disease => (
                    <SelectItem key={disease.id} value={disease.id.toString()}>
                      {disease.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {selectedDisease ? (
          <Card className="bg-white shadow-md mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <img 
                  src={selectedDisease.images[0]} 
                  alt={selectedDisease.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-xl">{selectedDisease.name}</h3>
                  <p className="text-neutral-medium text-sm">{selectedDisease.type} disease affecting various plants</p>
                </div>
              </div>
              
              {/* Treatment Options */}
              <TreatmentOptions diseaseId={selectedDisease.id} />
              
              {/* Prevention Methods */}
              <PreventionMethods diseaseId={selectedDisease.id} />
              
              {/* Expert Tip */}
              <div className="bg-[#F5F7F2] p-4 rounded-lg mb-6">
                <h4 className="font-medium mb-2 flex items-center">
                  <Lightbulb className="text-[#FF9800] mr-2 h-5 w-5" />
                  Expert Tip
                </h4>
                <p className="text-sm">
                  {selectedDisease.name} thrives in {selectedDisease.type === 'Fungal' ? 'high humidity but doesn\'t require leaf wetness. Focus on air circulation and avoid overcrowding plants to minimize humidity around leaf surfaces.' : 'specific conditions. Research the optimal growing environment to prevent infection.'}
                </p>
              </div>
              
              <div className="text-center">
                <a href="#" className="text-primary hover:underline text-sm font-medium">
                  View more information about {selectedDisease.name}
                  <span className="ml-1">→</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white shadow-md mb-8 p-8 text-center">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded mx-auto w-3/4 mb-6"></div>
                <div className="h-32 bg-gray-200 rounded mb-6"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <p>Select a disease to view treatment options</p>
            )}
          </Card>
        )}
        
        {/* Other Resources */}
        <Resources />
      </div>
    </section>
  );
};

export default SuggestionsPage;
