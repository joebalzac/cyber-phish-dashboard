import axios from "axios";
import { useEffect, useState } from "react";
import { Threat } from "./Types";

const useData = () => {
  const [data, setData] = useState<Threat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY =
    "e0d46cb9f6b94837aa097f12b26888c3a559d42ab6d3aa0a7f19772da7b417a8";

  const API_URL = "https://otx.alienvault.com/api/v1/pulses/subscribed";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ results: Threat[] }>(API_URL, {
        headers: { "X-OTX-API-KEY": API_KEY },
      });

      console.log("big dawg data homie", response.data);
      setData(response.data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An unknown error has occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useData;
