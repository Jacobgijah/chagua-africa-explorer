// File: src/components/GalleryPreview.tsx
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import heroImage from '@/assets/images/GalleryPreview/gallery1.jpg';
import serengetiImage from '@/assets/images/GalleryPreview/gallery2.jpg';
import zanzibarImage from '@/assets/images/GalleryPreview/gallery3.jpg';
import kilimanjaroImage from '@/assets/images/GalleryPreview/gallery4.jpg';
import galleryImage1 from '@/assets/images/GalleryPreview/gallery5.jpg';
import galleryImage2 from '@/assets/images/GalleryPreview/gallery6.jpg';
import galleryImage3 from '@/assets/images/GalleryPreview/gallery7.jpg';
import galleryImage4 from '@/assets/images/GalleryPreview/gallery8.jpg';


const galleryItems = [
  {
    type: 'image',
    src: heroImage,
    alt: 'Tanzania Safari - Elephants at sunset',
    caption: 'Golden hour safari magic'
  },
  {
    type: 'image', 
    src: serengetiImage,
    alt: 'Great Migration in Serengeti',
    caption: 'The Great Migration spectacle'
  },
  {
    type: 'image',
    src: zanzibarImage,
    alt: 'Pristine Zanzibar beaches',
    caption: 'Paradise beaches of Zanzibar'
  },
  {
    type: 'image',
    src: kilimanjaroImage,
    alt: 'Mount Kilimanjaro sunrise',
    caption: 'Kilimanjaro summit sunrise'
  },
  {
    type: 'video',
    src: galleryImage1, // Using image as placeholder for video
    alt: 'Safari video highlight',
    caption: 'Wildlife in motion',
    isVideo: true
  },
  {
    type: 'image',
    src: galleryImage2,
    alt: 'Maasai cultural experience',
    caption: 'Authentic cultural encounters'
  },
  {
    type: 'image',
    src: galleryImage3,
    alt: 'Stone Town architecture',
    caption: 'Historic Stone Town charm'
  },
  {
    type: 'image',
    src: galleryImage4,
    alt: 'Crater rim adventure',
    caption: 'Ngorongoro Crater wonders'
  }
];

const GalleryPreview = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* African Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'var(--pattern-khanga)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience <span className="text-chagua-orange">Tanzania</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in the breathtaking beauty and incredible wildlife of East Africa.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium leading-tight">{item.caption}</p>
                </div>
              </div>
              {item.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-chagua-orange/80 transition-all duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button className="bg-chagua-orange text-chagua-black hover:bg-chagua-orange/90 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            View Full Gallery
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 z-60"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[90vh] mx-4">
            <img 
              src={galleryItems[currentIndex].src}
              alt={galleryItems[currentIndex].alt}
              className="max-w-full max-h-full object-contain rounded-xl"
            />
            <div className="text-center mt-4">
              <p className="text-white text-lg font-medium">{galleryItems[currentIndex].caption}</p>
              <p className="text-white/60 text-sm mt-1">{currentIndex + 1} of {galleryItems.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryPreview;