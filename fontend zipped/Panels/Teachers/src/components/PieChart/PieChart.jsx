/* eslint-disable react/prop-types */
 
import { Pie } from "react-chartjs-2";

// Import Chart.js components
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({attendanceData}) => {
    const{present,absent}=attendanceData;
  // Data for the pie chart
  const data = {
    labels: ["Present", "Absent"], // Categories
    datasets: [
      {
        label: "Attendance", // Label for the dataset
        data: [present, absent], // Values for each category
        backgroundColor: ["#4caf50", "#af4c5b"], // Colors for the slices
        borderColor: ["#ffffff", "#ffffff"], // Border colors
        borderWidth: 1, // Border width
      },
    ],
  };

  // Options for customization
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top", // "top", "bottom", "left", "right"
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: "200px", margin: "10 auto" ,display:"flex",gap:"20px", padding:"20px"}}>
      
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
