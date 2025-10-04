import { X, Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LocationPanelProps {
  locationId: string;
  onMoreDetails?: () => void;
  onClose?: () => void;
}

const locationData: Record<string, any> = {
  "jersey-city": {
    name: "Jersey City",
    country: "United States",
    type: "Reference grade",
    status: "Stationary",
    owner: "Unknown Governmental Organization",
    measures: ["CO ppm", "NO ppm", "NO₂ ppm", "NOx ppm", "SO₂ ppm"],
    lastUpdate: "Updated an hour ago",
    reportingSince: "Reporting since 07/03/2016",
    provider: "AirNow",
    license: "US Public Domain",
  },
};

const LocationPanel = ({ locationId, onMoreDetails, onClose }: LocationPanelProps) => {
  const location = locationData[locationId];

  if (!location) return null;

  const handleDownload = () => {
    const now = new Date();
    const rows = ["timestamp,pollutant,value"]; // simple CSV of last 24 readings
    for (let i = 0; i < 24; i++) {
      const ts = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString();
      rows.push(`${ts},CO ppm,${(Math.random() * 0.4 + 0.1).toFixed(3)}`);
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${locationId}-readings.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-96 h-full overflow-y-auto flex-none bg-card border-l border-border shadow-lg z-20 relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-secondary/10 backdrop-blur-sm p-6 border-b border-border">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-3xl font-bold text-secondary">{location.name}</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose} aria-label="Close panel">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground min-w-0 truncate">{location.country}</p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="secondary" size="sm" className="gap-2" onClick={() => onMoreDetails?.()}>
              <TrendingUp className="h-3 w-3" />
              More details
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleDownload}>
              <Download className="h-3 w-3" />
              Download data
            </Button>
          </div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="p-6 border-b border-border">
        <div className="w-full h-48 bg-muted rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-card px-2 py-1 rounded">
            500 m
          </div>
        </div>
      </div>

      {/* Characteristics */}
      <div className="p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Characteristics
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground">Type</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                {location.type}
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className="text-sm font-medium text-foreground">{location.status}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground">Owner</span>
            <span className="text-sm font-medium text-foreground text-right max-w-[60%]">
              {location.owner}
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground">Measures</span>
            <div className="text-sm font-medium text-foreground text-right max-w-[60%]">
              {location.measures.join(", ")}
            </div>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium text-foreground">{location.name}</span>
          </div>

          <div className="flex justify-between items-start flex-col gap-1">
            <span className="text-sm text-muted-foreground">Reporting</span>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{location.lastUpdate}</p>
              <p className="text-sm text-muted-foreground">{location.reportingSince}</p>
            </div>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground">Provider</span>
            <span className="text-sm font-medium text-foreground">{location.provider}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground">Licenses</span>
            <a href="#" className="text-sm font-medium text-secondary hover:underline">
              {location.license}
            </a>
          </div>
        </div>
      </div>

      {/* Lists Section */}
      <div className="p-6 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
          Lists
        </h3>
        <p className="text-sm text-muted-foreground">
          <a href="#" className="text-secondary hover:underline">Sign up</a> or{" "}
          <a href="#" className="text-secondary hover:underline">login</a> to add this location to a list.
        </p>
      </div>
    </div>
  );
};

export default LocationPanel;
