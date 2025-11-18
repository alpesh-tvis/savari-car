import { Shield, Clock, CheckCircle, Camera } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Full Transparency",
    description: "10-step check-in/check-out with photo documentation ensures complete accountability",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    description: "Book in minutes with upfront payment and instant confirmation",
  },
  {
    icon: CheckCircle,
    title: "Verified Documents",
    description: "Secure verification of driver's license and ID before every rental",
  },
  {
    icon: Camera,
    title: "Digital Records",
    description: "All vehicle conditions documented with photos, fuel levels, and mileage",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose DriveShare?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on trust and transparency for renters and owners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-hero mb-4 group-hover:scale-110 transition-transform shadow-soft">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
