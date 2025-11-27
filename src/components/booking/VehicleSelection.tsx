import { Card } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

interface VehicleSelectionProps {
  bookingData: any;
  updateBookingData: (updates: any) => void;
}

export const VehicleSelection = ({ bookingData }: VehicleSelectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Selected Vehicle</h2>
        <Card className="p-6 bg-secondary/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{bookingData.vehicleName}</h3>
              <p className="text-sm text-muted-foreground">{bookingData.vehicleType}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">€{bookingData.pricePerDay}</p>
              <p className="text-sm text-muted-foreground">per day</p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Rental Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Pickup Location</p>
                <p className="font-semibold text-foreground">{bookingData.pickupLocation}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Pickup Date</p>
                <p className="font-semibold text-foreground">{bookingData.pickupDate}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Return Date</p>
                <p className="font-semibold text-foreground">{bookingData.returnDate}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/5">
            <div>
              <p className="text-sm text-muted-foreground">Total Days</p>
              <p className="text-2xl font-bold text-primary">
                {Math.ceil((new Date(bookingData.returnDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
