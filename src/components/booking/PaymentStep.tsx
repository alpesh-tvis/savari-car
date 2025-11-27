import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PaymentStepProps {
  bookingData: any;
  updateBookingData: (updates: any) => void;
}

export const PaymentStep = ({ bookingData, updateBookingData }: PaymentStepProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  const calculateRentalDays = () => {
    const pickup = new Date(bookingData.pickupDate);
    const returnDate = new Date(bookingData.returnDate);
    const days = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, days);
  };

  const totalPrice = bookingData.pricePerDay * calculateRentalDays();

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment details.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    updateBookingData({ paymentConfirmed: true });
    toast({
      title: "Payment Successful",
      description: `€${totalPrice.toFixed(2)} has been charged to your card.`,
    });

    setProcessing(false);
  };

  if (bookingData.paymentConfirmed) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Payment Confirmed</h3>
        <p className="text-muted-foreground">
          Your payment of €{totalPrice.toFixed(2)} has been processed successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Payment Details</h2>
        <p className="text-muted-foreground mb-6">
          Full payment is required before confirming your booking.
        </p>
      </div>

      <Card className="p-6 bg-gradient-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vehicle</span>
            <span className="font-medium text-foreground">{bookingData.vehicleName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price per day</span>
            <span className="font-medium text-foreground">€{bookingData.pricePerDay}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Rental days</span>
            <span className="font-medium text-foreground">{calculateRentalDays()}</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-bold text-foreground">Total Amount</span>
              <span className="text-2xl font-bold text-primary">€{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Secure Payment (Mock)</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input 
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input 
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                maxLength={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                type="password"
              />
            </div>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? "Processing..." : `Pay €${totalPrice.toFixed(2)}`}
          </Button>
        </div>
      </Card>
    </div>
  );
};
