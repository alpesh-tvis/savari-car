import { Header } from "@/components/Header";
import { Shield, Heart, Users, Award } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Every rental includes comprehensive insurance and verified users for your peace of mind.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We're here 24/7 to ensure a smooth rental experience.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by drivers, for drivers. We listen to our community and continuously improve.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "All vehicles are regularly inspected and maintained to the highest standards.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About DriveShare
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're revolutionizing car rentals by combining transparency, technology, and trust. 
              Our mission is to make car sharing simple, secure, and accessible for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-medium transition-all duration-300"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-card border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <p>
                DriveShare was founded in 2024 with a simple idea: car rentals should be transparent, 
                trustworthy, and hassle-free. We noticed that traditional rental services were often 
                complicated, with hidden fees and unclear terms.
              </p>
              <p>
                Today, we're proud to serve thousands of customers across Europe, offering a diverse 
                fleet of well-maintained vehicles and a rental experience built on honesty and simplicity.
              </p>
              <p>
                Whether you're planning a weekend getaway or need a reliable car for your daily commute, 
                DriveShare is here to help you get on the road with confidence.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 DriveShare. Built with transparency and trust.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
