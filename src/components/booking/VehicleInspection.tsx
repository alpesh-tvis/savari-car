import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Fuel, Gauge } from "lucide-react";

interface VehicleInspectionProps {
  bookingData: any;
  updateBookingData: (updates: any) => void;
}

export const VehicleInspection = ({ bookingData, updateBookingData }: VehicleInspectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Vehicle Condition</h2>
        <p className="text-muted-foreground mb-6">
          Please record the current fuel level and mileage of the vehicle.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Fuel className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <Label className="text-base font-semibold mb-3 block">
              Current Fuel Level
            </Label>
            <div className="space-y-4">
              <Slider
                value={[bookingData.checkinFuelLevel || 0]}
                onValueChange={(value) => updateBookingData({ checkinFuelLevel: value[0] })}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Empty</span>
                <span className="font-semibold text-primary">{bookingData.checkinFuelLevel || 0}%</span>
                <span>Full</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Gauge className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <Label htmlFor="mileage" className="text-base font-semibold mb-3 block">
              Current Mileage (km)
            </Label>
            <Input
              id="mileage"
              type="number"
              placeholder="Enter current mileage"
              value={bookingData.checkinMileage || ""}
              onChange={(e) => updateBookingData({ checkinMileage: parseInt(e.target.value) || 0 })}
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Please enter the exact mileage shown on the odometer
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-accent/5 border-accent/20">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Important:</strong> Make sure these readings are accurate. 
          You'll need to provide the same information when returning the vehicle.
        </p>
      </Card>
    </div>
  );
};
