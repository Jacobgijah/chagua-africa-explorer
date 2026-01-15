import { FileText, Calendar, Package, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const infoTiles = [
  {
    icon: FileText,
    title: "Visa & Vaccinations",
    description: "Essential travel documents and health requirements for Tanzania.",
    link: "#",
    color: "bg-blue-500"
  },
  {
    icon: Calendar,
    title: "Best Time to Visit", 
    description: "Seasonal guide to wildlife migrations and weather patterns.",
    link: "#",
    color: "bg-green-500"
  },
  {
    icon: Package,
    title: "Packing List",
    description: "Complete safari packing guide for all seasons and activities.",
    link: "#",
    color: "bg-purple-500"
  },
  {
    icon: DollarSign,
    title: "Costs & Fees",
    description: "Transparent breakdown of safari costs and additional expenses.",
    link: "#",
    color: "bg-chagua-orange"
  }
];

const TravelInfoTiles = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* African Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: 'var(--pattern-tinga)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Essential <span className="text-chagua-orange">Travel Information</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know for a smooth and memorable Tanzania adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {infoTiles.map((tile, index) => {
            const IconComponent = tile.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border group cursor-pointer"
              >
                <div className={`w-14 h-14 ${tile.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-chagua-orange transition-colors duration-300">
                  {tile.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {tile.description}
                </p>

                <Button 
                  variant="outline"
                  className="w-full border-chagua-orange text-chagua-orange hover:bg-chagua-orange hover:text-chagua-black transition-all duration-300"
                  asChild
                >
                  <a href={tile.link}>Learn More</a>
                </Button>
              </div>
            );
          })}
        </div>

        {/* CTA to Travel Hub */}
        <div className="text-center">
          <Button 
            className="bg-chagua-orange text-chagua-black hover:bg-chagua-orange/90 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            Visit Travel Info Hub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TravelInfoTiles;