export const MapLegend = () => {
  const legendItems = [
    { color: "#D32F2F", label: "High Risk Areas" },
    { color: "#FFC107", label: "Moderate Risk" },
    { color: "#4CAF50", label: "Low Risk" },
    { color: "#2E7D32", label: "Monitoring Stations" },
    { color: "#424242", label: "Research Centers" }
  ];

  return (
    <div className="bg-[#F5F7F2] p-4 rounded-lg">
      <h3 className="font-medium text-lg mb-2">Legend</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
