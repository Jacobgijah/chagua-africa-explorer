import { MapPin, Car, DollarSign, Heart } from 'lucide-react';

const pillars = [
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Born and raised in Tanzania, we know every hidden gem and authentic experience."
  },
  {
    icon: Car,
    title: "Private Guides & Vehicles",
    description: "Dedicated guides and comfortable 4WD vehicles exclusively for your group."
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees or surprises. What you see is what you pay, guaranteed."
  },
  {
    icon: Heart,
    title: "Community & Conservation",
    description: "Supporting local communities and wildlife conservation with every safari."
  }
];

const WhyTravelWithUs = () => {
  return (
    <section className="py-20 bg-muted/50 relative overflow-hidden">
      {/* African Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'var(--pattern-tinga)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Travel with <span className="text-chagua-orange">Chagua Africa</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="text-chagua-orange font-medium">Karibu!</span> Welcome to authentic Tanzania experiences crafted with passion and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={index}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-chagua-orange rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <IconComponent className="w-8 h-8 text-chagua-black" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-chagua-orange transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTravelWithUs;