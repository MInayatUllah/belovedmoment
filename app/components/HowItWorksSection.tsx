export default function HowItWorksSection() {
  return (
    <section 
      id="how-it-works" 
      className="relative z-[1] py-20 bg-cover bg-center"
      style={{ backgroundColor: 'rgb(3, 3, 3)' }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-white">
            Three simple steps to get up and running
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            How It Works
          </h2>
        </div>
        
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center justify-center size-[120px] rounded-full bg-blue-600/20">
              <span className="text-6xl font-bold text-blue-500">1</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">1. Upload Your Image</h3>
            <span className="text-gray-300">
              Start with any image – portrait, product shot, or art. Just drag and drop.
            </span>
          </div>
          
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center justify-center size-[120px] rounded-full bg-blue-600/20">
              <span className="text-6xl font-bold text-blue-500">2</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">2. Choose Animation Style</h3>
            <p className="text-gray-300">
              Pick from cinematic zooms, subtle movement, or expressive storytelling.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center justify-center size-[120px] rounded-full bg-blue-600/20">
              <span className="text-6xl font-bold text-blue-500">3</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">3. Generate & Download</h3>
            <p className="text-gray-300">
              Let the AI work its magic. Preview your video, then download or share.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}