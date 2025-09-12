import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star } from 'lucide-react';
import serengetiImage from '@/assets/serengeti-migration.jpg';
import zanzibarImage from '@/assets/zanzibar-beach.jpg';
import kilimanjaroImage from '@/assets/kilimanjaro-sunrise.jpg';

const tours = [
  {
    id: 1,
    title: "Serengeti Migration Safari",
    image: serengetiImage,
    duration: "7 Days",
    highlights: ["Great Migration", "Big Five", "Balloon Safari"],
    price: "From $2,850",
    rating: 4.9,
    reviews: 124
  },
  {
    id: 2,
    title: "Zanzibar Beach Paradise",
    image: zanzibarImage,
    duration: "5 Days",
    highlights: ["Pristine Beaches", "Spice Tours", "Stone Town"],
    price: "From $1,650",
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    title: "Kilimanjaro Trekking",
    image: kilimanjaroImage,
    duration: "8 Days",
    highlights: ["Machame Route", "Summit Success", "Expert Guides"],
    price: "From $2,450",
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    title: "Ngorongoro Crater Safari",
    image: serengetiImage,
    duration: "4 Days",
    highlights: ["Crater Floor", "Dense Wildlife", "Cultural Visit"],
    price: "From $1,950",
    rating: 4.7,
    reviews: 78
  },
  {
    id: 5,
    title: "Northern Circuit Explorer",
    image: kilimanjaroImage,
    duration: "12 Days",
    highlights: ["Serengeti", "Ngorongoro", "Tarangire", "Manyara"],
    price: "From $4,200",
    rating: 4.9,
    reviews: 203
  },
  {
    id: 6,
    title: "Cultural Heritage Tour",
    image: zanzibarImage,
    duration: "6 Days",
    highlights: ["Maasai Villages", "Local Markets", "Traditional Crafts"],
    price: "From $1,850",
    rating: 4.6,
    reviews: 67
  }
];

const FeaturedTours = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured <span className="text-chagua-orange">Safari Experiences</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and carefully crafted safari adventures, 
            each designed to showcase Tanzania's incredible wildlife and landscapes
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="tour-card group">
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Duration Badge */}
                <div className="absolute top-4 left-4 bg-chagua-orange text-black px-3 py-1 rounded-full text-sm font-semibold">
                  <Clock className="inline w-4 h-4 mr-1" />
                  {tour.duration}
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 text-chagua-orange fill-current mr-1" />
                  {tour.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-chagua-orange transition-colors">
                  {tour.title}
                </h3>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.highlights.map((highlight, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                {/* Price and Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-chagua-orange">{tour.price}</p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{tour.reviews} reviews</p>
                  </div>
                </div>
                
                {/* CTA */}
                <Button 
                  className="w-full bg-chagua-black text-white hover:bg-chagua-black/90"
                  asChild
                >
                  <a href={`/tours/${tour.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                    View Details
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button className="bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold px-8 py-3">
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;