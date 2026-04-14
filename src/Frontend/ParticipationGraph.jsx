import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ParticipationGraph = () => {
  const [data, setData] = useState([]);
  const { class_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost/student-attendance-managment-system/Backend/Get_Participation_Data.php?class_id=${class_id}`,
          { credentials: "include" }
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching participation data:", err);
      }
    };
    fetchData();
  }, [class_id]);

  const chartData = {
    labels: data.map(d => d.student),
    datasets: [
      {
        label: "Participation Score",
        data: data.map(d => d.score),
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  };

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h2>Participation Scores</h2>
      <Bar data={chartData} />
    </div>
  );
};