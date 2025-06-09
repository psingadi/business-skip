import React from 'react';
import { MapPin, Trash2, Check, FileCheck, Calendar, CreditCard } from 'lucide-react';

const ProgressSteps: React.FC = () => {
  const steps = [
    { id: 1, label: 'Postcode', icon: MapPin, completed: true, description: 'Location verified' },
    { id: 2, label: 'Waste Type', icon: Trash2, completed: true, description: 'Garden waste selected' },
    { id: 3, label: 'Select Skip', icon: Check, active: true, description: 'Choose your size' },
    { id: 4, label: 'Permit Check', icon: FileCheck, completed: false, description: 'Verify permissions' },
    { id: 5, label: 'Choose Date', icon: Calendar, completed: false, description: 'Schedule delivery' },
    { id: 6, label: 'Payment', icon: CreditCard, completed: false, description: 'Secure checkout' }
  ];

  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Mobile Progress Bar */}
        <div className="block md:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Step 3 of 6</h2>
            <span className="text-sm text-gray-500">Select Skip Size</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: '50%' }}
              />
            </div>
            <div className="absolute right-0 top-0 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Desktop Step Navigation */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Background Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full" />
          <div 
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: '40%' }}
          />

          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center group">
              {/* Step Circle */}
              <div className={`
                relative w-12 h-12 rounded-full flex items-center justify-center border-3 transition-all duration-500 z-10
                ${step.completed 
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200' 
                  : step.active 
                    ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-200 animate-pulse' 
                    : 'bg-white border-gray-300 text-gray-400 group-hover:border-gray-400'
                }
              `}>
                <step.icon className={`
                  w-5 h-5 transition-all duration-300
                  ${step.active ? 'animate-bounce' : ''}
                `} />
                
                {/* Active Step Ring */}
                {step.active && (
                  <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping" />
                )}
              </div>

              {/* Step Content */}
              <div className="mt-3 text-center max-w-24">
                <div className={`
                  text-sm font-semibold transition-colors duration-300
                  ${step.completed || step.active ? 'text-gray-900' : 'text-gray-500'}
                `}>
                  {step.label}
                </div>
                <div className={`
                  text-xs mt-1 transition-colors duration-300
                  ${step.completed || step.active ? 'text-gray-600' : 'text-gray-400'}
                `}>
                  {step.description}
                </div>
              </div>

              {/* Completion Checkmark */}
              {step.completed && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}

              {/* Active Step Glow */}
              {step.active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-400/20 rounded-full animate-pulse -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;