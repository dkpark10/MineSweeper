import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/default_axios';

axios.defaults.baseURL = 'http://localhost:8080';
type ReturnType<T> = [T, boolean, boolean, React.Dispatch<React.SetStateAction<T>>];

export default <T>(initUrl: string, init?: T): ReturnType<T> => {
  const [response, setResponse] = useState<T | undefined>(init);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const request = async () => {
      try {
        const { data, status } = await axiosInstance.get(initUrl);
        if (status === 200) {
          setResponse(data);
        }
        setLoading(false);
      } catch (err) {
        setError(true);
        // empty
      } finally {
        // empty
      }
    };
    request();
  }, [initUrl]);

  return [response as T, loading, error, setResponse];
};
