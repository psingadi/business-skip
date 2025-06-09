// This file defines the Skip type and related utility functions for waste management skips.
export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

// Helper function to calculate final price
export const calculateFinalPrice = (skip: Skip): number => {
  return Math.round(skip.price_before_vat * (1 + skip.vat / 100));
};

// Helper function to format skip name
export const formatSkipName = (skip: Skip): string => {
  return `${skip.size} Yard Skip`;
};

// Helper function to get skip description
export const getSkipDescription = (skip: Skip): string => {
  return `${skip.hire_period_days} day hire period`;
};