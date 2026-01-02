import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const services = [
    { name: 'Wildlife Safari', href: '/services/wildlife-safari' },
    { name: 'Cultural Tours', href: '/services/cultural-tours' },
    { name: 'Mountain Trekking', href: '/services/mountain-trekking' },
    { name: 'Beach Escapes', href: '/services/beach-escapes' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">TW</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg text-secondary leading-tight">TANZANIA</h1>
                <p className="text-xs text-primary font-medium tracking-wider">WONDERLAND</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
                Services
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link to={service.href} className="w-full cursor-pointer">
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/tours" className="text-foreground hover:text-primary transition-colors font-medium">
              Tours
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              +255 000 000 000
            </Button>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Plan Your Trip
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium" onClick={toggleMenu}>
                About
              </Link>
              
              {/* Mobile Services Links */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">Services</p>
                {services.map((service) => (
                  <Link 
                    key={service.href}
                    to={service.href} 
                    className="block pl-4 text-foreground hover:text-primary transition-colors font-medium"
                    onClick={toggleMenu}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>

              <Link to="/tours" className="text-foreground hover:text-primary transition-colors font-medium" onClick={toggleMenu}>
                Tours
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium" onClick={toggleMenu}>
                Contact
              </Link>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="justify-start text-foreground hover:text-primary">
                  <Phone className="w-4 h-4 mr-2" />
                  +255 000 000 000
                </Button>
                <Link to="/contact" onClick={toggleMenu}>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    Plan Your Trip
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
