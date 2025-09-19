import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    country: "United States",
    rating: 5,
    quote: "Absolutely magical experience! Our guide was incredible and the wildlife viewing exceeded all expectations.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Marcus Weber", 
    country: "Germany",
    rating: 5,
    quote: "Professional service from start to finish. The attention to detail and local knowledge was outstanding.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emma Thompson",
    country: "United Kingdom", 
    rating: 5,
    quote: "A once-in-a-lifetime adventure! Every moment was perfectly planned and beautifully executed.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Jean-Pierre Dubois",
    country: "France",
    rating: 5,
    quote: "Incredible safari experience with authentic cultural encounters. Highly recommended for any traveler.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Isabella Rodriguez",
    country: "Spain",
    rating: 5,
    quote: "The team's passion for conservation and wildlife is inspiring. Truly an educational and emotional journey.",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "David Chen",
    country: "Australia",
    rating: 5,
    quote: "Flawless organization and unforgettable memories. The perfect blend of adventure and comfort.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
  }
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-chagua-black text-white relative overflow-hidden">
      {/* African Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: 'var(--pattern-tinga)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-chagua-orange">Travelers Say</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Real experiences from adventurers who've journeyed with us across Tanzania.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <img 
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-chagua-orange shadow-lg"
              />
              
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-chagua-orange fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 italic">
                "{currentTestimonial.quote}"
              </blockquote>
              
              {/* Attribution */}
              <div>
                <p className="font-bold text-lg text-chagua-orange">{currentTestimonial.name}</p>
                <p className="text-white/60">{currentTestimonial.country}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-chagua-orange hover:text-chagua-black transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-chagua-orange scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-chagua-orange hover:text-chagua-black transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail Row */}
          <div className="hidden md:flex items-center justify-center gap-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                className={`relative transition-all duration-300 ${
                  index === currentIndex
                    ? 'scale-110 opacity-100'
                    : 'scale-90 opacity-40 hover:opacity-70'
                }`}
              >
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-white/20"
                />
                {index === currentIndex && (
                  <div className="absolute -inset-1 border-2 border-chagua-orange rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;