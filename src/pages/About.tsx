import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold">About ORIT Ops</h1>
        <p className="text-muted-foreground">
          ORIT Ops is a demonstration interface for air quality monitoring, built to explore
          data visualization, reporting, and collaboration patterns for healthier cities.
        </p>
        <p className="text-muted-foreground">
          This app showcases interactive mapping, station details, and time-series charts for
          environmental readings using modern web tooling.
        </p>
      </main>
    </div>
  );
};

export default About;
