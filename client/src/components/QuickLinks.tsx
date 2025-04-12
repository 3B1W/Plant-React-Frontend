import { Link } from "wouter";
import { MapPin, BookOpen, Leaf } from "lucide-react";

const QuickLinks = () => {
  const links = [
    {
      title: "Disease Map",
      description: "View active plant disease outbreaks in your region and stay informed.",
      icon: <MapPin className="text-primary text-xl" />,
      path: "/map",
      iconBg: "bg-primary",
      linkText: "View map"
    },
    {
      title: "Disease Library",
      description: "Browse our comprehensive library of plant diseases and their symptoms.",
      icon: <BookOpen className="text-[#8BC34A] text-xl" />,
      path: "/details",
      iconBg: "bg-[#8BC34A]",
      linkText: "View library"
    },
    {
      title: "Treatment Guide",
      description: "Find effective treatments and prevention methods for plant diseases.",
      icon: <Leaf className="text-[#FF9800] text-xl" />,
      path: "/suggestions",
      iconBg: "bg-[#FF9800]",
      linkText: "View treatments"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {links.map((link, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-full ${link.iconBg} bg-opacity-20 flex items-center justify-center mr-4`}>
              {link.icon}
            </div>
            <h3 className="font-semibold">{link.title}</h3>
          </div>
          <p className="text-neutral-medium mb-4">{link.description}</p>
          <Link href={link.path}>
            <a className="text-primary hover:underline font-medium text-sm">
              {link.linkText} <span className="ml-1">→</span>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuickLinks;
