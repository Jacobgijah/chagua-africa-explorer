// File: src/components/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const services = [
    { name: "Wildlife Safari", href: "/services/wildlife-safari" },
    { name: "Cultural Tours", href: "/services/cultural-tours" },
    { name: "Mountain Trekking", href: "/services/mountain-trekking" },
    { name: "Beach Escapes", href: "/services/beach-escapes" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-4">
              <img
                src={logo}
                alt="Logo"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="hidden sm:block leading-tight">
                <h1 className="font-bold text-xl md:text-lg text-secondary tracking-wide">
                  TANZANIA WONDERLAND
                </h1>
                <p className="text-sm md:text-base text-primary font-semibold tracking-[0.18em]">
                   Tours & Trekking
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Link
              to="/"
              className="text-base xl:text-lg text-foreground hover:text-primary transition-colors font-semibold"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-base xl:text-lg text-foreground hover:text-primary transition-colors font-semibold"
            >
              About
            </Link>

            {/* ✅ Services Hover Dropdown (no portal, no defects) */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-2 text-base xl:text-lg text-foreground hover:text-primary transition-colors font-semibold"
                aria-haspopup="menu"
                aria-label="Services"
              >
                Services
                <ChevronDown className="w-5 h-5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>

              {/* Dropdown */}
              <div
                className={[
                  "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3",
                  "opacity-0 translate-y-2 pointer-events-none",
                  "transition-all duration-200",
                  "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
                  "group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto",
                ].join(" ")}
              >
                {/* Hover bridge (prevents flicker if there's a tiny gap) */}
                <div className="absolute left-0 right-0 -top-2 h-2" />

                <div className="w-64 rounded-2xl border border-border bg-white/95 backdrop-blur shadow-[var(--shadow-soft)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      Services
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      Choose your journey
                    </div>
                  </div>

                  <div className="py-2">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="block px-4 py-3 text-base font-semibold text-foreground hover:bg-muted/50 hover:text-primary transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/tours"
              className="text-base xl:text-lg text-foreground hover:text-primary transition-colors font-semibold"
            >
              Tours
            </Link>

            <Link
              to="/contact"
              className="text-base xl:text-lg text-foreground hover:text-primary transition-colors font-semibold"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="h-12 px-4 text-base xl:text-lg text-foreground hover:text-primary"
            >
              <Phone className="w-5 h-5 mr-2" />
              +255 717 395 728
            </Button>

            <Link to="/contact">
              <Button className="h-12 px-6 text-base xl:text-lg rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-safari)] transition-all">
                Plan Your Trip
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="lg:hidden h-12 w-12"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-5">
              <Link
                to="/"
                className="text-lg text-foreground hover:text-primary transition-colors font-semibold"
                onClick={toggleMenu}
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-lg text-foreground hover:text-primary transition-colors font-semibold"
                onClick={toggleMenu}
              >
                About
              </Link>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">
                  Services
                </p>
                {services.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className="block pl-4 text-lg text-foreground hover:text-primary transition-colors font-semibold"
                    onClick={toggleMenu}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>

              <Link
                to="/tours"
                className="text-lg text-foreground hover:text-primary transition-colors font-semibold"
                onClick={toggleMenu}
              >
                Tours
              </Link>

              <Link
                to="/contact"
                className="text-lg text-foreground hover:text-primary transition-colors font-semibold"
                onClick={toggleMenu}
              >
                Contact
              </Link>

              <div className="flex flex-col space-y-3 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  className="justify-start h-12 px-3 text-lg text-foreground hover:text-primary"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +255 717 395 728
                </Button>

                <Link to="/contact" onClick={toggleMenu}>
                  <Button className="w-full h-12 text-lg rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-safari)] transition-all">
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
