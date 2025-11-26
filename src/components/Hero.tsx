import { Search, Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import heroImage from "@/assets/hero-car.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const popularLocations = [
  "Barcelona Airport (BCN)",
  "Madrid Airport (MAD)",
  "Valencia Airport (VLC)",
  "Barcelona City Center",
  "Madrid City Center",
  "Valencia City Center",
  "Seville Airport (SVQ)",
  "Málaga Airport (AGP)",
  "Bilbao Airport (BIO)",
];

export const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!pickupLocation || !pickupDate || !returnDate) {
      toast.error("Please fill in all search fields");
      return;
    }
    
    // Navigate to search results page with query params
    navigate(`/search-results?location=${encodeURIComponent(pickupLocation)}&pickup=${pickupDate}&return=${returnDate}`);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury car on coastal highway" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Your Perfect Ride, <br />One Click Away
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Rent quality vehicles with complete transparency. Simple check-in, secure booking, hassle-free return.
          </p>

          {/* Search Card */}
          <div className="bg-card rounded-2xl shadow-strong p-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                <Select value={pickupLocation} onValueChange={setPickupLocation}>
                  <SelectTrigger className="border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <Calendar className="h-5 w-5 text-accent" />
                <Input 
                  type="date" 
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <Calendar className="h-5 w-5 text-accent" />
                <Input 
                  type="date" 
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            <Button variant="hero" size="lg" className="w-full mt-4" onClick={handleSearch}>
              <Search className="mr-2 h-5 w-5" />
              Search Available Cars
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
