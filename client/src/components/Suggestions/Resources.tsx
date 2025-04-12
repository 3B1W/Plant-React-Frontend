import { Book, Video, MessageSquare } from "lucide-react";
import { Link } from "wouter";

const Resources = () => {
  const resources = [
    {
      title: "Plant Disease Guide",
      description: "Comprehensive guide to identifying and treating common plant diseases.",
      icon: <Book className="text-primary text-2xl mb-3" />,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Watch expert demonstrations of disease treatment techniques.",
      icon: <Video className="text-primary text-2xl mb-3" />,
      link: "#"
    },
    {
      title: "Community Forum",
      description: "Connect with other gardeners to share advice and experiences.",
      icon: <MessageSquare className="text-primary text-2xl mb-3" />,
      link: "#"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-medium text-xl mb-6">Other Helpful Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Link key={index} href={resource.link}>
            <a className="block group">
              <div className="border border-gray-200 rounded-lg p-4 transition-all group-hover:border-primary group-hover:shadow-md">
                {resource.icon}
                <h4 className="font-medium mb-2">{resource.title}</h4>
                <p className="text-sm text-neutral-medium">{resource.description}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Resources;
