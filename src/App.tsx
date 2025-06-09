
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle, Clock, Shield, Truck } from 'lucide-react';

import SkipCard from './components/SkipCard';
import ProgressSteps from './components/ProgressSteps';
import './App.css';
import { useSkips } from './hooks/useSkips';

import type { Skip } from './types/skip';
import { calculateFinalPrice, formatSkipName, getSkipDescription } from './types/skip';

const App = () => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const { skips, loading, error } = useSkips();

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-indigo-400 animate-ping mx-auto"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Skip Options</h3>
          <p className="text-gray-600">Finding the best skips for your location...</p>
          <div className="flex items-center justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <ProgressSteps />
      
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Hero Header */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Step 3 of 6</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Skip Size
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select the perfect skip size for your project. All prices include VAT, delivery, 
            14-day hire period, and collection. 
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free Delivery & Collection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>14-Day Hire Period</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-purple-500" />
              <span>Fully Insured</span>
            </div>
          </div>
        </div>

        {/* Skip Grid with Animation */}
        <div className="relative">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {skips.map((skip, index) => (
              <div
                key={skip.id}
                className="animate-fadeInUp"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <SkipCard
                  skip={skip}
                  isSelected={selectedSkip?.id === skip.id}
                  onSelect={handleSkipSelect}
                />
              </div>
            ))}
          </div>

          {/* Selection Summary */}
          {selectedSkip && (
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50 animate-slideUp">
              <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  {/* Selected Skip Info */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-yellow-900 font-black text-xl">{selectedSkip.size}Y</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {formatSkipName(selectedSkip)}
                      </h3>
                      <p className="text-gray-600 mb-2">{getSkipDescription(selectedSkip)}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        {selectedSkip.allowed_on_road && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <Truck className="w-4 h-4" />
                            <span>Road OK</span>
                          </div>
                        )}
                        {selectedSkip.allows_heavy_waste && (
                          <div className="flex items-center space-x-1 text-blue-600">
                            <Shield className="w-4 h-4" />
                            <span>Heavy Waste</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-black text-gray-900">
                        £{calculateFinalPrice(selectedSkip)}
                      </div>
                      <div className="text-sm text-gray-500">inc. VAT</div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-semibold">
                      <ChevronLeft className="w-5 h-5 inline mr-2" />
                      Back
                    </button>
                    <button className="px-12 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-bold text-lg relative overflow-hidden group">
                      <span className="relative z-10 flex items-center">
                        Continue to Permit Check
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;