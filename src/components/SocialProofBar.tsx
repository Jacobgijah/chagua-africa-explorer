import { Star, Users, Award, ThumbsUp } from 'lucide-react';

const SocialProofBar = () => {
  return (
    <section className="py-12 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 text-primary fill-current" />))}
              <span className="text-2xl font-bold ml-2">4.9</span>
            </div>
            <p className="text-secondary-foreground/80">Loved by travelers worldwide</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/20"></div>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-5 h-5 text-primary" /><span className="text-xl font-bold">500+</span>
              </div>
              <p className="text-sm text-secondary-foreground/80">Happy Travelers</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Award className="w-5 h-5 text-primary" /><span className="text-xl font-bold">50+</span>
              </div>
              <p className="text-sm text-secondary-foreground/80">Awards Won</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <ThumbsUp className="w-5 h-5 text-primary" /><span className="text-xl font-bold">98%</span>
              </div>
              <p className="text-sm text-secondary-foreground/80">Recommend Us</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
