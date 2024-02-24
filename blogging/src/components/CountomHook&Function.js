import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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

//Registration Validation Check
export function validateForm(RegFormData) {
  if (RegFormData.uName.trim() === "") {
    toast.error("Username must not be empty");
    return false;
  }

  if (RegFormData.password.trim() === "") {
    toast.error("Password must not be empty");
    return false;
  }

  if (RegFormData.password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  if (!emailPattern.test(RegFormData.email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  if (RegFormData.Contact === "") {
    toast.error("Contact must not be empty");
    return false;
  }

  // You can add more specific validation rules for the contact field if needed

  return true; // Form is valid
}