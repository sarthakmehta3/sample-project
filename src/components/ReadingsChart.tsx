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

const generateMockData = () => {
  const data = [];
  const times = ["02:30", "03:30", "04:30", "05:30", "06:30", "07:30", "08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "Oct 03", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30", "23:30", "00:30", "01:30"];
  
  for (let i = 0; i < times.length; i++) {
    data.push({
      time: times[i],
      value: Math.random() * 0.4 + 0.1,
    });
  }
  
  return data;
};

const ReadingsChart = ({ locationId }: ReadingsChartProps) => {
  const [pollutant, setPollutant] = useState("CO ppm");
  const [timeRange, setTimeRange] = useState("Last 24 hours");
  const [chartType, setChartType] = useState("Linear");
  const [data] = useState(generateMockData());

  return (
    <div className="w-[600px] bg-card border-l border-border overflow-y-auto shadow-lg">
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

            <Button variant="default" size="sm">
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
                  domain={[0, 0.6]}
                  ticks={[0, 0.2, 0.4, 0.6]}
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
