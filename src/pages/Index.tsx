import { useState } from "react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import LocationPanel from "@/components/LocationPanel";
import ReadingsChart from "@/components/ReadingsChart";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>("jersey-city");

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <MapView onLocationSelect={setSelectedLocation} selectedLocation={selectedLocation} />
        {selectedLocation && (
          <>
            <LocationPanel locationId={selectedLocation} />
            <ReadingsChart locationId={selectedLocation} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
