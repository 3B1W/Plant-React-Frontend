import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PlantCategory } from "@shared/types";

interface DiseaseFilterProps {
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
}

const DiseaseFilter = ({ onCategoryChange, onSearchChange }: DiseaseFilterProps) => {
  const [activeCategory, setActiveCategory] = useState<PlantCategory>(PlantCategory.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleCategoryChange = (category: PlantCategory) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };
  
  const categories = [
    { id: PlantCategory.ALL, label: "All" },
    { id: PlantCategory.VEGETABLES, label: "Vegetables" },
    { id: PlantCategory.FRUITS, label: "Fruits" },
    { id: PlantCategory.ORNAMENTALS, label: "Ornamentals" },
    { id: PlantCategory.HOUSEPLANTS, label: "Houseplants" }
  ];
  
  return (
    <Card className="bg-white shadow-md mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Plant Disease Details</CardTitle>
        <CardDescription>Browse our library of common plant diseases, symptoms, and affected plants.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Input
            placeholder="Search for a plant disease..."
            className="pl-10 pr-4 py-2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={activeCategory === category.id 
                ? "bg-primary text-white" 
                : "bg-[#F5F7F2] hover:bg-gray-200 text-neutral-dark"
              }
              onClick={() => handleCategoryChange(category.id as PlantCategory)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseFilter;
