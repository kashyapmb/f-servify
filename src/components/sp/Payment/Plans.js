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

function createData(name, imageUrl, standard, premium, pro) {
  return { name, imageUrl, standard, premium, pro };
}

const rows = [
  createData("Premium Listing", "/images/plan1.svg", "1x", "2x", "3x"),
  createData("Varified Seal", "/images/plan4.svg", "✔️", "✔️", "✔️"),
  createData("Trust Stamp", "/images/plan3.svg", "❌", "❌", "✔️"),
  createData("Smart Lead System", "/images/plan2.svg", "✔️", "✔️", "✔️"),
  createData("Advertise", "/images/plan6.svg", "❌", "❌", "✔️"),
  createData("Business Analytics", "/images/plan5.svg", "✔️", "✔️", "✔️"),
];

function createContent(imageUrl, title, content) {
  return { imageUrl, title, content };
}

const contents = [
  createContent(
    "/images/plan1.svg",
    "Premium Listing",
    "Get higher visibility and exposure on Servify"
  ),
  createContent(
    "/images/plan2.svg",
    "Smart Lead Management System",
    "View and track all your leads at one place"
  ),
  createContent(
    "/images/plan4.svg",
    "Verified Seal",
    "Verify your business listing on Justdial and improve your credibility"
  ),
  createContent(
    "/images/plan3.svg",
    "Trust Stamp",
    "Become eligible for a Trust Stamp that indicates your business is trustworthy"
  ),

  createContent(
    "/images/plan5.svg",
    "Business Analysis",
    "Understand how your Businesses are performing on Servify"
  ),
  createContent(
    "/images/plan6.svg",
    "Advertise",
    "Showcase your product and service offerings to potential customers"
  ),
];

function createStory(name, imageUrl, profession, storyline, time) {
  return { name, imageUrl, profession, storyline, time };
}

const stories = [
  createStory("Ruchi Shingala", "/images/ruchi1.jpg", "Teacher", "aa", 2),
  createStory(
    "Kashyap Bavadiya",
    "/images/kashyap1.jpg",
    "Software Developer",
    "aa",
    "1"
  ),
  createStory("Vrund Satani", "/images/vrund.jpg", "cook", "aa", 3),
  createStory(
    "Happy Khokhariya",
    "/images/haapy.jpg",
    "fashion Designer",
    "aa",
    "5"
  ),
];

export default function Plans() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState("");

  // Function to handle button click
  const handleButtonClick = (plan) => {
    setSelectedPlan(plan);
    // You can perform any other actions here, such as navigation
    navigate("/provider/paymentstep1", { state: { selectedPlan: plan } });
  };
  return (
    <Box>
      <Box sx={{ padding: "0rem 5rem" }}>
        <Box sx={{ fontSize: "2rem", fontWeight: "bold", marginTop: "2rem" }}>
          Plans
        </Box>
      </Box>
      <Box sx={{ padding: "3rem 5rem" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box
                    sx={{
                      lineHeight: "1.2",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Plans
                    <Box
                      sx={{
                        fontStyle: "italic",
                        fontSize: "1rem",
                        fontWeight: "200",
                        marginTop: "0.1rem",
                      }}
                    >
                      These are the plans available for your selected
                      categories.
                      <Box>
                        Pick a plan and start growing your business today.
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
                  align="center"
                >
                  <Box
                    sx={{
                      lineHeight: "1.2",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      color: "#15a677",
                    }}
                  >
                    Standard
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.4rem",
                        justifyContent: "center",
                        gap: "0.8rem",
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: "0.9rem",
                          color: "#817f7c",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹ 132/ Day
                      </Box>
                      <Box
                        sx={{
                          fontSize: "0.9rem",
                          color: "#f47a29",
                        }}
                      >
                        25% off
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        fontSize: "1.2rem",
                        color: "black",
                        marginTop: "0.4rem",
                      }}
                    >
                      ₹ 99/Day
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
                  align="center"
                >
                  <Box
                    sx={{
                      lineHeight: "1.2",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      color: "#e52b8d",
                    }}
                  >
                    Premium
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.4rem",
                        justifyContent: "center",
                        gap: "0.8rem",
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: "0.9rem",
                          color: "#817f7c",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹ 198/ Day
                      </Box>
                      <Box
                        sx={{
                          fontSize: "0.9rem",
                          color: "#f47a29",
                        }}
                      >
                        25% off
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        fontSize: "1.2rem",
                        color: "black",
                        marginTop: "0.4rem",
                      }}
                    >
                      ₹ 148/Day
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
                  align="center"
                >
                  <Box
                    sx={{
                      lineHeight: "1.2",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      color: "#4e49e9",
                    }}
                  >
                    Pro
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.4rem",
                        justifyContent: "center",
                        gap: "0.8rem",
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: "0.9rem",
                          color: "#817f7c",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹ 264/ Day
                      </Box>
                      <Box
                        sx={{
                          fontSize: "0.9rem",
                          color: "#f47a29",
                        }}
                      >
                        25% off
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        fontSize: "1.2rem",
                        color: "black",
                        marginTop: "0.4rem",
                      }}
                    >
                      ₹ 199/Day
                    </Box>
                  </Box>
                </TableCell>
                {/* <TableCell align="center">Protein</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={row.imageUrl}
                      style={{
                        width: "3rem",
                        height: "3rem",
                        marginRight: "1.5rem",
                        marginLeft: "1rem",
                      }}
                    />
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    align="center"
                  >
                    {row.standard}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    align="center"
                  >
                    {row.premium}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    align="center"
                  >
                    {row.pro}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <Button
                    sx={{ marginRight: "2.2rem", padding: "0.5rem 2rem" }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick("standard")}
                  >
                    Buy now
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{ padding: "0.5rem 2rem" }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick("premium")}
                  >
                    Buy now
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{ padding: "0.5rem 2rem" }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick("pro")}
                  >
                    Buy now
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ padding: "0rem 5rem" }}>
        <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>Features</Box>
      </Box>
      <Box
        classname="cards"
        sx={{
          padding: "3rem 5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "2.5rem",
        }}
      >
        {contents.map((content) => (
          <Box
            sx={{
              padding: "0.2rem",
              width: "47.5%",
              border: "1px solid black",
              borderRadius: "1rem",
              cursor: "pointer",
              marginBottom: "0.4rem",
              transition: "0.5s",
              ":hover": {
                boxShadow: "5px 5px 5px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.3rem",
                fontWeight: "bold",
              }}
            >
              <img
                src={content.imageUrl}
                style={{
                  width: "4rem",
                  height: "4rem",
                  marginRight: "1.5rem",
                  marginLeft: "1rem",
                }}
              />
              {content.title}
            </Box>
            <Box sx={{ marginLeft: "6.5rem", marginBottom: "1rem" }}>
              {" "}
              {content.content}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ padding: "0rem 5rem" }}>
        <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>Success stories</Box>
      </Box>
      <Box
        classname="cards"
        sx={{
          padding: "3rem 5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "2.7rem",
        }}
      >
        {stories.map((story) => (
          <Card
            sx={{
              width: "22%",
              borderRadius: "1rem",
              transition: "0.5s",
              ":hover": {
                boxShadow: "5px 5px 5px",
              },
              backgroundColor: "#eff1fb",
            }}
          >
            <img
              src={story.imageUrl}
              style={{
                borderRadius: "1rem",
                width: "100%",
                height: "12rem",
              }}
            />
            <CardContent>
              <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {story.name}
              </Box>
              <Box>{story.profession}</Box>
              <Box>{story.storyline}</Box>
              <Box
                sx={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  marginTop: "2rem",
                }}
              >
                customer since last {story.time} years
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
