// Example of the "Warm Liquid Glass" Card
export const HeroCard = ({ title, description }) => (
  <div className="relative p-8 rounded-[32px] bg-[#F7F5F2]/40 backdrop-blur-xl border border-white/20 shadow-2xl">
    {/* Sketch Illustration Layer */}
    <div className="absolute top-0 right-0 opacity-20 -z-10">
      <SketchIllustration />
    </div>
    
    <h1 className="font-serif text-3xl text-[#2D2D2D] mb-4">
      {title}
    </h1>
    
    <p className="font-sans text-[#6B6B6B] leading-relaxed mb-6">
      {description}
    </p>
    
    <button className="px-6 py-3 bg-[#5B8BD4] text-white rounded-full font-sans font-medium transition-transform active:scale-95 shadow-lg shadow-[#5B8BD4]/30">
      Get Started
    </button>
  </div>
);