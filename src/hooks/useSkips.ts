import { useState, useEffect } from 'react';
import { Skip } from '../types/skip';

export const useSkips = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        
        if (!response.ok) {
          throw new Error('Failed to fetch skip data');
        }
        
        const data: Skip[] = await response.json();
        setSkips(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching skips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  return { skips, loading, error };
};