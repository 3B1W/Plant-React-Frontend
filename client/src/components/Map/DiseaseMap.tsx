import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { fetchMapMarkers } from "@/lib/api";
import { Button } from "@/components/ui/button";
import L from "leaflet";
import { MapLegend } from "./MapLegend";

// Fix for marker icons in React Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom icon for markers
const createCustomIcon = (severity: string) => {
  const color = 
    severity === 'Severe' 
      ? '#D32F2F' 
      : severity === 'Moderate' 
      ? '#FFC107' 
      : '#4CAF50';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color}; 
      width: 20px; 
      height: 20px; 
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

interface DiseaseMapProps {
  height?: string;
}

const DiseaseMap = ({ height = "96" }: DiseaseMapProps) => {
  const [activeFilter, setActiveFilter] = useState("All Diseases");
  const { data: markers, isLoading, error } = useQuery({
    queryKey: ['/api/map/markers'],
    queryFn: fetchMapMarkers
  });
  
  const [filteredMarkers, setFilteredMarkers] = useState(markers);
  
  useEffect(() => {
    if (markers) {
      if (activeFilter === "All Diseases") {
        setFilteredMarkers(markers);
      } else {
        setFilteredMarkers(
          markers.filter(marker => {
            // For example, filter by disease type (would need to enhance API/model)
            if (activeFilter === "Fungal") {
              return marker.diseaseName.includes("Mildew") || marker.diseaseName.includes("Blight") || marker.diseaseName.includes("Spot");
            }
            return true;
          })
        );
      }
    }
  }, [markers, activeFilter]);
  
  const filters = [
    "All Diseases", 
    "Fungal", 
    "Bacterial", 
    "Viral", 
    "Pest Damage"
  ];
  
  return (
    <Card className="bg-white shadow-md mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Plant Disease Map</CardTitle>
        <CardDescription>View current plant disease outbreaks and trends by region.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {filters.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={activeFilter === filter 
                ? "bg-primary text-white" 
                : "bg-[#F5F7F2] hover:bg-gray-200 text-neutral-dark"
              }
              size="sm"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        
        <div className={`w-full h-${height} rounded-lg overflow-hidden relative mb-4`}>
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-opacity-50 border-t-primary rounded-full mx-auto mb-2"></div>
                <p>Loading map data...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center text-red-500">
                <p>Error loading map data</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            </div>
          )}
          
          {!isLoading && !error && (
            <MapContainer 
              center={[39.8283, -98.5795]} // Center of US
              zoom={4} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {filteredMarkers?.map(marker => (
                <Marker 
                  key={marker.id} 
                  position={[marker.lat, marker.lng]}
                  icon={createCustomIcon(marker.severity)}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg">{marker.diseaseName}</h3>
                      <p className="text-sm mb-1">Region: {marker.region}</p>
                      <p className="text-sm mb-1">Reports: {marker.reportCount}</p>
                      <Badge className={`
                        ${marker.severity === 'Severe' 
                          ? 'bg-[#D32F2F]' 
                          : marker.severity === 'Moderate' 
                          ? 'bg-[#FFC107]' 
                          : 'bg-[#4CAF50]'} 
                        text-white
                      `}>
                        {marker.severity}
                      </Badge>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
        
        <MapLegend />
      </CardContent>
    </Card>
  );
};

export default DiseaseMap;
