import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, CheckCircle, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  bookingData: any;
  updateBookingData: (updates: any) => void;
}

export const DocumentUpload = ({ bookingData, updateBookingData }: DocumentUploadProps) => {
  const [uploadingLicense, setUploadingLicense] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);

  const handleFileUpload = async (type: "license" | "id", file: File) => {
    if (type === "license") setUploadingLicense(true);
    else setUploadingId(true);

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1000));

    const documentUrl = URL.createObjectURL(file);
    
    if (type === "license") {
      updateBookingData({ driversLicense: documentUrl });
      toast({
        title: "License Uploaded",
        description: "Your driver's license has been uploaded successfully.",
      });
      setUploadingLicense(false);
    } else {
      updateBookingData({ idDocument: documentUrl });
      toast({
        title: "ID Uploaded",
        description: "Your ID document has been uploaded successfully.",
      });
      setUploadingId(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Document Verification</h2>
        <p className="text-muted-foreground mb-6">
          Please upload the following documents to verify your identity before booking.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <FileText className="h-6 w-6 text-primary mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">Driver's License</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a clear photo of your valid driver's license
            </p>
            
            {bookingData.driversLicense ? (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Uploaded Successfully</span>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload("license", file);
                  }}
                  className="hidden"
                  id="license-upload"
                />
                <label htmlFor="license-upload">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={uploadingLicense}
                    asChild
                  >
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingLicense ? "Uploading..." : "Upload License"}
                    </span>
                  </Button>
                </label>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <FileText className="h-6 w-6 text-primary mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">ID Card or Passport</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a clear photo of your ID card or passport
            </p>
            
            {bookingData.idDocument ? (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Uploaded Successfully</span>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload("id", file);
                  }}
                  className="hidden"
                  id="id-upload"
                />
                <label htmlFor="id-upload">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={uploadingId}
                    asChild
                  >
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingId ? "Uploading..." : "Upload ID/Passport"}
                    </span>
                  </Button>
                </label>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
