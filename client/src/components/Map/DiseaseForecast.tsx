import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchForecasts } from "@/lib/api";
import { MessageCircleQuestion } from "lucide-react";

const DiseaseForecast = () => {
  const { data: forecasts, isLoading, error } = useQuery({
    queryKey: ['/api/forecasts'],
    queryFn: fetchForecasts
  });
  
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High':
        return '#D32F2F';
      case 'Moderate':
        return '#FFC107';
      case 'Low':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Disease Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse mb-4">
                <div className="flex justify-between mb-1">
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2"></div>
              </div>
            ))}
            <div className="animate-pulse h-20 bg-gray-200 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Disease Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-500">
            Error loading forecast data
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Disease Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {forecasts && forecasts.map((forecast, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Risk of {forecast.diseaseName}</span>
              <span 
                className="text-sm font-medium" 
                style={{ color: getRiskColor(forecast.riskLevel) }}
              >
                {forecast.riskLevel}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${forecast.riskPercentage}%`,
                  backgroundColor: getRiskColor(forecast.riskLevel)
                }}
              ></div>
            </div>
          </div>
        ))}
        
        <div className="bg-[#F5F7F2] p-4 rounded-lg text-sm flex">
          <MessageCircleQuestion className="text-[#FF9800] h-5 w-5 mr-2 flex-shrink-0" />
          <span>
            Forecasts are based on current weather conditions, historical data, and reported cases.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseForecast;
