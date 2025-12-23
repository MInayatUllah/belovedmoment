'use client';

export default function HowItWorksSection() {
  return (
    <section 
      id="how-it-works" 
      className="py-16 bg-purple-900/10 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-purple-600 font-semibold text-sm sm:text-base md:text-lg mb-2">Simple Guide</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Transform your cherished memories into living moments in just three easy steps
          </p>
        </div>
        
        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Step 1 - Upload */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-15 h-15 bg-[lab(23%_28.14_-32.02)] rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-3 hover-glow cursor-pointer">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <div className="mt-12 mb-0">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[lab(23%_28.14_-32.02)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">Upload Your Photo</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Choose your favorite memory - family portraits, old photographs, or special moments. Simply drag and drop or browse to upload.
            </p>
          </div>
          
          {/* Step 2 - Animation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-15 h-15 bg-[lab(23%_28.14_-32.02)] rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-3 hover-glow cursor-pointer">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <div className="mt-12 mb-0">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[lab(23%_28.14_-32.02)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">Professional Animation</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Our skilled team with professional expertise bring your photos to life with natural, lifelike movement and expressions.
            </p>
          </div>
          
          {/* Step 3 - Download */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-15 h-15 bg-[lab(23%_28.14_-32.02)] rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-3 hover-glow cursor-pointer">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <div className="mt-12 mb-0">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[lab(23%_28.14_-32.02)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">Receive Your Video</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Get your stunning animated video delivered within 24-36 hours, ready to share and treasure forever with your loved ones.
            </p>
          </div>
        </div>
        
        {/* Get Started Button */}
        <div className="text-center">
          <a 
            href="#Order"
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-3 hover-glow cursor-pointer"
          >
            <span>Get Started Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}