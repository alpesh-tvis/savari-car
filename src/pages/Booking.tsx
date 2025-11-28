import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { VehicleSelection } from "@/components/booking/VehicleSelection";
import { DocumentUpload } from "@/components/booking/DocumentUpload";
import { PaymentStep } from "@/components/booking/PaymentStep";
import { ConfirmationStep } from "@/components/booking/ConfirmationStep";
import { PhotoUpload } from "@/components/booking/PhotoUpload";
import { VehicleInspection } from "@/components/booking/VehicleInspection";
import { SignatureStep } from "@/components/booking/SignatureStep";
import { supabase } from "@/integrations/supabase/client";

const STEPS = [
  { id: 1, name: "Vehicle & Dates", component: VehicleSelection },
  { id: 2, name: "Documents", component: DocumentUpload },
  { id: 3, name: "Payment", component: PaymentStep },
  { id: 4, name: "Booking Confirmed", component: ConfirmationStep },
  { id: 5, name: "Vehicle Photos", component: PhotoUpload },
  { id: 6, name: "Fuel & Mileage", component: VehicleInspection },
  { id: 7, name: "Sign Agreement", component: SignatureStep },
  { id: 8, name: "Start Rental", component: null },
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    vehicleId: searchParams.get("vehicleId") || "",
    vehicleName: searchParams.get("vehicleName") || "",
    vehicleType: searchParams.get("vehicleType") || "",
    pricePerDay: Number(searchParams.get("price")) || 0,
    pickupLocation: searchParams.get("location") || "",
    pickupDate: searchParams.get("pickup") || "",
    returnDate: searchParams.get("return") || "",
    driversLicense: "",
    idDocument: "",
    paymentConfirmed: false,
    bookingId: "",
    checkinPhotos: [] as string[],
    checkinFuelLevel: 0,
    checkinMileage: 0,
    checkinSignature: "",
  });

  useEffect(() => {
    if (loading) return; // Wait for auth to initialize
    if (!user) {
      // Preserve current URL so user returns here after login
      const currentUrl = window.location.pathname + window.location.search;
      navigate(`/auth?redirect=${encodeURIComponent(currentUrl)}`);
    }
  }, [user, loading, navigate]);

  const calculateRentalDays = () => {
    const pickup = new Date(bookingData.pickupDate);
    const returnDate = new Date(bookingData.returnDate);
    const days = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, days);
  };

  const calculateTotalPrice = () => {
    return bookingData.pricePerDay * calculateRentalDays();
  };

  const handleNext = async () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!bookingData.vehicleId || !bookingData.pickupDate || !bookingData.returnDate) {
        toast({
          title: "Missing Information",
          description: "Please complete all vehicle and date selections.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 2) {
      if (!bookingData.driversLicense || !bookingData.idDocument) {
        toast({
          title: "Documents Required",
          description: "Please upload both driver's license and ID document.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 3 && !bookingData.paymentConfirmed) {
      toast({
        title: "Payment Required",
        description: "Please complete the payment to continue.",
        variant: "destructive",
      });
      return;
    }

    // Create booking in database after payment (step 3 -> 4)
    if (currentStep === 3 && bookingData.paymentConfirmed && !bookingData.bookingId) {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .insert({
            user_id: user?.id,
            vehicle_id: bookingData.vehicleId,
            vehicle_name: bookingData.vehicleName,
            vehicle_type: bookingData.vehicleType,
            pickup_location: bookingData.pickupLocation,
            pickup_date: bookingData.pickupDate,
            return_date: bookingData.returnDate,
            rental_days: calculateRentalDays(),
            price_per_day: bookingData.pricePerDay,
            total_price: calculateTotalPrice(),
            status: "confirmed",
          })
          .select()
          .single();

        if (error) throw error;

        // Use functional update to ensure we get the latest state
        setBookingData(prev => ({ ...prev, bookingId: data.id }));
        toast({
          title: "Booking Created",
          description: "Your booking has been confirmed!",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to create booking.",
          variant: "destructive",
        });
        return;
      }
    }

    // Ensure bookingId exists before photo upload step
    if (currentStep === 4 && !bookingData.bookingId) {
      toast({
        title: "Error",
        description: "Booking not found. Please go back and try again.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 5) {
      if (bookingData.checkinPhotos.length < 10) {
        toast({
          title: "Photos Required",
          description: "Please upload all 10 vehicle inspection photos.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 6) {
      if (!bookingData.checkinFuelLevel || !bookingData.checkinMileage) {
        toast({
          title: "Information Required",
          description: "Please record fuel level and mileage.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 7) {
      if (!bookingData.checkinSignature) {
        toast({
          title: "Signature Required",
          description: "Please sign the rental agreement.",
          variant: "destructive",
        });
        return;
      }

      // Save check-in completion
      try {
        const { error } = await supabase
          .from("bookings")
          .update({
            checkin_fuel_level: bookingData.checkinFuelLevel,
            checkin_mileage: bookingData.checkinMileage,
            checkin_signature: bookingData.checkinSignature,
            checkin_completed_at: new Date().toISOString(),
            status: "active",
          })
          .eq("id", bookingData.bookingId);

        if (error) throw error;
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to complete check-in.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 8) {
      navigate("/dashboard");
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (updates: Partial<typeof bookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  const CurrentStepComponent = STEPS[currentStep - 1]?.component;
  const progress = (currentStep / STEPS.length) * 100;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancel Booking
          </Button>

          <Card className="p-6 mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Complete Your Booking
            </h1>
            <p className="text-muted-foreground mb-4">
              Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1]?.name}
            </p>
            <Progress value={progress} className="h-2" />
          </Card>

          <Card className="p-8 mb-6">
            {currentStep === 8 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  You Can Start Your Rental!
                </h2>
                <p className="text-muted-foreground mb-8">
                  All check-in procedures are complete. Enjoy your trip with {bookingData.vehicleName}!
                </p>
                <Button size="lg" onClick={handleNext}>
                  Go to Dashboard
                </Button>
              </div>
            ) : CurrentStepComponent ? (
              <CurrentStepComponent 
                bookingData={bookingData} 
                updateBookingData={updateBookingData}
              />
            ) : null}
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button onClick={handleNext}>
              {currentStep === 8 ? "Finish" : "Continue"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
