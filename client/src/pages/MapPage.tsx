import DiseaseMap from "@/components/Map/DiseaseMap";
import OutbreaksList from "@/components/Map/OutbreaksList";
import DiseaseForecast from "@/components/Map/DiseaseForecast";

const MapPage = () => {
  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        {/* Disease Map */}
        <DiseaseMap />
        
        {/* Outbreaks and Forecast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <OutbreaksList />
          <DiseaseForecast />
        </div>
      </div>
    </section>
  );
};

export default MapPage;
