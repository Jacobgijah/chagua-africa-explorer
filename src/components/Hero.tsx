import { Button } from '@/components/ui/button';
import { Calendar, Users, Baby } from 'lucide-react';
import heroImage from '@/assets/hero-safari.jpg';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Tanzania Safari - Tailor-made safaris and Zanzibar holidays with local expertise" 
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Headlines */}
          <div className="animate-fade-up">
            <div className="mb-4">
              <span className="inline-block bg-chagua-orange/20 text-chagua-orange px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-chagua-orange/30">
                🦁 Karibu Tanzania - Welcome!
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Tailor-Made Safaris &
              <span className="text-chagua-orange block mt-2">
                Zanzibar Holidays
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Local expertise, private guides & unforgettable experiences in Tanzania. 
              Discover authentic adventures crafted just for you.
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="animate-slide-in flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              className="bg-chagua-orange text-chagua-black hover:bg-chagua-orange/90 font-bold px-10 py-6 text-lg rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-chagua-orange"
              asChild
            >
              <a href="/tours">Explore Tours</a>
            </Button>
            <Button 
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-chagua-black font-bold px-10 py-6 text-lg rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              asChild
            >
              <a href="#booking">Book Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;