import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, Users, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toursData from '@/data/tours.json';

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredAndSortedTours = useMemo(() => {
    let filtered = toursData.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDuration = durationFilter === 'all' || 
                             (durationFilter === 'short' && parseInt(tour.duration) <= 5) ||
                             (durationFilter === 'medium' && parseInt(tour.duration) >= 6 && parseInt(tour.duration) <= 8) ||
                             (durationFilter === 'long' && parseInt(tour.duration) >= 9);

      const price = parseInt(tour.price.replace(/[^0-9]/g, ''));
      const matchesPrice = priceFilter === 'all' ||
                          (priceFilter === 'budget' && price < 2000) ||
                          (priceFilter === 'mid' && price >= 2000 && price < 3000) ||
                          (priceFilter === 'luxury' && price >= 3000);

      return matchesSearch && matchesDuration && matchesPrice;
    });

    // Sort tours
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0; // Keep original order for 'featured'
      }
    });

    return filtered;
  }, [searchTerm, durationFilter, priceFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Tanzania's Wonders
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Handcrafted safari experiences and beach escapes designed to create memories that last a lifetime
            </p>
            <Badge variant="secondary" className="text-lg px-6 py-2">
              {toursData.length} Unique Experiences Available
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl p-6 shadow-lg border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tours, destinations, activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Duration Filter */}
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">1-5 Days</SelectItem>
                  <SelectItem value="medium">6-8 Days</SelectItem>
                  <SelectItem value="long">9+ Days</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="budget">Under $2,000</SelectItem>
                  <SelectItem value="mid">$2,000 - $3,000</SelectItem>
                  <SelectItem value="luxury">$3,000+</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredAndSortedTours.length} {filteredAndSortedTours.length === 1 ? 'Tour' : 'Tours'} Found
            </h2>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="tour-card group h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        {tour.duration}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                        <Star className="w-3 h-3 mr-1 fill-secondary text-secondary" />
                        {tour.rating}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {tour.shortDescription}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        {tour.quickFacts.groupSize}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        Tanzania
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-secondary">{tour.price}</p>
                        <p className="text-xs text-muted-foreground">per person</p>
                      </div>
                      <Link to={`/tours/${tour.slug}`}>
                        <Button className="btn-hero">
                          View Details
                        </Button>
                      </Link>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{tour.reviews} reviews</span>
                        <span>{tour.quickFacts.difficulty}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredAndSortedTours.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No tours found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or browse all our available tours.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setDurationFilter('all');
                    setPriceFilter('all');
                    setSortBy('featured');
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary/10 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We specialize in creating custom itineraries tailored to your interests, budget, and travel style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" className="btn-hero">
                  Plan Custom Tour
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Speak with Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Tours;