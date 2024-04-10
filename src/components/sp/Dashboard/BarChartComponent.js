import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const BarChartComponent = () => {
  const [monthlyBookingsData, setMonthlyBookingsData] = useState([]);

  useEffect(() => {
    const fetchMonthlyBookingsData = async () => {
      try {
        const providerId = localStorage.getItem("providerId");
        const response = await axios.get(
          `http://localhost:8000/api/dashboard/monthlycount/${providerId}`
        );
        if (response.data && response.data.length > 0) {
          setMonthlyBookingsData(response.data);
        } else {
          console.log("Monthly bookings data is empty or undefined");
        }
      } catch (error) {
        console.error("Error fetching monthly bookings data:", error);
      }
    };

    fetchMonthlyBookingsData();
  }, []);

  if (monthlyBookingsData.length === 0) {
    // Handle loading state or display a message
    return <div>Loading...</div>;
  }

  const xAxisData = monthlyBookingsData.map((entry) => entry.month);
  const canceledData = monthlyBookingsData.map((entry) => entry.cancelled);
  const completedData = monthlyBookingsData.map((entry) => entry.completed);

  const seriesData = [
    {
      data: canceledData,
      name: "Canceled Enquiries",
      label: "Canceled Enquiries    ",
    },
    {
      data: completedData,
      name: "Completed Enquiries",
      label: "Completed Enquiries",
    },
  ];

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: xAxisData }]}
      series={seriesData}
      width={1300}
      height={350}
    />
  );
};

export default BarChartComponent;
