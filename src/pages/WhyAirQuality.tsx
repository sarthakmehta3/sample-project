import Header from "@/components/Header";

const WhyAirQuality = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold">Why Air Quality?</h1>
        <p className="text-muted-foreground">
          Air quality directly impacts respiratory and cardiovascular health. Monitoring helps
          identify pollution hotspots, inform policy, and protect vulnerable communities.
        </p>
      </main>
    </div>
  );
};

export default WhyAirQuality;
