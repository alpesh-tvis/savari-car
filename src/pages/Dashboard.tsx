import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [driversLicense, setDriversLicense] = useState("");
  const [idDocument, setIdDocument] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleFileUpload = (type: 'license' | 'id') => {
    // Simulate file upload
    const fileName = `${type}_${Date.now()}.pdf`;
    
    if (type === 'license') {
      setDriversLicense(fileName);
      updateProfile({ driversLicense: fileName });
    } else {
      setIdDocument(fileName);
      updateProfile({ idDocument: fileName });
    }

    toast({
      title: "Document uploaded",
      description: `Your ${type === 'license' ? "driver's license" : "ID document"} has been uploaded successfully.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">Manage your profile and documents</p>
          </div>

          <div className="grid gap-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your basic account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={user.name} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Verification */}
            <Card>
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
                <CardDescription>
                  Upload your driver's license and ID/passport to complete your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Driver's License */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Driver's License</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleFileUpload('license')}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {user.driversLicense ? "Replace Document" : "Upload Document"}
                    </Button>
                    {user.driversLicense && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  {user.driversLicense && (
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{user.driversLicense}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* ID/Passport */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">ID Card or Passport</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleFileUpload('id')}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {user.idDocument ? "Replace Document" : "Upload Document"}
                    </Button>
                    {user.idDocument && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  {user.idDocument && (
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{user.idDocument}</span>
                    </div>
                  )}
                </div>

                {user.driversLicense && user.idDocument && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <CheckCircle2 className="h-5 w-5" />
                      <p className="font-medium">Profile Complete!</p>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      You can now proceed to book vehicles.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>View and manage your rental history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No bookings yet</p>
                  <Button 
                    variant="hero" 
                    className="mt-4"
                    onClick={() => navigate("/")}
                  >
                    Browse Vehicles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
