import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-chagua-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-chagua-orange rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-2xl">C</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">Chagua Africa</h3>
                <p className="text-white/70 text-sm">Tours & Safaris</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Experience authentic Tanzania with expert local guides, tailor-made safaris, 
              and unforgettable adventures across East Africa's most spectacular destinations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-chagua-orange hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-chagua-orange hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-chagua-orange hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-chagua-orange hover:text-black transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/tours" className="text-white/80 hover:text-chagua-orange transition-colors">Safari Tours</a></li>
              <li><a href="/destinations" className="text-white/80 hover:text-chagua-orange transition-colors">Destinations</a></li>
              <li><a href="/activities" className="text-white/80 hover:text-chagua-orange transition-colors">Activities</a></li>
              <li><a href="/travel-info" className="text-white/80 hover:text-chagua-orange transition-colors">Travel Information</a></li>
              <li><a href="/about" className="text-white/80 hover:text-chagua-orange transition-colors">About Us</a></li>
              <li><a href="/blog" className="text-white/80 hover:text-chagua-orange transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-white/80 hover:text-chagua-orange transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-chagua-orange mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">+255 123 456 789</p>
                  <p className="text-white/70 text-sm">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-chagua-orange mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">info@chaguaafrica.com</p>
                  <p className="text-white/70 text-sm">Get free quotes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-chagua-orange mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Arusha, Tanzania</p>
                  <p className="text-white/70 text-sm">Safari Capital of Africa</p>
                  <a href="https://maps.google.com" className="text-chagua-orange text-sm hover:underline">
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-white">Safari Updates</h4>
            <p className="text-white/80 text-sm">
              Get the latest safari tips, special offers, and destination insights 
              delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="w-full bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold">
                Subscribe
              </Button>
            </div>
            <p className="text-white/60 text-xs">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/70 text-sm">
              © 2024 Chagua Africa Tours & Safaris. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-white/70 hover:text-chagua-orange transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/70 hover:text-chagua-orange transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-white/70 hover:text-chagua-orange transition-colors">
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