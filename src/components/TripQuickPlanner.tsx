import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Users, Baby } from 'lucide-react';
import TrustChips from './TrustChips';

const TripQuickPlanner = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* African Pattern Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'var(--pattern-khanga)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Quick Planner Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
              Plan Your Perfect Adventure
            </h3>
            <p className="text-muted-foreground text-center mb-8">
              Get a personalized itinerary and free quote in minutes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {/* Arrival Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Arrival Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    type="date" 
                    className="pl-10 h-12 border-2 focus:border-primary"
                  />
                </div>
              </div>
              
              {/* Adults */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Adults</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    type="number" 
                    placeholder="2" 
                    className="pl-10 h-12 border-2 focus:border-primary"
                    min="1"
                    defaultValue="2"
                  />
                </div>
              </div>
              
              {/* Children */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Children</label>
                <div className="relative">
                  <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    type="number" 
                    placeholder="0" 
                    className="pl-10 h-12 border-2 focus:border-primary"
                    min="0"
                    defaultValue="0"
                  />
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-transparent">Action</label>
                <Link to="/contact">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Get Free Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust Chips */}
            <TrustChips />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripQuickPlanner;
