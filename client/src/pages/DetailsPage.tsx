import { useState, useEffect } from "react";
import DiseaseFilter from "@/components/Details/DiseaseFilter";
import DiseaseCard from "@/components/DiseaseCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchAllDiseases } from "@/lib/api";
import { PlantCategory } from "@shared/types";

const DetailsPage = () => {
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [activeCategory, setActiveCategory] = useState<string>(PlantCategory.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: diseases, isLoading, error } = useQuery({
    queryKey: ['/api/diseases'],
    queryFn: fetchAllDiseases
  });
  
  useEffect(() => {
    if (diseases) {
      let result = [...diseases];
      
      // Apply category filter
      if (activeCategory !== PlantCategory.ALL) {
        result = result.filter(disease => 
          disease.affectedPlants.some(plant => 
            plant.toLowerCase().includes(activeCategory.toLowerCase())
          )
        );
      }
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(disease => 
          disease.name.toLowerCase().includes(query) || 
          disease.symptoms.toLowerCase().includes(query) ||
          disease.affectedPlants.some(plant => plant.toLowerCase().includes(query))
        );
      }
      
      setFilteredDiseases(result);
    }
  }, [diseases, activeCategory, searchQuery]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
  };
  
  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        {/* Disease Filter */}
        <DiseaseFilter 
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
        />
        
        {/* Disease Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="h-20 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="flex gap-1">
                      <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            Error loading disease data
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredDiseases.map(disease => (
                <DiseaseCard key={disease.id} disease={disease} />
              ))}
            </div>
            
            {filteredDiseases.length > 0 ? (
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="bg-white shadow hover:shadow-md text-primary font-medium"
                >
                  Load More Diseases
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No diseases found matching your search criteria.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DetailsPage;
