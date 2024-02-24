import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:8080";
// Get request
export const useApiCallGet = (url, token = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${baseURL}${url}`, { headers });
        setData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } 
    };

    fetchData();
  }, [url, token]);

  return { data, error };
};
// Post request
export const useApiCallPost = (url, token = null, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.post(`${baseURL}${url}`, payload, { headers });
        setData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } 
    };

    fetchData();
  }, [url, token, payload]);

  return { data, error };
};
