
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Success message
    toast({
      title: "Subscription Successful!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    // Reset form
    setEmail("");
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-primary">
        <div className="absolute inset-0 bg-wave-pattern opacity-10"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make Your Mark?
          </h2>
          
          <p className="text-lg text-white/90 mb-8">
            Choose your path and join us in creating sustainable solutions for tomorrow's challenges.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <Button className="bg-secondary text-primary hover:bg-secondary/90 group">
              Apply as Researcher
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="bg-white text-primary hover:bg-white/90 group">
              Become a Mentor
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="bg-accent hover:bg-accent/90 group">
              Partner With Us
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h3 className="font-heading text-xl font-semibold mb-4 text-white">Stay Updated on Our Journey</h3>
            <p className="text-white/80 mb-6">
              Subscribe to our newsletter for project updates, research breakthroughs, and community achievements.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-0 text-white placeholder:text-white/60 focus-visible:ring-secondary"
              />
              <Button type="submit" className="bg-secondary text-primary hover:bg-secondary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
