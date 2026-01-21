import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-secondary text-secondary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan Your <span className="text-primary">Dream Adventure</span></h1>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">Tell us about your travel plans and we'll create a personalized itinerary just for you</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium">First Name</label><Input placeholder="Your first name" className="mt-1" /></div>
                <div><label className="text-sm font-medium">Last Name</label><Input placeholder="Your last name" className="mt-1" /></div>
              </div>
              <div><label className="text-sm font-medium">Email</label><Input type="email" placeholder="your@email.com" className="mt-1" /></div>
              <div><label className="text-sm font-medium">Phone</label><Input placeholder="+255 XXX XXX XXX" className="mt-1" /></div>
              <div><label className="text-sm font-medium">Message</label><Textarea placeholder="Tell us about your dream Tanzania adventure..." className="mt-1 min-h-[120px]" /></div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div><p className="font-medium">+255 717 395 728</p><p className="text-sm text-muted-foreground">24/7 Support</p></div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div><p className="font-medium">tanzaniawonderland28@gmail.com</p><p className="text-sm text-muted-foreground">Response within 2 hours</p></div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div><p className="font-medium">Tanzania</p><p className="text-sm text-muted-foreground">Safari Capital of Africa</p></div>
                </div>
              </div>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => window.open('https://wa.me/255717395728', '_blank')}>
              <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
