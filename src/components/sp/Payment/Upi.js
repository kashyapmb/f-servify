import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Upi = () => {
  const [upiId, setUpiId] = useState(""); // State to manage UPI ID input value

  // Function to handle changes in UPI ID input
  const handleUpiIdChange = (event) => {
    setUpiId(event.target.value); // Update UPI ID state with the input value
  };

  return (
    <Box sx={{ padding: "1rem 3rem" }}>
      <Box sx={{ backgroundColor: "#f2f7fb", padding: "1rem 5rem" }}>
        <label htmlFor="upi-id">Please enter UPI ID:</label>
        <br />
        <Box>
          <input
            type="text"
            id="upi-id"
            value={upiId}
            onChange={handleUpiIdChange}
            style={{
              width: "30%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              borderRadius: "0.3rem",
              border: "none",
            }}
          />
          <Button variant="contained" sx={{ marginLeft: "2rem" }}>
            pay now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Upi;
