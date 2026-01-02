import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">TW</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-secondary-foreground">TANZANIA</h3>
                <p className="text-primary text-sm font-medium">WONDERLAND</p>
              </div>
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed">
              Experience Tanzania beyond imagination. Wildlife safaris, cultural tours, 
              mountain trekking, and beach escapes crafted by local experts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-secondary-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/services/wildlife-safari" className="text-secondary-foreground/80 hover:text-primary transition-colors">Wildlife Safari</Link></li>
              <li><Link to="/services/cultural-tours" className="text-secondary-foreground/80 hover:text-primary transition-colors">Cultural Tours</Link></li>
              <li><Link to="/services/mountain-trekking" className="text-secondary-foreground/80 hover:text-primary transition-colors">Mountain Trekking</Link></li>
              <li><Link to="/services/beach-escapes" className="text-secondary-foreground/80 hover:text-primary transition-colors">Beach Escapes</Link></li>
              <li><Link to="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-secondary-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-secondary-foreground">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-foreground font-medium">+255 000 000 000</p>
                  <p className="text-secondary-foreground/70 text-sm">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-foreground font-medium">info@tanzaniawonderland.com</p>
                  <p className="text-secondary-foreground/70 text-sm">Get free quotes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-foreground font-medium">Tanzania</p>
                  <p className="text-secondary-foreground/70 text-sm">Safari Capital of Africa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-secondary-foreground">Safari Updates</h4>
            <p className="text-secondary-foreground/80 text-sm">
              Get the latest safari tips, special offers, and destination insights 
              delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-secondary-foreground placeholder:text-secondary-foreground/60"
              />
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Subscribe
              </Button>
            </div>
            <p className="text-secondary-foreground/60 text-xs">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-foreground/70 text-sm">
              © {new Date().getFullYear()} Tanzania Wonderland. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
