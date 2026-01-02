import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-safari.jpg';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Tanzania Wonderland - Experience Tanzania Beyond Imagination" 
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
              <span className="inline-block bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-primary/30">
                🌍 Welcome to Tanzania
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              TANZANIA
              <span className="text-primary block mt-2">
                WONDERLAND
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience Tanzania beyond imagination. Wildlife safaris, cultural tours, 
              mountain trekking, and beach escapes crafted by local experts.
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="animate-slide-in flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/contact">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 py-6 text-lg rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-primary"
              >
                Plan Your Trip
              </Button>
            </Link>
            <Link to="/services/wildlife-safari">
              <Button 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-secondary font-bold px-10 py-6 text-lg rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                Explore Services
              </Button>
            </Link>
          </div>

          {/* Service Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/services/wildlife-safari" className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors">
              Wildlife Safari
            </Link>
            <Link to="/services/cultural-tours" className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors">
              Cultural Tours
            </Link>
            <Link to="/services/mountain-trekking" className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors">
              Mountain Trekking
            </Link>
            <Link to="/services/beach-escapes" className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors">
              Beach Escapes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
