import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import useData from "../Hooks/useData";
import { useEffect, useState } from "react";

interface Threat {
  id: string;
  name: string;
  pulse_source: string;
  indicators: { type: string }[];
}



const CyberThreatDashboard = () => {
  const { data, isLoading, error } = useData();
  const [threatData, setThreatData] = useState<Threat[]>([]);
  if (isLoading) <div className="text-center text-white">Loading...</div>;
  if (error) <div className="text-center text-red-500">{error}</div>;

  useEffect(() => {
    if (data) {
      setThreatData(data);
    }
  });

  console.log("big dick homie", threatData);
  return (
    <div>
      {threatData.map((threat) => (
        <div key={threat.id}>{threat.name}</div>
      ))}
    </div>
  );
};

export default CyberThreatDashboard;
