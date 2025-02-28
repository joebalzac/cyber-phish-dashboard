import { useEffect, useState } from "react";
import useData from "../Hooks/useData";
import { ChartData } from "chart.js";
import { Threat } from "../Hooks/Types";
import { Pie } from "react-chartjs-2";

const ThreatsPieChart = () => {
  const { data, isLoading, error } = useData();
  const [chartData, setChartData] = useState<ChartData<"pie"> | null>(null);

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  if (error) {
    return <p>This is an unknown error</p>;
  }

  useEffect(() => {
    if (!data.length) return;

    const malwareCounts: Record<string, number> = {};
    data.forEach((threat: Threat) => {
      threat.malware_families.map(
        (malware) => (malwareCounts[malware] = (malwareCounts[malware] | 0) + 1)
      );
    });

    const labels = Object.keys(malwareCounts);
    const values = Object.values(malwareCounts);

    setChartData({
      labels,
      datasets: [
        {
          label: "Threat Categories",
          data: values,
          backgroundColor: "#445534, #444, #567866, #567453, #98898",
        },
      ],
    });
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>{chartData ? <Pie data={chartData} /> : <p>No Data Available</p>}</div>
  );
};

export default ThreatsPieChart;
