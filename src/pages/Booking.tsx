import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import TrustChips from '@/components/TrustChips';
import toursData from '@/data/tours.json';

const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().min(1, 'Mobile number is required'),
  planningDate: z.date({
    required_error: 'Please select when you are planning to visit'
  }),
  stayLength: z.string().min(1, 'Please select how long you are planning to stay'),
  adults: z.number().min(1, 'At least 1 adult is required'),
  teens: z.number().min(0),
  children: z.number().min(0),
  infants: z.number().min(0),
  message: z.string().max(1000, 'Message must be less than 1000 characters'),
  contactPreference: z.enum(['whatsapp', 'email', 'phone']),
  preferredTour: z.string().optional()
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Booking = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      stayLength: '',
      adults: 2,
      teens: 0,
      children: 0,
      infants: 0,
      message: '',
      contactPreference: 'whatsapp',
      preferredTour: ''
    }
  });

  // Handle prefill from query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tourSlug = urlParams.get('tour');
    const adults = urlParams.get('adults');
    const teens = urlParams.get('teens');
    const children = urlParams.get('children');
    const infants = urlParams.get('infants');
    const date = urlParams.get('date');

    if (tourSlug) {
      const tour = toursData.find(t => t.slug === tourSlug);
      if (tour) {
        form.setValue('preferredTour', tour.title);
      }
    }

    if (adults) form.setValue('adults', parseInt(adults));
    if (teens) form.setValue('teens', parseInt(teens));
    if (children) form.setValue('children', parseInt(children));
    if (infants) form.setValue('infants', parseInt(infants));
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        form.setValue('planningDate', parsedDate);
      }
    }
  }, [form]);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Mock async submission
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setSubmittedData(data);
      setIsSubmitted(true);
      
      toast({
        title: "Your inquiry has been received",
        description: "We've sent a confirmation email (mock). Our team will contact you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppLink = () => {
    if (!submittedData) return '';
    
    const message = encodeURIComponent(
      `Hello! I just submitted a booking inquiry with these details:\n\n` +
      `Name: ${submittedData.firstName} ${submittedData.lastName}\n` +
      `Travel Date: ${format(submittedData.planningDate, 'PPP')}\n` +
      `Duration: ${submittedData.stayLength}\n` +
      `Travelers: ${submittedData.adults} adults, ${submittedData.teens} teens, ${submittedData.children} children, ${submittedData.infants} infants\n` +
      `${submittedData.preferredTour ? `Preferred Tour: ${submittedData.preferredTour}\n` : ''}` +
      `${submittedData.message ? `Message: ${submittedData.message}` : ''}`
    );
    
    return `https://wa.me/255742123456?text=${message}`;
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Thank you, {submittedData.firstName}!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-lg">
                Your booking inquiry has been successfully submitted. We'll review your request and get back to you within 24 hours with a personalized itinerary and quote.
              </p>
              
              <div className="bg-muted/50 rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-4">Your Request Summary:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Travel Date:</strong> {format(submittedData.planningDate, 'PPP')}</p>
                  <p><strong>Duration:</strong> {submittedData.stayLength}</p>
                  <p><strong>Travelers:</strong> {submittedData.adults} adults, {submittedData.teens} teens, {submittedData.children} children, {submittedData.infants} infants</p>
                  <p><strong>Contact via:</strong> {submittedData.contactPreference}</p>
                  {submittedData.preferredTour && (
                    <p><strong>Preferred Tour:</strong> {submittedData.preferredTour}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  Back to Home
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/tours'}>
                  Explore Tours
                </Button>
                {submittedData.contactPreference === 'whatsapp' && (
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => window.open(generateWhatsAppLink(), '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start WhatsApp Chat
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-chagua-black to-chagua-black/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your <span className="text-chagua-orange">Dream Safari</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Tell us about your travel plans and we'll create a personalized itinerary just for you
          </p>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Main Form - Left Column */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-chagua-orange rounded-full flex items-center justify-center text-black font-bold">1</div>
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+255 XXX XXX XXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Travel Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-chagua-orange rounded-full flex items-center justify-center text-black font-bold">2</div>
                        Travel Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="planningDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>When are you planning to come?</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full pl-3 text-left font-normal"
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="stayLength"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>How long are you planning to stay?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="3-4 days">3-4 days</SelectItem>
                                  <SelectItem value="5-7 days">5-7 days</SelectItem>
                                  <SelectItem value="8-10 days">8-10 days</SelectItem>
                                  <SelectItem value="11+ days">11+ days</SelectItem>
                                  <SelectItem value="custom">Custom (specify in message)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FormField
                          control={form.control}
                          name="adults"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adults</FormLabel>
                              <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString() || '2'}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[1,2,3,4,5,6,7,8].map(num => (
                                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="teens"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teens (13-17)</FormLabel>
                              <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString() || '0'}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[0,1,2,3,4,5,6].map(num => (
                                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="children"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Children (3-12)</FormLabel>
                              <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString() || '0'}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[0,1,2,3,4,5,6].map(num => (
                                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="infants"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Infants (0-2)</FormLabel>
                              <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString() || '0'}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[0,1,2,3,4].map(num => (
                                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tour Preference & Additional Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-chagua-orange rounded-full flex items-center justify-center text-black font-bold">3</div>
                        Additional Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="preferredTour"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Tour (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a tour or let us recommend" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="">Let us recommend</SelectItem>
                                {toursData.map((tour) => (
                                  <SelectItem key={tour.id} value={tour.title}>
                                    {tour.title} - {tour.duration}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about dietary restrictions, special occasions, accessibility needs, or specific wildlife you'd like to see..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Up to 1000 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactPreference"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Contact Preference</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                                  <Label htmlFor="whatsapp">WhatsApp</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="email" id="email" />
                                  <Label htmlFor="email">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="phone" id="phone" />
                                  <Label htmlFor="phone">Phone Call</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Button 
                    type="submit" 
                    className="w-full bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      'Send Booking Request'
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Trust Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why Choose Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrustChips />
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-chagua-orange" />
                    <div>
                      <p className="font-medium">+255 742 123 456</p>
                      <p className="text-sm text-muted-foreground">24/7 Support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-chagua-orange" />
                    <div>
                      <p className="font-medium">info@chaguaafricasafaris.com</p>
                      <p className="text-sm text-muted-foreground">Response within 2 hours</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open('https://wa.me/255742123456?text=Hello! I would like to inquire about safari packages.', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Chat
                  </Button>
                </CardContent>
              </Card>

              {/* Why Travel With Us */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why Travel With Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Local expertise, personalized service, and unforgettable experiences in Tanzania.
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More About Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg">
        <Button 
          onClick={() => form.handleSubmit(onSubmit)()}
          className="w-full bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold py-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Booking Request'
          )}
        </Button>
      </div>
    </div>
  );
};

export default Booking;