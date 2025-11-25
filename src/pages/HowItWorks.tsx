import { Header } from "@/components/Header";
import { CheckCircle, Calendar, Car, Key, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "1. Browse & Book",
    description: "Search for available vehicles, select your dates, and complete your booking online in minutes.",
  },
  {
    icon: CheckCircle,
    title: "2. Verify Documents",
    description: "Upload your driver's license and ID securely. We verify your documents for a safe rental experience.",
  },
  {
    icon: Key,
    title: "3. Pick Up Your Car",
    description: "Arrive at the pickup location, complete a quick inspection, and get your keys. It's that simple.",
  },
  {
    icon: Car,
    title: "4. Enjoy Your Ride",
    description: "Drive with confidence knowing you have transparent pricing and 24/7 support throughout your rental.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Renting a car has never been easier. Follow these simple steps to get on the road.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-medium transition-all duration-300">
                  <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-card border border-border rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of satisfied customers who trust DriveShare for their car rental needs.
            </p>
            <a href="/auth" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-colors">
              Create Your Account
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 DriveShare. Built with transparency and trust.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;
