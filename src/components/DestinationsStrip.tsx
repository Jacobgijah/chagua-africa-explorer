import { ArrowRight } from 'lucide-react';
import serengetiImage from '@/assets/serengeti-migration.jpg';
import zanzibarImage from '@/assets/zanzibar-beach.jpg';
import kilimanjaroImage from '@/assets/kilimanjaro-sunrise.jpg';
import heroImage from '@/assets/hero-safari.jpg';

const destinations = [
  {
    id: 1,
    name: "Tanzania",
    description: "The heart of East Africa",
    image: heroImage,
    tours: "25+ Tours"
  },
  {
    id: 2,
    name: "Zanzibar",
    description: "Spice Island paradise",
    image: zanzibarImage,
    tours: "12+ Tours"
  },
  {
    id: 3,
    name: "Serengeti",
    description: "Great Migration spectacle",
    image: serengetiImage,
    tours: "18+ Tours"
  },
  {
    id: 4,
    name: "Kilimanjaro",
    description: "Africa's highest peak",
    image: kilimanjaroImage,
    tours: "8+ Tours"
  }
];

const DestinationsStrip = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Tanzania's <span className="text-chagua-orange">Top Destinations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From pristine beaches to towering mountains, discover the diverse landscapes 
            that make Tanzania a world-class safari destination
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div key={destination.id} className="destination-card group">
              <div className="relative h-80 overflow-hidden rounded-xl">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{destination.name}</h3>
                    <ArrowRight className="w-6 h-6 transform transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-white/90 mb-2">{destination.description}</p>
                  <p className="text-chagua-orange font-semibold text-sm">{destination.tours}</p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-chagua-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to explore these incredible destinations?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-chagua-orange text-black hover:bg-chagua-orange/90 px-8 py-3 rounded-lg font-semibold transition-colors">
              Plan Your Safari
            </button>
            <button className="border-2 border-chagua-black text-chagua-black hover:bg-chagua-black hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsStrip;