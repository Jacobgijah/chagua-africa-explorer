import Hero from '../components/Hero';
import TripQuickPlanner from '../components/TripQuickPlanner';
import FeaturedTours from '../components/FeaturedTours';
import WhyTravelWithUs from '../components/WhyTravelWithUs';
import SocialProofBar from '../components/SocialProofBar';
import DestinationsStrip from '../components/DestinationsStrip';
import ItineraryPreview from '../components/ItineraryPreview';
import TravelInfoTiles from '../components/TravelInfoTiles';
import GalleryPreview from '../components/GalleryPreview';
import TestimonialsSlider from '../components/TestimonialsSlider';
import Newsletter from '../components/Newsletter';
import WhatsAppFloat from '../components/WhatsAppFloat';

const Index = () => {
  return (
    <>
      {/* Hero Section with Primary CTAs */}
      <Hero />
      
      {/* Trip Quick Planner with Trust Chips */}
      <TripQuickPlanner />
      
      {/* Signature Tours Grid (6 cards) */}
      <FeaturedTours />
      
      {/* Why Travel with Us (4 pillars) */}
      <WhyTravelWithUs />
      
      {/* Social Proof Bar */}
      <SocialProofBar />
      
      {/* Destination Strip */}
      <DestinationsStrip />
      
      {/* Itinerary Preview (Day-by-Day) */}
      <ItineraryPreview />
      
      {/* Travel Info Tiles */}
      <TravelInfoTiles />
      
      {/* Gallery Preview */}
      <GalleryPreview />
      
      {/* Testimonials Slider */}
      <TestimonialsSlider />
      
      {/* Newsletter Signup */}
      <Newsletter />
      
      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
    </>
  );
};

export default Index;
