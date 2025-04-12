import { useState, useRef, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { detectDisease } from "@/lib/api";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

const UploadArea = () => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { mutate, isPending, isSuccess, data, error, reset } = useMutation({
    mutationFn: (imageBase64: string) => detectDisease(imageBase64),
  });
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewSrc(event.target?.result as string);
      
      // Extract base64 data to send to API
      const base64String = (event.target?.result as string).split(',')[1];
      mutate(base64String);
    };
    reader.readAsDataURL(selectedFile);
  };
  
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewSrc(event.target?.result as string);
        
        // Extract base64 data to send to API
        const base64String = (event.target?.result as string).split(',')[1];
        mutate(base64String);
      };
      reader.readAsDataURL(droppedFile);
    }
  };
  
  const handleReset = () => {
    setPreviewSrc(null);
    setFile(null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <Card className="bg-white shadow-md mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Detect Plant Disease</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#8BC34A] transition-colors ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={!previewSrc ? handleClickUpload : undefined}
        >
          {previewSrc && (
            <img 
              src={previewSrc} 
              alt="Upload preview" 
              className="mb-4 mx-auto max-h-[300px] rounded"
            />
          )}
          
          {!previewSrc && (
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2">Drag and drop your plant image here</p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <Button className="bg-[#8BC34A] hover:bg-opacity-90 text-white font-medium">
                Select an Image
              </Button>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          )}
          
          {isPending && (
            <div className="mt-4">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-opacity-50 border-t-primary rounded-full mx-auto"></div>
              <p className="mt-2 text-neutral-medium">Analyzing image...</p>
            </div>
          )}
          
          {isSuccess && data && (
            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-2">Diagnosis Results:</h4>
              <div className="flex justify-between bg-[#F5F7F2] p-4 rounded">
                <div>
                  <p className="font-medium">
                    Detected: <span className="text-[#D32F2F]">{data.diseaseName}</span>
                  </p>
                  <p className="text-sm text-neutral-medium">Confidence: {data.confidence}%</p>
                </div>
                <Link href={`/details?disease=${data.diseaseId}`}>
                  <a className="text-primary hover:underline">View Details</a>
                </Link>
              </div>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          )}
          
          {error && (
            <div className="mt-4 text-red-500 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Error analyzing image. Please try again.</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadArea;
