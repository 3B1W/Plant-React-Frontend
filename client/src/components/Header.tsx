import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12 L9 18 L20 5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8 C16 8 16 16 12 16 S8 8 12 8" />
          </svg>
          <h1 className="font-bold text-primary text-xl sm:text-2xl font-display">PlantGuard</h1>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <Search className="h-5 w-5 text-neutral-medium" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-neutral-medium" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
