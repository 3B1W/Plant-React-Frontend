import NewsSlider from "@/components/NewsSlider";
import UploadArea from "@/components/UploadArea";
import QuickLinks from "@/components/QuickLinks";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="mb-8 bg-primary text-white rounded-lg overflow-hidden shadow-lg">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4">Detect Plant Diseases Instantly</h2>
              <p className="mb-6">Upload a photo of your plant and get instant diagnosis using our advanced AI technology.</p>
              <Button className="bg-white text-primary font-semibold hover:bg-gray-100 w-full sm:w-auto">
                Try It Now
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Plant diagnostic" 
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Upload Area */}
        <UploadArea />
        
        {/* News Slider */}
        <NewsSlider />
        
        {/* Quick Links */}
        <QuickLinks />
      </div>
    </section>
  );
};

export default HomePage;
