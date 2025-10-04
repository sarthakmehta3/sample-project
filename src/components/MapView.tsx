import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MapViewProps {
  onLocationSelect: (locationId: string) => void;
  selectedLocation: string | null;
}

const locations = [
  { id: "jersey-city", name: "Jersey City", lat: 40.7178, lng: -74.0431 },
  { id: "newark", name: "Newark", lat: 40.7357, lng: -74.1724 },
  { id: "elizabeth", name: "Elizabeth", lat: 40.6640, lng: -74.2107 },
  { id: "paterson", name: "Paterson", lat: 40.9168, lng: -74.1718 },
];

const MapView = ({ onLocationSelect, selectedLocation }: MapViewProps) => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? locations.filter((l) => l.name.toLowerCase().includes(q)) : locations;
  }, [query]);
  return (
    <div className="flex-1 min-w-0 relative bg-[#c3e8e5]">
      {/* Map placeholder with teal water color */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Simulated map background */}
        <div className="w-full h-full relative" 
          style={{ 
            background: `linear-gradient(135deg, #c3e8e5 0%, #a8dbd7 50%, #8dcfc9 100%)`
          }}
        >
          {/* Landmass areas */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-1/3 h-1/2 bg-[#e8f5e9] rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/3 bg-[#e8f5e9] rounded-full blur-3xl"></div>
          </div>

          {/* Location markers */}
          {filtered.map((location) => (
            <button
              key={location.id}
              onClick={() => onLocationSelect(location.id)}
              className={cn(
                "absolute w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110",
                selectedLocation === location.id
                  ? "bg-secondary shadow-lg shadow-secondary/50 z-10"
                  : "bg-secondary/80 hover:bg-secondary"
              )}
              style={{
                top: `${50 + (location.lat - 40.7) * 100}%`,
                left: `${50 + (location.lng + 74.1) * 100}%`,
              }}
            >
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Search overlay */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-card rounded-lg shadow-lg p-2 w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search locations"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>
      </div>

      {/* Scale indicator */}
      <div className="absolute bottom-4 left-4 bg-card rounded px-3 py-1 text-xs text-muted-foreground shadow-sm">
        5 km
      </div>

      {/* Attribution */}
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-2 py-1 rounded">
        © OpenStreetMap contributors
      </div>
    </div>
  );
};

export default MapView;
