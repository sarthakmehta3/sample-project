import { Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Wind className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">ORIT Ops</h1>
          <p className="text-xs text-muted-foreground">Air Quality Monitoring</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/explore">Explore the data</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/why-air-quality">Why air quality?</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/partners">Partners</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/about">About</Link>
        </Button>
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/signup">Sign up</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button variant="default" size="sm" asChild>
          <Link to="/donate">Donate</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
