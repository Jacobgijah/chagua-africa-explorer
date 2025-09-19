import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import chaguaLogo from '@/assets/chagua-africa-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src={chaguaLogo} 
                alt="Chagua Africa Tours & Safaris" 
                className="h-12 w-auto transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/tours" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
              Tours
            </a>
            <a href="/destinations" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
              Destinations
            </a>
            <a href="/activities" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
              Activities
            </a>
            <a href="/travel-info" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
              Travel Info
            </a>
            <a href="/about" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
              About
            </a>
            <a href="/blog" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
              Blog
            </a>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-chagua-orange">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button className="bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold">
              Request Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="/tours" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
                Tours
              </a>
              <a href="/destinations" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
                Destinations
              </a>
              <a href="/activities" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
                Activities
              </a>
              <a href="/travel-info" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
                Travel Info
              </a>
              <a href="/about" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
                About
              </a>
              <a href="/blog" className="text-foreground hover:text-chagua-orange transition-colors font-medium">
                Blog
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="justify-start text-foreground hover:text-chagua-orange">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button className="bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold">
                  Request Quote
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;