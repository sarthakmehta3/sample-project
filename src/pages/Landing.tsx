import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { useMemo } from "react";

const pm25ToAQI = (pm: number) => {
  const ranges = [
    { cLow: 0.0, cHigh: 12.0, aLow: 0, aHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, aLow: 51, aHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, aLow: 101, aHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, aLow: 151, aHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, aLow: 201, aHigh: 300 },
    { cLow: 250.5, cHigh: 350.4, aLow: 301, aHigh: 400 },
    { cLow: 350.5, cHigh: 500.4, aLow: 401, aHigh: 500 },
  ];
  const r = ranges.find((r) => pm >= r.cLow && pm <= r.cHigh) ?? ranges[ranges.length - 1];
  const aqi = ((r.aHigh - r.aLow) / (r.cHigh - r.cLow)) * (pm - r.cLow) + r.aLow;
  return Math.round(aqi);
};

const genTodayHours = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const arr: { time: string; pm25: number }[] = [];
  for (let h = 0; h <= now.getHours(); h++) {
    const t = new Date(start.getTime() + h * 60 * 60 * 1000);
    const label = `${t.getHours().toString().padStart(2, "0")}:00`;
    const pm25 = +(Math.max(5, Math.min(80, 25 + 15 * Math.sin(h / 3) + (Math.random() - 0.5) * 10))).toFixed(1);
    arr.push({ time: label, pm25 });
  }
  return arr;
};

const genTotals = () => {
  return [
    { pollutant: "PM2.5", value:  Math.round(300 + Math.random() * 200) },
    { pollutant: "PM10",  value:  Math.round(400 + Math.random() * 250) },
    { pollutant: "NO2",   value:  Math.round(200 + Math.random() * 160) },
    { pollutant: "SO2",   value:  Math.round(80 + Math.random() * 70) },
    { pollutant: "O3",    value:  Math.round(250 + Math.random() * 200) },
    { pollutant: "CO",    value:  Math.round(120 + Math.random() * 100) },
  ];
};

const aqiColor = (aqi: number) => {
  if (aqi <= 50) return "bg-green-500 text-white";
  if (aqi <= 100) return "bg-yellow-500 text-black";
  if (aqi <= 150) return "bg-orange-500 text-white";
  if (aqi <= 200) return "bg-red-500 text-white";
  if (aqi <= 300) return "bg-purple-600 text-white";
  return "bg-rose-700 text-white";
};

const Landing = () => {
  const hourly = useMemo(() => genTodayHours(), []);
  const totals = useMemo(() => genTotals(), []);
  const currentPM = hourly[hourly.length - 1]?.pm25 ?? 0;
  const aqi = pm25ToAQI(currentPM);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Today's Air Quality</h1>
            <p className="text-muted-foreground">Live AQI based on PM2.5 and totals across key pollutants.</p>
          </div>
          <div className={`rounded-lg px-4 py-3 font-semibold shadow ${aqiColor(aqi)}`}>
            Current AQI: <span className="text-base md:text-lg">{aqi}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">PM2.5 today</h2>
              <div className="text-sm text-muted-foreground">Last updated just now</div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourly} margin={{ left: 12, right: 12, top: 12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="pm25" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="pm25" stroke="hsl(var(--primary))" fill="url(#pm25)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Total pollutants today</h2>
              <Button variant="outline" size="sm">Export</Button>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={totals} margin={{ left: 12, right: 12, top: 12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="pollutant" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--chart-3))" radius={[4,4,0,0]} name="Total (µg/m³·h)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Landing;
