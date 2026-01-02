import { Star, Award, DollarSign, MapPin } from 'lucide-react';

const trustItems = [
  { icon: Award, title: "Tailor-made trips", subtitle: "Custom itineraries" },
  { icon: Star, title: "Top reviews", subtitle: "4.9/5 rating" },
  { icon: DollarSign, title: "Best value", subtitle: "Transparent pricing" },
  { icon: MapPin, title: "Experts in Tanzania", subtitle: "Local knowledge" }
];

const TrustChips = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {trustItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-foreground leading-tight">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-tight">{item.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrustChips;
