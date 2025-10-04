import Header from "@/components/Header";

const Donate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold">Donate</h1>
        <p className="text-muted-foreground">
          Your support helps maintain open-source tooling and educational materials that advance
          community air quality monitoring.
        </p>
        <div className="rounded-lg border border-border p-6 bg-card">
          <p className="text-sm text-muted-foreground">
            Donation processing is not connected. For now, please reach out to our team to arrange support.
          </p>
          <a className="text-primary underline" href="mailto:hello@example.com">hello@example.com</a>
        </div>
      </main>
    </div>
  );
};

export default Donate;
