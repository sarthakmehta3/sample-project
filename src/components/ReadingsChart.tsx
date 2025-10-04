import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Clock } from "lucide-react";

interface ReadingsChartProps {
  locationId: string;
}

const generateMockData = (points: number) => {
  const data: { time: string; value: number }[] = [];
  const now = new Date();
  for (let i = points - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60 * 60 * 1000);
    const label = `${t.getHours().toString().padStart(2, "0")}:00`;
    data.push({ time: label, value: Math.random() * 0.4 + 0.1 });
  }
  return data;
};

const ReadingsChart = ({ locationId }: ReadingsChartProps) => {
  const [pollutant, setPollutant] = useState("CO ppm");
  const [timeRange, setTimeRange] = useState("Last 24 hours");
  const [chartType, setChartType] = useState("Linear");
  const [data, setData] = useState(generateMockData(24));

  return (
    <div className="w-[640px] flex-none bg-card border-l border-border overflow-y-auto shadow-lg z-20 relative">
      <Card className="m-6 border-border shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-secondary mb-6">Latest Readings</h2>
          
          {/* Controls */}
          <div className="flex gap-3 mb-6">
            <Select value={pollutant} onValueChange={setPollutant}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="CO ppm">CO ppm</SelectItem>
                <SelectItem value="NO ppm">NO ppm</SelectItem>
                <SelectItem value="NO₂ ppm">NO₂ ppm</SelectItem>
                <SelectItem value="NOx ppm">NOx ppm</SelectItem>
                <SelectItem value="SO₂ ppm">SO₂ ppm</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="Last 24 hours">Last 24 hours</SelectItem>
                <SelectItem value="Last 48 hours">Last 48 hours</SelectItem>
                <SelectItem value="Last week">Last week</SelectItem>
              </SelectContent>
            </Select>

            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[120px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="Linear">Linear</SelectItem>
                <SelectItem value="Logarithmic">Logarithmic</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="default"
              size="sm"
              onClick={() => {
                const pts = timeRange === "Last 48 hours" ? 48 : timeRange === "Last week" ? 168 : 24;
                setData(generateMockData(pts));
              }}
            >
              Update
            </Button>
          </div>

          {/* Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[chartType === "Logarithmic" ? 0.01 : 0, 0.6]}
                  ticks={chartType === "Logarithmic" ? [0.01, 0.02, 0.05, 0.1, 0.2, 0.4] : [0, 0.2, 0.4, 0.6]}
                  scale={chartType === "Logarithmic" ? "log" : "auto"}
                  allowDataOverflow
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Chart shows local times (America/New_York UTC-04:00)</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReadingsChart;
