import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching
 * @param {Function} fetchFunction - Async function to fetch data
 * @param {Array} dependencies - Dependencies for re-fetching
 * @param {Boolean} immediate - Whether to fetch immediately on mount
 */
export const useFetch = (fetchFunction, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  return { data, loading, error, refetch, execute };
};

export default useFetch;
