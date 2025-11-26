import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";

import sedanImage from "@/assets/sedan-1.jpg";
import suvImage from "@/assets/suv-1.jpg";
import compactImage from "@/assets/compact-1.jpg";

const vehicles = [
  {
    id: "luxury-sedan",
    name: "Luxury Sedan",
    type: "Premium",
    image: sedanImage,
    price: 89,
    passengers: 5,
    transmission: "Auto",
    fuelType: "Hybrid",
  },
  {
    id: "premium-suv",
    name: "Premium SUV",
    type: "SUV",
    image: suvImage,
    price: 129,
    passengers: 7,
    transmission: "Auto",
    fuelType: "Diesel",
  },
  {
    id: "city-compact",
    name: "City Compact",
    type: "Economy",
    image: compactImage,
    price: 39,
    passengers: 4,
    transmission: "Manual",
    fuelType: "Petrol",
  },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const location = searchParams.get("location") || "";
  const pickupDate = searchParams.get("pickup") || "";
  const returnDate = searchParams.get("return") || "";

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Available Vehicles
          </h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(pickupDate)} - {formatDate(returnDate)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No vehicles available for the selected dates and location.
            </p>
          </div>
        )}
      </div>

      <footer className="bg-primary text-primary-foreground py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 DriveShare. Built with transparency and trust.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
