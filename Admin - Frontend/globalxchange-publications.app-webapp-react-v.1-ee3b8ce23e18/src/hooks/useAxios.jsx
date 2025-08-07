import axios from "axios";
import { useState, useEffect } from "react";

const useAxios = (method, url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (method === "GET") {
          response = await axios.get(url);
        } else if (method === "POST") {
          // You can add other HTTP methods as needed
          response = await axios.post(url);
        }
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [method, url]);

  return { data, loading, error };
};

export default useAxios;
