import { Header } from "@/components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Fuel, Gauge, MapPin, Star, Shield, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    description: "Experience comfort and style with our premium luxury sedan. Perfect for business trips or special occasions.",
    features: ["Leather seats", "GPS Navigation", "Bluetooth", "Climate control", "Premium sound system"],
    rating: 4.8,
    reviews: 127,
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
    description: "Spacious and powerful SUV ideal for family trips or group adventures. Enjoy the journey with plenty of room.",
    features: ["7 seats", "4WD", "Roof rack", "Parking sensors", "Apple CarPlay"],
    rating: 4.9,
    reviews: 203,
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
    description: "Efficient and easy to park, our city compact is perfect for urban exploration and daily commutes.",
    features: ["Fuel efficient", "Easy parking", "Bluetooth", "USB charging", "Air conditioning"],
    rating: 4.6,
    reviews: 89,
  },
];

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24">
          <p className="text-center text-muted-foreground">Vehicle not found</p>
          <div className="text-center mt-4">
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <img 
                src={vehicle.image} 
                alt={vehicle.name}
                className="w-full rounded-2xl shadow-strong object-cover aspect-[4/3]"
              />
            </div>

            <div>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">{vehicle.type}</p>
                <h1 className="text-4xl font-bold text-foreground mb-2">{vehicle.name}</h1>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                    <span className="font-semibold">{vehicle.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({vehicle.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {vehicle.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-secondary/50 rounded-lg border border-border">
                  <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold">{vehicle.passengers} Passengers</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg border border-border">
                  <Gauge className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold">{vehicle.transmission}</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg border border-border">
                  <Fuel className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold">{vehicle.fuelType}</p>
                </div>
              </div>

              <Card className="p-6 mb-6 bg-gradient-card border border-border">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-foreground">€{vehicle.price}</span>
                  <span className="text-muted-foreground">/day</span>
                </div>
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={() => {
                    const params = new URLSearchParams({
                      vehicleId: vehicle.id,
                      vehicleName: vehicle.name,
                      vehicleType: vehicle.type,
                      price: vehicle.price.toString(),
                      location: "Barcelona Airport (BCN)",
                      pickup: new Date().toISOString().split('T')[0],
                      return: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    });
                    navigate(`/booking?${params.toString()}`);
                  }}
                >
                  Book Now
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Free cancellation up to 24 hours before pickup
                </p>
              </Card>

              <div>
                <h3 className="font-bold text-foreground mb-3">Features Included</h3>
                <ul className="space-y-2">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              Pickup Location
            </h2>
            <p className="text-muted-foreground mb-2">Main Office - City Center</p>
            <p className="text-sm text-muted-foreground">123 Main Street, Downtown</p>
            <p className="text-sm text-muted-foreground">Open daily: 8:00 AM - 8:00 PM</p>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 DriveShare. Built with transparency and trust.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VehicleDetail;
