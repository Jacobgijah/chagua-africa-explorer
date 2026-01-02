import { MapPin, Car, DollarSign, Heart, Shield } from 'lucide-react';

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
    icon: Shield,
    title: "Safety & Trust",
    description: "Your safety is our priority. Licensed guides and 24/7 support throughout."
  },
  {
    icon: Heart,
    title: "Seamless Logistics",
    description: "From airport pickup to farewell, we handle every detail of your journey."
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
            Why Travel with <span className="text-primary">Tanzania Wonderland</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience Tanzania beyond imagination with our expert team and personalized service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={index}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <IconComponent className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
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
