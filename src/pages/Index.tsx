import { useEffect, useState } from "react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import LocationPanel from "@/components/LocationPanel";
import ReadingsChart from "@/components/ReadingsChart";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>("jersey-city");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === "#data") setShowDetails(true);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <MapView onLocationSelect={(id) => { setSelectedLocation(id); setShowDetails(false); }} selectedLocation={selectedLocation} />
        {selectedLocation && (
          <>
            <LocationPanel
              locationId={selectedLocation}
              onMoreDetails={() => setShowDetails(true)}
              onClose={() => setSelectedLocation(null)}
            />
            {showDetails && (
              <div className="w-full max-w-[640px]">
                <ReadingsChart locationId={selectedLocation} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
