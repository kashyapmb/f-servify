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

const Qr = () => {
  return (
    <Box sx={{ padding: "1rem 3rem" }}>
      <Box sx={{ backgroundColor: "#f2f7fb", padding: "1rem 5rem" }}>
        <Button variant="contained" sx={{ marginLeft: "2rem" }}>
          Generate QR
        </Button>
      </Box>
    </Box>
  );
};

export default Qr;
