import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, MapPin, Clock, Camera } from 'lucide-react';

const sampleItinerary = [
  {
    day: 1,
    title: "Arrival in Arusha",
    description: "Welcome to Tanzania! Meet your guide and transfer to your accommodation.",
    highlights: ["Airport pickup", "Welcome briefing", "Overnight in Arusha"],
    icon: MapPin
  },
  {
    day: 2,
    title: "Tarangire National Park",
    description: "Famous for its large elephant herds and ancient baobab trees.",
    highlights: ["Elephant encounters", "Baobab trees", "Bird watching"],
    icon: Camera
  },
  {
    day: 3,
    title: "Serengeti National Park",
    description: "Enter the legendary Serengeti and witness the Great Migration.",
    highlights: ["Great Migration", "Big Five", "Endless plains"],
    icon: Camera
  },
  {
    day: 4,
    title: "Central Serengeti",
    description: "Full day exploring the heart of the Serengeti ecosystem.",
    highlights: ["Predator sightings", "River crossings", "Sunset drive"],
    icon: Camera
  },
  {
    day: 5,
    title: "Ngorongoro Crater",
    description: "Descend into the world's largest intact volcanic caldera.",
    highlights: ["Crater floor", "Dense wildlife", "Picnic lunch"],
    icon: MapPin
  },
  {
    day: 6,
    title: "Cultural Experience & Departure",
    description: "Visit a Maasai village and transfer to the airport.",
    highlights: ["Maasai culture", "Traditional dance", "Departure"],
    icon: Clock
  }
];

const ItineraryPreview = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* African Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'var(--pattern-khanga)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sample <span className="text-chagua-orange">Safari Itinerary</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <span className="text-chagua-orange font-medium">Habari ya safari?</span> Here's what a typical 6-day Northern Circuit adventure looks like.
            </p>
          </div>

          {/* Itinerary Accordion */}
          <div className="space-y-4 mb-12">
            {sampleItinerary.map((item) => {
              const IconComponent = item.icon;
              const isExpanded = expandedDay === item.day;
              
              return (
                <div 
                  key={item.day}
                  className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  {/* Day Header */}
                  <button
                    onClick={() => toggleDay(item.day)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-chagua-orange rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-chagua-black" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="bg-chagua-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Day {item.day}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {/* Day Content */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6">
                      <div className="pl-16">
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.highlights.map((highlight, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-chagua-orange/10 text-chagua-orange px-3 py-1 rounded-full font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              className="bg-chagua-orange text-chagua-black hover:bg-chagua-orange/90 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              asChild
            >
              <a href="/tours">See Full Itineraries</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryPreview;