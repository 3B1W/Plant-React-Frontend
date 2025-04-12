import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestNews } from "@/lib/api";
import { type NewsArticle } from "@shared/schema";
import { format } from "date-fns";

const NewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: newsArticles, isLoading, error } = useQuery({
    queryKey: ['/api/news'],
    queryFn: () => fetchLatestNews(3)
  });
  
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Start auto-slide
    startAutoSlide();
    
    // Cleanup on unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [newsArticles]);
  
  const startAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    slideInterval.current = setInterval(() => {
      if (newsArticles && newsArticles.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % newsArticles.length);
      }
    }, 5000);
  };
  
  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  };
  
  const handlePrevSlide = () => {
    stopAutoSlide();
    if (newsArticles && newsArticles.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + newsArticles.length) % newsArticles.length);
    }
    startAutoSlide();
  };
  
  const handleNextSlide = () => {
    stopAutoSlide();
    if (newsArticles && newsArticles.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % newsArticles.length);
    }
    startAutoSlide();
  };
  
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-xl">Recent Plant Disease News</h3>
          <div className="flex">
            <Button variant="outline" size="icon" className="mr-2" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md h-48 animate-pulse"></div>
      </div>
    );
  }
  
  if (error || !newsArticles || newsArticles.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-xl">Recent Plant Disease News</h3>
        </div>
        <Card className="p-6 text-center">
          <p>No recent news available</p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="mb-8"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-xl">Recent Plant Disease News</h3>
        <div className="flex">
          <Button 
            variant="outline" 
            size="icon" 
            className="mr-2 bg-white shadow hover:bg-gray-100" 
            onClick={handlePrevSlide}
          >
            <ChevronLeft className="h-4 w-4 text-neutral-medium" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white shadow hover:bg-gray-100" 
            onClick={handleNextSlide}
          >
            <ChevronRight className="h-4 w-4 text-neutral-medium" />
          </Button>
        </div>
      </div>
      <div className="news-slider relative overflow-hidden rounded-lg">
        <div 
          className="slide-container flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {newsArticles.map((article: NewsArticle) => (
            <div key={article.id} className="slide min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <span className={`text-xs text-white ${getTagColor(article.category)} inline-block px-2 py-1 rounded mb-2`}>
                    {article.category}
                  </span>
                  <h4 className="font-semibold text-lg mb-2">{article.title}</h4>
                  <p className="text-neutral-medium mb-4 line-clamp-2">{article.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-medium">
                      {format(new Date(article.publishedDate), 'MMMM d, yyyy')}
                    </span>
                    <a href="#" className="text-primary hover:underline text-sm font-medium">Read more</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get appropriate tag color based on category
const getTagColor = (category: string) => {
  switch(category) {
    case 'New Research':
      return 'bg-primary';
    case 'Alert':
      return 'bg-[#FFC107]';
    case 'Tips':
      return 'bg-[#8BC34A]';
    default:
      return 'bg-primary';
  }
};

export default NewsSlider;
