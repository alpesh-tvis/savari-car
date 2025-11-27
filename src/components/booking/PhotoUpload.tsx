import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PhotoUploadProps {
  bookingData: any;
  updateBookingData: (updates: any) => void;
}

const REQUIRED_PHOTOS = [
  "Front exterior",
  "Rear exterior",
  "Left side",
  "Right side",
  "Dashboard",
  "Interior front seats",
  "Interior rear seats",
  "Front tires",
  "Rear tires",
  "Fuel gauge"
];

export const PhotoUpload = ({ bookingData, updateBookingData }: PhotoUploadProps) => {
  const [uploading, setUploading] = useState<string | null>(null);

  const handlePhotoUpload = async (photoType: string, file: File) => {
    setUploading(photoType);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${bookingData.bookingId}/${Date.now()}-${photoType.replace(/\s+/g, '-')}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('booking-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('booking-photos')
        .getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase
        .from('booking_photos')
        .insert({
          booking_id: bookingData.bookingId,
          phase: 'checkin',
          photo_type: photoType,
          photo_url: publicUrl,
        });

      if (dbError) throw dbError;

      // Update local state
      const newPhotos = [...bookingData.checkinPhotos, publicUrl];
      updateBookingData({ checkinPhotos: newPhotos });

      toast({
        title: "Photo Uploaded",
        description: `${photoType} photo uploaded successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload photo.",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Vehicle Inspection Photos</h2>
        <p className="text-muted-foreground mb-6">
          Please take clear photos of the vehicle from all angles. This protects both you and the vehicle owner.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Progress:</span>
          <span className="font-semibold text-primary">
            {bookingData.checkinPhotos.length} / {REQUIRED_PHOTOS.length} photos uploaded
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REQUIRED_PHOTOS.map((photoType, index) => {
          const isUploaded = bookingData.checkinPhotos.length > index;
          const isCurrentlyUploading = uploading === photoType;

          return (
            <Card key={photoType} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isUploaded ? 'bg-primary/10' : 'bg-secondary'
                  }`}>
                    {isUploaded ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <Camera className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{photoType}</p>
                    <p className="text-xs text-muted-foreground">
                      {isUploaded ? "Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                </div>

                {!isUploaded && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handlePhotoUpload(photoType, file);
                      }}
                      className="hidden"
                      id={`photo-${index}`}
                    />
                    <label htmlFor={`photo-${index}`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={isCurrentlyUploading}
                        asChild
                      >
                        <span>
                          {isCurrentlyUploading ? "Uploading..." : "Upload"}
                        </span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
