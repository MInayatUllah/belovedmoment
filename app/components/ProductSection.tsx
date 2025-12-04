'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductSection() {
  const [selectedTime, setSelectedTime] = useState('48h');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const price = selectedTime === '48h' ? 15 : 20;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFile({
          file,
          dataUrl: reader.result
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleCheckout = async () => {
    if (!uploadedFile) return;
    
    try {
      // Store image in sessionStorage temporarily
      const imageId = Date.now().toString();
      sessionStorage.setItem(`image_${imageId}`, uploadedFile.dataUrl);
      sessionStorage.setItem('processingTime', selectedTime);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          processingTime: selectedTime
        })
      });
      
      const { url } = await response.json();
      
      // Redirect to Stripe checkout URL
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <section id="Product" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Bring Your Photos to Life, Relive Your Memories
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <span className="text-black">3449 reviews</span>
          </div>
          
          <div className="text-4xl font-bold text-black mb-6">
            ${price}.00
          </div>
          
          <p className="text-gray-600 mb-8">
            Your old photo will be transformed into 6-10 second emotional video, delivered within your chosen timeframe.
          </p>
        </div>

        {/* Time Selection Tabs */}
        <div className="mb-8">
          <h3 className="text-black text-lg mb-4">Receiving Time:</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTime('48h')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedTime === '48h' 
                  ? 'bg-black text-white border-2 border-black' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Within 48 hours
            </button>
            <button
              onClick={() => setSelectedTime('15h')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedTime === '15h' 
                  ? 'bg-black text-white border-2 border-black' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Within 15 hours
            </button>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-8">
          {!uploadedFile && !isUploading && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-black mb-4">
                  <svg className="mx-auto mb-4 w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-black text-lg mb-2">Drag and drop your file or browse</p>
                <p className="text-gray-500">PNG, JPG up to 10MB</p>
              </label>
            </div>
          )}

          {isUploading && (
            <div className="bg-blue-600 rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Uploading...</p>
                  <p className="text-blue-200 text-sm">Please wait</p>
                </div>
              </div>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}

          {uploadedFile && (
            <div className="bg-green-600 rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">{uploadedFile.file.name}</p>
                  <p className="text-green-200 text-sm">Upload complete - tap close to undo</p>
                </div>
              </div>
              <button onClick={removeFile} className="text-white hover:text-red-300">
                <Image src="/close-icon.svg" alt="Remove" width={24} height={24} />
              </button>
            </div>
          )}
        </div>

        {/* Checkout Button */}
        <div className="text-center">
          <button 
            onClick={handleCheckout}
            className="bg-black border-2 border-black text-white px-12 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center gap-3 mx-auto disabled:opacity-50"
            disabled={!uploadedFile}
          >
            <span>Proceed to Checkout</span>
            <div className="hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.494 511.494" width="20" height="20" className="animate-spin">
                <path d="M478.291,255.492c-16.133,0.143-29.689,12.161-31.765,28.16c-15.37,105.014-112.961,177.685-217.975,162.315 S50.866,333.006,66.236,227.992S179.197,50.307,284.211,65.677c35.796,5.239,69.386,20.476,96.907,43.959l-24.107,24.107   c-8.33,8.332-8.328,21.84,0.004,30.17c4.015,4.014,9.465,6.262,15.142,6.246h97.835c11.782,0,21.333-9.551,21.333-21.333V50.991   c-0.003-11.782-9.556-21.331-21.338-21.329c-5.655,0.001-11.079,2.248-15.078,6.246l-28.416,28.416   C320.774-29.34,159.141-19.568,65.476,86.152S-18.415,353.505,87.304,447.17s267.353,83.892,361.017-21.828   c32.972-37.216,54.381-83.237,61.607-132.431c2.828-17.612-9.157-34.183-26.769-37.011   C481.549,255.641,479.922,255.505,478.291,255.492z" fill="currentColor"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}