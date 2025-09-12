import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Users, Baby } from 'lucide-react';
import heroImage from '@/assets/hero-safari.jpg';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Tanzania Safari - Elephants at sunset with Mount Kilimanjaro" 
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headlines */}
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Experience the
              <span className="text-chagua-orange block mt-2">
                Real Tanzania
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Authentic safari experiences, tailor-made journeys, and unforgettable adventures 
              across Tanzania's most spectacular destinations
            </p>
          </div>

          {/* Trip Quick Planner */}
          <div className="animate-slide-in bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-chagua-black mb-6 text-center">
              Plan Your Perfect Safari
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Adults */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Adults</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    type="number" 
                    placeholder="2" 
                    className="pl-10"
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
                    className="pl-10"
                    min="0"
                    defaultValue="0"
                  />
                </div>
              </div>
              
              {/* Arrival Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Arrival Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    type="date" 
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-transparent">Action</label>
                <Button className="w-full bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold h-10">
                  Get Free Quote
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="trust-badge">
                <div className="w-8 h-8 bg-chagua-orange rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Tailor-made trips</p>
                  <p className="text-xs text-muted-foreground">Custom itineraries</p>
                </div>
              </div>
              
              <div className="trust-badge">
                <div className="w-8 h-8 bg-chagua-orange rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">★</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">5-star reviews</p>
                  <p className="text-xs text-muted-foreground">Trusted by 500+</p>
                </div>
              </div>
              
              <div className="trust-badge">
                <div className="w-8 h-8 bg-chagua-orange rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">$</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Best value</p>
                  <p className="text-xs text-muted-foreground">Free quote</p>
                </div>
              </div>
              
              <div className="trust-badge">
                <div className="w-8 h-8 bg-chagua-orange rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">🦁</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Tanzania Experts</p>
                  <p className="text-xs text-muted-foreground">Local guides</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-hero">
              Explore Tours
            </Button>
            <Button className="btn-outline-hero">
              Watch Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;