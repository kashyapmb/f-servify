import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BarChartComponent from "./BarChartComponent"; // Import your BarChart component
import PieChartComponent from "./PieChartComponent"; // Import your PieChart component

import { Avatar, Box } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [enquiryData, setEnquiryData] = useState(null);

  useEffect(() => {
    const fetchEnquiryData = async () => {
      try {
        const pID = localStorage.getItem('providerId')
        const response = await axios.get(
          `http://localhost:8000/api/dashboard/dashboard/${pID}`
        );
        setEnquiryData(response.data);
      } catch (error) {
        console.error("Error fetching enquiry data:", error);
      }
    };

    fetchEnquiryData();
  }, []);

  const contents = [
    {
      title: "Pending Enquiries",
      count: enquiryData?.enquired || 0,
      imgurl: "/images/orders.png",
    },
    {
      title: "Cancel Enquiries",
      count: enquiryData?.cancel_enquiry || 0,
      imgurl: "/images/cancel2.png",
    },
    {
      title: "Decline Enquiries",
      count: enquiryData?.decline_enquiry || 0,
      imgurl: "/images/decline.png",
    },
    {
      title: "Done Enquiries",
      count: enquiryData?.enquiry_done || 0,
      imgurl: "/images/done.png",
    },
  ];

  return (
    <Box sx={{ padding: "2rem 1rem" }}>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        {contents.map((content, index) => (
          <Box
            key={index}
            sx={{
              padding: "1.3rem 2rem",
              width: "21%",
              border: "1px solid black",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "space-between",
              transition: "0.5s",
              ":hover": {
                boxShadow: "5px 5px 5px",
              },
            }}
          >
            <Box>
              <Box sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                {content.title}
              </Box>
              <Box
                sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "green" }}
              >
                {content.count}
              </Box>
            </Box>
            <Avatar src={content.imgurl}></Avatar>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Box
            sx={{
              padding: "1rem",
              width: "100%",
              border: "1px solid black",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "0.5s",
            }}
          >
            <BarChartComponent></BarChartComponent>
          </Box>
          {/* <Box
            sx={{
              padding: "1rem",
              width: "45%",
              border: "1px solid black",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "0.5s",
              ":hover": {
                boxShadow: "5px 5px 5px",
              },
            }}
          >
            <PieChartComponent></PieChartComponent>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
