import Header from "@/components/Header";

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold">Partners</h1>
        <p className="text-muted-foreground">
          We collaborate with civic groups, academic researchers, and public agencies to
          improve urban air quality through open data and shared tools.
        </p>
      </main>
    </div>
  );
};

export default Partners;
