import React from 'react';
import { Check, Clock} from 'lucide-react';
import type { Skip } from '../types/skip';
import { calculateFinalPrice, formatSkipName, getSkipDescription } from '../types/skip';

export interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const finalPrice = calculateFinalPrice(skip);
  const skipName = formatSkipName(skip);
  const description = getSkipDescription(skip);

  // Generate capacity description based on size
  const getCapacityDescription = (size: number): string => {
    if (size <= 4) return 'Perfect for small home projects';
    if (size <= 8) return 'Ideal for medium renovations';
    if (size <= 12) return 'Great for larger clearouts';
    if (size <= 16) return 'Perfect for major projects';
    return 'Commercial grade capacity';
  };

  // Generate approximate dimensions
  const getDimensions = (size: number): string => {
    const baseWidth = 1.2 + (size - 4) * 0.15;
    return `${baseWidth.toFixed(1)}m x 1.8m x 1.2m`;
  };

  return (
    <div 
      onClick={() => onSelect(skip)}
      className={`
        relative bg-white rounded-3xl shadow-sm border-2 transition-all duration-500 
        cursor-pointer group hover:shadow-2xl hover:-translate-y-2 transform-gpu
        ${isSelected 
          ? 'border-blue-500 ring-4 ring-blue-100 shadow-blue-100/50 shadow-2xl scale-105' 
          : 'border-gray-200 hover:border-blue-200 hover:shadow-xl'
        }
      `}
    >
      {/* Popular Badge for medium sizes */}
      {(skip.size === 6 || skip.size === 8) && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
          <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            Popular
          </span>
        </div>
      )}

      {/* Size Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`
          px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-300
          ${isSelected 
            ? 'bg-blue-500 text-white scale-110' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white group-hover:scale-110'
          }
        `}>
          {skip.size} Yards
        </span>
      </div>

      {/* Skip Illustration */}
      <div className="relative h-52 bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 rounded-t-3xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* 3D Skip Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            relative transition-all duration-500 group-hover:scale-110 group-hover:rotate-2
            ${isSelected ? 'scale-110 rotate-1' : ''}
          `}>
            {/* Skip Shadow */}
            <div className="absolute -bottom-2 left-2 w-36 h-6 bg-black/20 rounded-full blur-sm transform scale-x-75" />
            
            {/* Main Skip Body */}
            <div className="relative w-36 h-24 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg shadow-2xl transform perspective-1000 rotateX-12">
              {/* Skip Brand/Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-yellow-900 font-black text-2xl mb-1">{skip.size}Y</div>
                  <div className="text-yellow-800 text-xs font-semibold opacity-80">SKIP</div>
                </div>
              </div>

              {/* Skip Handles */}
              <div className="absolute -left-1 top-4 w-2 h-4 bg-yellow-700 rounded-l-full" />
              <div className="absolute -right-1 top-4 w-2 h-4 bg-yellow-700 rounded-r-full" />
              <div className="absolute -left-1 bottom-4 w-2 h-4 bg-yellow-700 rounded-l-full" />
              <div className="absolute -right-1 bottom-4 w-2 h-4 bg-yellow-700 rounded-r-full" />

              {/* Top Rim */}
              <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-t-lg" />
            </div>
          </div>
        </div>

        {/* Dimensions Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {getDimensions(skip.size)}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {skipName}
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            {getCapacityDescription(skip.size)}
          </p>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-gray-900">£{finalPrice}</span>
            <span className="text-gray-500 text-sm">inc. VAT</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            (£{skip.price_before_vat} + {skip.vat}% VAT)
          </div>
        </div>

        {/* Select Button */}
        <button
          className={`
            w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 
            transform active:scale-95 shadow-lg hover:shadow-xl
            ${isSelected 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-200' 
              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 hover:shadow-blue-100'
            }
          `}
        >
          {isSelected ? (
            <span className="flex items-center justify-center space-x-3">
              <Check className="w-6 h-6" />
              <span>Selected</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </span>
          ) : (
            <span className="group-hover:tracking-wide transition-all duration-300">
              Select This Skip
            </span>
          )}
        </button>
      </div>

      {/* Selection Glow Effect */}
      {isSelected && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 pointer-events-none animate-pulse" />
      )}
    </div>
  );
};

export default SkipCard;