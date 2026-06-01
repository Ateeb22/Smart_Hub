// src/hooks/useFetch.js

import { useState, useEffect, useCallback } from "react";

const useFetch = (serviceFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await serviceFunction();
      setData(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [serviceFunction]);

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };

    loadData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useFetch;
