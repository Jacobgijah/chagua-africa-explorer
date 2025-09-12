import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const whatsappNumber = "+255123456789";
  const message = "Hi! I'm interested in planning a Tanzania safari. Can you help me with more information?";
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-chagua-black text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-chagua-black"></div>
        </div>
      </button>
      
      {/* Notification Badge */}
      <div className="absolute -top-2 -left-2 bg-chagua-orange text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
        1
      </div>
    </div>
  );
};

export default WhatsAppFloat;