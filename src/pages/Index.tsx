import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VehicleCard } from "@/components/VehicleCard";
import { FeaturesSection } from "@/components/FeaturesSection";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <section id="vehicles-section" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Featured Vehicles
            </h2>
            <p className="text-muted-foreground">
              Browse our selection of quality rental vehicles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={index} {...vehicle} />
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

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

export default Index;
