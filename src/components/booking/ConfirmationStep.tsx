import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, MapPin, Car } from "lucide-react";

interface ConfirmationStepProps {
  bookingData: any;
}

export const ConfirmationStep = ({ bookingData }: ConfirmationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Your rental has been successfully booked. Now let's complete the vehicle check-in process.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Booking Details</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Car className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Vehicle</p>
              <p className="font-medium text-foreground">{bookingData.vehicleName}</p>
              <p className="text-sm text-muted-foreground">{bookingData.vehicleType}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Pickup Location</p>
              <p className="font-medium text-foreground">{bookingData.pickupLocation}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Rental Period</p>
              <p className="font-medium text-foreground">
                {bookingData.pickupDate} to {bookingData.returnDate}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-accent/5 border-accent/20">
        <h3 className="font-semibold text-foreground mb-3">Next Steps: Vehicle Check-In</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Before you can drive away, please complete the following check-in procedures:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Take 10 photos of the vehicle (exterior, interior, tires, dashboard)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Record the current fuel level and mileage
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Sign the digital rental agreement
          </li>
        </ul>
      </Card>
    </div>
  );
};
