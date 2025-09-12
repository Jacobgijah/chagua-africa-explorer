import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Users, Mail, Phone, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import toursData from '@/data/tours.json';

const Booking = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [preselectedTour, setPreselectedTour] = useState<string>('');
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    arrivalDate: '',
    tripLength: '',
    adults: '2',
    teens: '0',
    children: '0',
    infants: '0',
    message: '',
    contactPreference: 'whatsapp',
    selectedTour: ''
  });

  useEffect(() => {
    // Check for preselected tour from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const tourParam = urlParams.get('tour');
    if (tourParam) {
      setPreselectedTour(tourParam);
      setFormData(prev => ({ ...prev, selectedTour: tourParam }));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Booking Request Submitted!",
      description: "We'll get back to you within 24 hours with a customized quote.",
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      arrivalDate: '',
      tripLength: '',
      adults: '2',
      teens: '0',
      children: '0',
      infants: '0',
      message: '',
      contactPreference: 'whatsapp',
      selectedTour: ''
    });
    setDate(undefined);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Book Your <span className="text-chagua-orange">Dream Safari</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your travel plans and we'll create a personalized itinerary just for you. 
            All our quotes are free and tailored to your preferences.
          </p>
        </div>

        {/* Preselected Tour Notice */}
        {preselectedTour && (
          <div className="bg-chagua-orange/10 border border-chagua-orange/20 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-chagua-orange rounded-full flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tour Selected</h3>
                <p className="text-muted-foreground">{preselectedTour}</p>
              </div>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 rounded-lg border">
          
          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Personal Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="+255..."
                />
              </div>
            </div>
          </section>

          {/* Travel Details */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Travel Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Arrival Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="tripLength">Trip Length</Label>
                <Select onValueChange={(value) => handleInputChange('tripLength', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-days">3 Days</SelectItem>
                    <SelectItem value="4-days">4 Days</SelectItem>
                    <SelectItem value="5-days">5 Days</SelectItem>
                    <SelectItem value="7-days">7 Days</SelectItem>
                    <SelectItem value="10-days">10 Days</SelectItem>
                    <SelectItem value="14-days">14 Days</SelectItem>
                    <SelectItem value="custom">Custom Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="adults">Adults (18+)</Label>
                <Select value={formData.adults} onValueChange={(value) => handleInputChange('adults', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="children">Children (0-17)</Label>
                <Select value={formData.children} onValueChange={(value) => handleInputChange('children', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0,1,2,3,4,5,6].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Tour Preference */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6">Tour Preference</h2>
            
            <div>
              <Label>Preferred Tour (Optional)</Label>
              <Select 
                value={formData.selectedTour} 
                onValueChange={(value) => handleInputChange('selectedTour', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a tour or let us recommend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Let us recommend</SelectItem>
                  {toursData.map((tour) => (
                    <SelectItem key={tour.id} value={tour.title}>
                      {tour.title} - {tour.duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Additional Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="message">Special Requests or Questions</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us about any dietary restrictions, special occasions, accessibility needs, or specific wildlife you'd like to see..."
                  rows={4}
                />
              </div>
              
              <div>
                <Label>Preferred Contact Method</Label>
                <Select 
                  value={formData.contactPreference} 
                  onValueChange={(value) => handleInputChange('contactPreference', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="pt-6 border-t">
            <Button 
              type="submit"
              className="w-full bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold py-6 text-lg"
            >
              Get Your Free Quote
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              We'll respond within 24 hours with a personalized itinerary and pricing. 
              No commitment required.
            </p>
          </div>
        </form>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
          <div className="p-6">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-foreground mb-2">Secure Booking</h3>
            <p className="text-sm text-muted-foreground">Your information is protected and never shared</p>
          </div>
          
          <div className="p-6">
            <div className="text-3xl mb-3">💎</div>
            <h3 className="font-semibold text-foreground mb-2">Best Value Guarantee</h3>
            <p className="text-sm text-muted-foreground">Competitive prices with no hidden fees</p>
          </div>
          
          <div className="p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-foreground mb-2">Quick Response</h3>
            <p className="text-sm text-muted-foreground">Get your quote within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;