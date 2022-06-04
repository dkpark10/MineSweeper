import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/default_axios";

axios.defaults.baseURL = "http://localhost:8080";
type ReturnType<T> = [T, boolean, React.Dispatch<React.SetStateAction<T>>];

export default <T>(initUrl: string, init?: T): ReturnType<T> => {
  const [response, setResponse] = useState<T | undefined>(init);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const request = async () => {
      try {
        const { data, status } = await axiosInstance.get(initUrl);
        if (status === 200) {
          setResponse(data);
        }
        setLoading(false);
      } catch (e) {
      } finally {
      }
    }
    request();
  }, [initUrl])

  return [response, loading, setResponse];
}