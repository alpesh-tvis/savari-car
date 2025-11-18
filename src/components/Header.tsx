import { Car } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="bg-gradient-hero p-2 rounded-lg">
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">DriveShare</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Browse Cars
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
