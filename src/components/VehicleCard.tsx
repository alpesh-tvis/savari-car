import { Users, Fuel, Gauge } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface VehicleCardProps {
  name: string;
  type: string;
  image: string;
  price: number;
  passengers: number;
  transmission: string;
  fuelType: string;
}

export const VehicleCard = ({ 
  name, 
  type, 
  image, 
  price, 
  passengers, 
  transmission, 
  fuelType 
}: VehicleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 group cursor-pointer bg-gradient-card border border-border">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-soft">
          €{price}/day
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-1">{type}</p>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{passengers}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{fuelType}</span>
          </div>
        </div>

        <Button className="w-full" variant="default">
          View Details
        </Button>
      </div>
    </Card>
  );
};
