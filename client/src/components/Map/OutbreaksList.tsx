import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOutbreaks, fetchAllDiseases } from "@/lib/api";
import { format } from "date-fns";

const OutbreaksList = () => {
  const { data: outbreaks, isLoading: outbreaksLoading } = useQuery({
    queryKey: ['/api/outbreaks'],
    queryFn: fetchAllOutbreaks
  });
  
  const { data: diseases, isLoading: diseasesLoading } = useQuery({
    queryKey: ['/api/diseases'],
    queryFn: fetchAllDiseases
  });
  
  const isLoading = outbreaksLoading || diseasesLoading;
  
  const getDiseaseName = (diseaseId: number) => {
    if (!diseases) return "Unknown Disease";
    const disease = diseases.find(d => d.id === diseaseId);
    return disease ? disease.name : "Unknown Disease";
  };
  
  const getAffectedPlants = (diseaseId: number) => {
    if (!diseases) return [];
    const disease = diseases.find(d => d.id === diseaseId);
    return disease ? disease.affectedPlants : [];
  };
  
  const getSeverityBadge = (diseaseId: number) => {
    if (!diseases) return null;
    const disease = diseases.find(d => d.id === diseaseId);
    if (!disease) return null;
    
    let bgColor = "";
    switch (disease.severity.toLowerCase()) {
      case "severe":
        bgColor = "bg-[#D32F2F]";
        break;
      case "moderate":
        bgColor = "bg-[#FFC107]";
        break;
      default:
        bgColor = "bg-[#4CAF50]";
    }
    
    return (
      <Badge className={`${bgColor} text-white`}>
        {disease.severity}
      </Badge>
    );
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Outbreaks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse border-b border-gray-200 pb-3 last:border-0">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Outbreaks</CardTitle>
      </CardHeader>
      <CardContent>
        {outbreaks && outbreaks.length > 0 ? (
          outbreaks.map((outbreak, index) => (
            <div 
              key={outbreak.id} 
              className={`pb-3 mb-3 ${
                index < outbreaks.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{getDiseaseName(outbreak.diseaseId)}</h4>
                  <p className="text-sm text-neutral-medium">
                    {getAffectedPlants(outbreak.diseaseId).slice(0, 2).join(', ')} • {outbreak.region}
                  </p>
                </div>
                {getSeverityBadge(outbreak.diseaseId)}
              </div>
              <p className="text-sm mt-2">
                First detected {format(new Date(outbreak.detectedDate), 'MMMM d, yyyy')} • {outbreak.reportCount} reports
              </p>
            </div>
          ))
        ) : (
          <p className="text-center py-4 text-gray-500">No recent outbreaks reported</p>
        )}
      </CardContent>
    </Card>
  );
};

export default OutbreaksList;
