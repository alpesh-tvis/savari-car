import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PenTool, RotateCcw } from "lucide-react";

interface SignatureStepProps {
  bookingData: any;
  updateBookingData: (updates: any) => void;
}

export const SignatureStep = ({ bookingData, updateBookingData }: SignatureStepProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;

    // Set drawing style
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    if (isDrawing && hasSignature) {
      const canvas = canvasRef.current;
      if (canvas) {
        const signatureData = canvas.toDataURL();
        updateBookingData({ checkinSignature: signatureData });
      }
    }
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    updateBookingData({ checkinSignature: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Rental Agreement</h2>
        <p className="text-muted-foreground mb-6">
          Please review and sign the rental agreement to complete the check-in process.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-3">Rental Terms & Conditions</h3>
        <div className="space-y-2 text-sm text-muted-foreground mb-6 max-h-40 overflow-y-auto">
          <p>By signing this agreement, you confirm that:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>You have inspected the vehicle and confirmed its condition</li>
            <li>The fuel level and mileage have been accurately recorded</li>
            <li>You will return the vehicle in the same condition</li>
            <li>You will be responsible for any damage incurred during the rental period</li>
            <li>You agree to pay for fuel used during the rental</li>
            <li>You have a valid driver's license and insurance</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Your Signature</Label>
            {hasSignature && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearSignature}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          <div className="border-2 border-border rounded-lg bg-background">
            <canvas
              ref={canvasRef}
              className="w-full cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>

          {!hasSignature && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <PenTool className="h-4 w-4" />
              <span>Sign above using your mouse or finger</span>
            </div>
          )}
        </div>
      </Card>

      {bookingData.checkinSignature && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-foreground">
            ✓ Signature captured successfully
          </p>
        </Card>
      )}
    </div>
  );
};
