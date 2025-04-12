import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Home, Map, Info, Lightbulb } from "lucide-react";

const Navigation = () => {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState(location === "/" ? "home" : location.substring(1));

  useEffect(() => {
    const path = location === "/" ? "home" : location.substring(1);
    setActiveTab(path);
  }, [location]);

  const navItems = [
    { id: "home", label: "Home", icon: <Home className="mr-2 h-4 w-4" />, path: "/" },
    { id: "map", label: "View Map", icon: <Map className="mr-2 h-4 w-4" />, path: "/map" },
    { id: "details", label: "Details", icon: <Info className="mr-2 h-4 w-4" />, path: "/details" },
    { id: "suggestions", label: "Suggestions", icon: <Lightbulb className="mr-2 h-4 w-4" />, path: "/suggestions" }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <ul className="flex overflow-x-auto whitespace-nowrap -mb-px" id="mainNav">
          {navItems.map(item => (
            <li key={item.id}>
              <Link href={item.path}>
                <a
                  className={`inline-block p-4 font-medium transition-colors hover:text-primary flex items-center ${
                    activeTab === item.id ? "border-b-2 border-primary text-primary" : "text-neutral-dark"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
