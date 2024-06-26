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
import React, { useEffect, useState } from "react";
import { services } from "../../../data/services";
import { cities } from "../../../data/cities";

import { MdHome } from "react-icons/md";
import { GoHeart, GoHeartFill, GoStarFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";

import { Toaster, toast } from "react-hot-toast";

function MainArea(props) {
  const { city, setCity, user } = props;

  const [searchQuery, setSearchQuery] = useState("");

  const userId = localStorage.getItem("userId");

  // Filtered services based on search query
  const filteredServices = services.filter((service) =>
    service.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  function gotoUserLogin() {
    navigate("/user/login");
  }

  const selectedCity = (selectedcity) => {
    setFormData((prevData) => ({ ...prevData, ["city"]: selectedcity }));
    setFormData((prevData) => ({ ...prevData, ["pincode"]: "" }));
    localStorage.setItem("servifyCityName", selectedcity);
  };

  const selectedService = (option) => {
    if (city == "") {
      alert("First of all select city");
      return;
    }
    if (formData.pincode) {
      navigate(
        `/user/${formData.city.toLowerCase()}/${option.domain.toLowerCase()}`
      );
    } else {
      toast.error("Enter pincode first");
    }
  };

  const deleteToken = () => {
    localStorage.removeItem("userToken");
    window.location.reload();
  };

  const navigatetoUserProfile = () => {
    navigate(`/user/profile/${user._id}`);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const [formData, setFormData] = useState({
    enquiry_for: "",
    pincode: "",
    state: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    enquiry_for: "",
    pincode: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "pincode") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pincode: "Pincode is required",
        }));
      } else if (value.length !== 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pincode: "Pincode should be 6 characters long.",
        }));
      } else {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${value}`
          );

          if (response.data && response.data[0].Status === "Success") {
            const { State, District } = response.data[0].PostOffice[0];
            setFormData((prevData) => ({
              ...prevData,
              state: State,
              city: District,
            }));
            localStorage.setItem("pincode", value)
            localStorage.setItem("servifyCityName", District)
            setErrors((prevErrors) => ({
              ...prevErrors,
              pincode: "",
            }));
          } else {
            setFormData((prevData) => ({
              ...prevData,
              state: "",
              city: "",
            }));
            setErrors((prevErrors) => ({
              ...prevErrors,
              pincode: "Record not found for this pincode.",
            }));
          }
        } catch (error) {
          console.error("Error fetching state and city:", error);
        }
      }
    }
  };

  return (
    <>
      <Toaster />

      <Box
        sx={{
          background: "#ffffff",
          borderRadius: "1rem",
          padding: "3rem 3rem",
          margin: "1rem",
          border: "1px solid black",
        }}
      >
        {/* cities input  and profile */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <TextField
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              helperText={errors.pincode}
              error={!!errors.pincode}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-select-currency"
              select
              label="city name"
              defaultValue="Select"
              helperText="Please select where u want the service"
              value={formData.city}
            >
              {cities.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  onClick={() => selectedCity(option.value)}
                >
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box>
            {user ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Avatar
                    {...stringAvatar(
                      `${user.fname.toUpperCase()} ${user.lname.toUpperCase()}`
                    )}
                    sx={{ bgcolor: "orange", cursor: "pointer" }}
                    onClick={navigatetoUserProfile}
                  />
                  <Button
                    variant="contained"
                    sx={{ background: "orange" }}
                    onClick={deleteToken}
                  >
                    Log out
                  </Button>
                </Box>
              </>
            ) : (
              <Avatar
                src="/broken-image.jpg"
                sx={{ bgcolor: "orange", cursor: "pointer" }}
                onClick={gotoUserLogin}
              />
            )}
          </Box>
        </Box>

        {/* services component */}
        {/* <Box sx={{ marginTop: "1rem" }}>
          
          <Box sx={{ fontSize: "1.3rem", fontWeight: "600", margin: "1rem 0" }}>
            Services
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {services.map((option) => (
              <Box
                sx={{
                  width: "10rem",
                  height: "10rem",
                  borderRadius: "11px",
                  background: "#ffffff",
                  transition: "0.5s",
                  boxShadow: " 8px 8px 28px #dbdbdb, -8px -8px 28px #ffffff",

                  ":hover": {
                    borderRadius: "11px",
                    background: "linear-gradient(145deg,  #ffffff, #e6e6e6)",
                    boxShadow:
                      "15px 15px 30px #bfbfbf, -15px -15px 30px #ffffff",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => selectedService(option)}
              >
                <img
                  src={`images/services/${option.img}`}
                  style={{
                    width: "5rem",
                    // mixBlendMode: "multiply",
                  }}
                />
                <Box sx={{ textAlign: "center", margin: "0.5rem" }}>
                  {option.value}
                </Box>
              </Box>
            ))}
          </Box>
        </Box> 
        */}

        <Box>
          <Box sx={{ marginTop: "1rem" }}>
            <Box
              sx={{ fontSize: "1.3rem", fontWeight: "600", margin: "1rem 0" }}
            >
              Services
            </Box>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              userId={userId}
            />
            <Box
              sx={{
                mt: "1.5rem",
                display: "flex",
                gap: "3rem",
                flexWrap: "wrap",
              }}
            >
              {filteredServices.map((option) => (
                <Box
                  key={option.id} // Assuming each service has a unique id
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    borderRadius: "11px",
                    background: "#ffffff",
                    transition: "0.5s",
                    boxShadow: " 8px 8px 28px #dbdbdb, -8px -8px 28px #ffffff",

                    ":hover": {
                      borderRadius: "11px",
                      background: "linear-gradient(145deg,  #ffffff, #e6e6e6)",
                      boxShadow:
                        "15px 15px 30px #bfbfbf, -15px -15px 30px #ffffff",
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => selectedService(option)}
                >
                  <img
                    src={`images/services/${option.img}`}
                    style={{
                      width: "5rem",
                      // mixBlendMode: "multiply",
                    }}
                    alt={option.value}
                  />
                  <Box sx={{ textAlign: "center", margin: "0.5rem" }}>
                    {option.value}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* your search activity */}
        {/* <Box sx={{ marginTop: "1rem" }}>
          <Box
            sx={{
              fontSize: "1.3rem",
              fontWeight: "600",
              margin: "3rem 0 1rem 0",
            }}
          >
            Your Search Activity
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {services.map((option) => (
              <Card
                sx={{ maxWidth: 345, borderRadius: "11px", cursor: "pointer" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "red" }} variant="rounded">
                      K
                    </Avatar>
                  }
                  title="Kashyap Bavadiya"
                  subheader="Software Developer"
                  sx={{ marginBottom: "0rem" }}
                />
                <CardContent sx={{ paddingTop: "0", paddingBottom: "10px" }}>
                  <Box>22yrs, surat</Box>
                  <Box>Expertise: web development, Software development</Box>
                </CardContent>
                <hr />
                <CardContent sx={{ paddingTop: "0" }}>
                  <Box sx={{ display: "flex", gap: "2rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      <GoHeart /> <Box>0</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      <GoStarFill color="yellow" /> <Box>4.5(10 reviews)</Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box> */}

        {/* Suggested Profiles */}
        {/* <Box sx={{ marginTop: "1rem" }}>
          <Box
            sx={{
              fontSize: "1.3rem",
              fontWeight: "600",
              margin: "3rem 0 1rem 0",
            }}
          >
            Suggested Profiles
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {services.map((option) => (
              <Card
                sx={{ maxWidth: 345, borderRadius: "11px", cursor: "pointer" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "red" }} variant="rounded">
                      K
                    </Avatar>
                  }
                  title="Kashyap Bavadiya"
                  subheader="Software Developer"
                  sx={{ marginBottom: "0rem" }}
                />
                <CardContent sx={{ paddingTop: "0", paddingBottom: "10px" }}>
                  <Box>22yrs, surat</Box>
                  <Box>Expertise: web development, Software development</Box>
                </CardContent>
                <hr />
                <CardContent sx={{ paddingTop: "0" }}>
                  <Box sx={{ display: "flex", gap: "2rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      <GoHeart /> <Box>0</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      <GoStarFill color="yellow" /> <Box>4.5(10 reviews)</Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box> */}
      </Box>
    </>
  );
}

export default MainArea;
