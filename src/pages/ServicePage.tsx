import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import heroImage from '@/assets/images/GalleryPreview/gallery9.jpg';
import serengetiImage from '@/assets/images/GalleryPreview/gallery8.jpg';
import kilimanjaroImage from '@/assets/images/featuredTours/kilimanjaro-trek.jpg';
import zanzibarImage from '@/assets/images/featuredTours/zanzibar-beach.jpg';

const servicesData: Record<string, { title: string; tagline: string; description: string; image: string; highlights: string[]; packages: { name: string; duration: string; price: string }[] }> = {
  'wildlife-safari': {
    title: 'Wildlife Safari',
    tagline: 'Witness Africa\'s Big Five in their natural habitat',
    description: 'Embark on an unforgettable journey through Tanzania\'s world-famous national parks. From the endless plains of the Serengeti to the wildlife-rich Ngorongoro Crater, experience the raw beauty of African wilderness with expert guides who know every secret of the bush.',
    image: serengetiImage,
    highlights: ['Big Five encounters', 'Great Migration viewing', 'Expert naturalist guides', 'Luxury tented camps', 'Hot air balloon safaris', 'Night game drives'],
    packages: [
      { name: 'Serengeti Explorer', duration: '5 Days', price: 'From $2,200' },
      { name: 'Northern Circuit Classic', duration: '7 Days', price: 'From $3,500' }
    ]
  },
  'cultural-tours': {
    title: 'Cultural Tours',
    tagline: 'Connect with Tanzania\'s rich heritage and traditions',
    description: 'Immerse yourself in the vibrant cultures of Tanzania. Visit authentic Maasai villages, explore the historic streets of Stone Town, and discover the traditions that have shaped this remarkable land for centuries.',
    image: heroImage,
    highlights: ['Maasai village visits', 'Stone Town heritage walks', 'Traditional craft workshops', 'Local cuisine experiences', 'Community interactions', 'Cultural performances'],
    packages: [
      { name: 'Maasai Cultural Experience', duration: '3 Days', price: 'From $850' },
      { name: 'Zanzibar Heritage Tour', duration: '4 Days', price: 'From $1,200' }
    ]
  },
  'mountain-trekking': {
    title: 'Mountain Trekking',
    tagline: 'Conquer Africa\'s highest peak',
    description: 'Challenge yourself to summit Mount Kilimanjaro, Africa\'s rooftop at 5,895 meters. Our experienced mountain guides ensure your safety while you traverse diverse ecosystems from tropical rainforest to arctic summit.',
    image: kilimanjaroImage,
    highlights: ['Multiple route options', 'Experienced mountain guides', 'Quality equipment provided', 'Acclimatization protocols', 'Summit success focus', 'Post-trek relaxation'],
    packages: [
      { name: 'Machame Route', duration: '7 Days', price: 'From $2,450' },
      { name: 'Lemosho Route', duration: '8 Days', price: 'From $2,850' }
    ]
  },
  'beach-escapes': {
    title: 'Beach Escapes',
    tagline: 'Paradise found in the Indian Ocean',
    description: 'Unwind on the pristine white sand beaches of Zanzibar and Tanzania\'s coastal gems. Crystal-clear turquoise waters, world-class diving, and the exotic spice island culture await your discovery.',
    image: zanzibarImage,
    highlights: ['Pristine white beaches', 'Snorkeling & diving', 'Spice plantation tours', 'Dolphin watching', 'Historic Stone Town', 'Luxury beach resorts'],
    packages: [
      { name: 'Zanzibar Beach Paradise', duration: '5 Days', price: 'From $1,650' },
      { name: 'Safari & Beach Combo', duration: '10 Days', price: 'From $4,500' }
    ]
  }
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
          <Link to="/"><Button>Back to Home</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Badge className="bg-primary text-primary-foreground mb-4">{service.title}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.tagline}</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Sample Itineraries</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {service.packages.map((pkg, i) => (
                  <div key={i} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-muted-foreground mb-4">{pkg.duration}</p>
                    <p className="text-2xl font-bold text-primary mb-4">{pkg.price}</p>
                    <Link to="/contact">
                      <Button className="w-full">Request Quote <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-muted p-6 rounded-xl border sticky top-24">
              <h3 className="text-xl font-bold mb-4">Ready to Book?</h3>
              <p className="text-muted-foreground mb-6">Contact us for a personalized itinerary and quote.</p>
              <Link to="/contact"><Button className="w-full mb-4">Plan My Trip</Button></Link>
              <Link to="/contact"><Button variant="outline" className="w-full">Request a Quote</Button></Link>
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-primary" /> +255 717 395 728</div>
                <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-primary" /> tanzaniawonderland@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
