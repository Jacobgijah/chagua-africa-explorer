import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar, TrendingUp, CheckCircle, XCircle, MapPin, Star, Camera } from 'lucide-react';
import toursData from '@/data/tours.json';

interface Tour {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  duration: string;
  highlights: string[];
  price: string;
  rating: number;
  reviews: number;
  quickFacts: {
    duration: string;
    difficulty: string;
    groupSize: string;
    bestSeason: string;
  };
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  inclusions: string[];
  exclusions: string[];
}

const TourDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    const foundTour = toursData.find((t) => t.slug === slug);
    if (foundTour) {
      setTour(foundTour as Tour);
      setSelectedImage(foundTour.image);
    }
  }, [slug]);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tour not found</h2>
          <p className="text-muted-foreground mb-6">The tour you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/tours">View All Tours</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleBookTour = () => {
    const bookingUrl = `/booking?tour=${encodeURIComponent(tour.title)}`;
    window.location.href = bookingUrl;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-chagua-orange text-black font-semibold">
                  <Clock className="w-4 h-4 mr-1" />
                  {tour.duration}
                </Badge>
                <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-chagua-orange fill-current mr-1" />
                  <span className="text-sm font-semibold text-black">{tour.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({tour.reviews})</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{tour.title}</h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">{tour.shortDescription}</p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {tour.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {highlight}
                  </Badge>
                ))}
              </div>
              
              <div className="text-3xl font-bold text-chagua-orange">{tour.price}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Facts */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Facts</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Clock className="w-5 h-5 text-chagua-orange" />
                  <div>
                    <div className="font-semibold text-foreground">Duration</div>
                    <div className="text-muted-foreground">{tour.quickFacts.duration}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <TrendingUp className="w-5 h-5 text-chagua-orange" />
                  <div>
                    <div className="font-semibold text-foreground">Difficulty</div>
                    <div className="text-muted-foreground">{tour.quickFacts.difficulty}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Users className="w-5 h-5 text-chagua-orange" />
                  <div>
                    <div className="font-semibold text-foreground">Group Size</div>
                    <div className="text-muted-foreground">{tour.quickFacts.groupSize}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Calendar className="w-5 h-5 text-chagua-orange" />
                  <div>
                    <div className="font-semibold text-foreground">Best Season</div>
                    <div className="text-muted-foreground">{tour.quickFacts.bestSeason}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Day-by-Day Itinerary</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {tour.itinerary.map((day) => (
                  <AccordionItem key={day.day} value={`day-${day.day}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className="bg-chagua-orange text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
                          {day.day}
                        </div>
                        <span className="font-semibold text-left">{day.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{day.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {tour.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Not Included
                </h3>
                <ul className="space-y-3">
                  {tour.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tour.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square cursor-pointer group overflow-hidden rounded-lg"
                    onClick={() => {
                      setSelectedImage(image);
                      setIsGalleryOpen(true);
                    }}
                  >
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <div className="bg-muted p-6 rounded-lg border">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-chagua-orange mb-2">{tour.price}</div>
                  <div className="text-muted-foreground">per person</div>
                </div>
                
                <Button 
                  onClick={handleBookTour}
                  className="w-full bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold text-lg py-6"
                >
                  Book This Tour
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">Free cancellation up to 48 hours</p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="bg-muted p-6 rounded-lg border">
                <h3 className="font-bold text-lg text-foreground mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a 
                    href="tel:+255123456789" 
                    className="flex items-center gap-3 text-muted-foreground hover:text-chagua-orange transition-colors"
                  >
                    <div className="w-10 h-10 bg-chagua-orange rounded-full flex items-center justify-center">
                      📞
                    </div>
                    <div>
                      <div className="font-medium">Call Us</div>
                      <div className="text-sm">+255 717 395 728</div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://wa.me/255717395728" 
                    className="flex items-center gap-3 text-muted-foreground hover:text-chagua-orange transition-colors"
                  >
                    <div className="w-10 h-10 bg-chagua-orange rounded-full flex items-center justify-center">
                      💬
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm">Quick Response</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Lightbox */}
      {isGalleryOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-chagua-orange text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetails;