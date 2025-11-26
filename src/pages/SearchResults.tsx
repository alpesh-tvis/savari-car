import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, Calendar, SlidersHorizontal } from "lucide-react";

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

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState("all");

  // Filter handlers
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Apply filters
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const priceMatch = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(vehicle.type);
      const transmissionMatch = selectedTransmission === "all" || vehicle.transmission === selectedTransmission;
      
      return priceMatch && typeMatch && transmissionMatch;
    });
  }, [priceRange, selectedTypes, selectedTransmission]);

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Filters</h2>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">
                  Price Range (per day)
                </Label>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Type Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">
                  Vehicle Type
                </Label>
                <div className="space-y-3">
                  {["Premium", "SUV", "Economy"].map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox
                        id={type}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => handleTypeToggle(type)}
                      />
                      <Label htmlFor={type} className="text-sm cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transmission Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">
                  Transmission
                </Label>
                <RadioGroup value={selectedTransmission} onValueChange={setSelectedTransmission}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="text-sm cursor-pointer">
                      All
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Auto" id="auto" />
                    <Label htmlFor="auto" className="text-sm cursor-pointer">
                      Automatic
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Manual" id="manual" />
                    <Label htmlFor="manual" className="text-sm cursor-pointer">
                      Manual
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange([0, 200]);
                  setSelectedTypes([]);
                  setSelectedTransmission("all");
                }}
              >
                Clear Filters
              </Button>
            </Card>
          </aside>

          {/* Vehicle Results */}
          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-2">
                  No vehicles match your filters
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
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
