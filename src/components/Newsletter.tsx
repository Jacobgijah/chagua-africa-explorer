import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-16 bg-muted/50 relative overflow-hidden">
      {/* African Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'var(--pattern-khanga)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {isSubscribed ? (
            // Success State
            <div className="animate-fade-up">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                <span className="text-chagua-orange">Asante sana!</span> You're subscribed
              </h3>
              <p className="text-muted-foreground">
                Welcome to the Chagua Africa family. Get ready for exclusive safari insights, travel tips, and special offers delivered to your inbox.
              </p>
            </div>
          ) : (
            // Newsletter Form
            <div>
              <div className="w-16 h-16 bg-chagua-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-chagua-black" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Stay Connected with <span className="text-chagua-orange">Safari Stories</span>
              </h3>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Get exclusive travel insights, wildlife photography tips, and early access to our best safari deals. 
                <span className="text-chagua-orange font-medium"> Hakuna matata</span> - no spam, just pure Tanzania magic!
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 border-2 focus:border-chagua-orange"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="bg-chagua-orange text-chagua-black hover:bg-chagua-orange/90 font-semibold h-12 px-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-chagua-black/30 border-t-chagua-black rounded-full animate-spin"></div>
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;