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
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  MdError,
  MdHome,
  MdOutlineLocationOn,
  MdVerified,
} from "react-icons/md";
import { GoHeart, GoHeartFill, GoStarFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import axios from "axios";
import Header from "../Header";
import Rating from "@mui/material/Rating";
import LoadingAnimation from "../../utils/LoadingAnimation";
import SearchBar from "../SearchProvider/SearchBar";

function Favorite() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState();
  const [city, setCity] = useState();
  const [providerData, setProviderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviderData, setFilteredProviderData] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      const getFavorites = async () => {
        await axios
          .post(`http://localhost:8000/api/utils/getfavorites/`, {
            userId: localStorage.getItem("userId"),
          })
          .then((response) => {
            setProviders(response.data.favoriteProvidersData);
            setLoading(false);
          });
      };
      getFavorites();
    } else {
      navigate("/user/login");
    }

    const filteredData = providers.filter((provider) => {
      const fullName = `${provider.fname} ${provider.lname}`.toLowerCase();
      const mobileNumber = provider.mobile.toLowerCase();
      const city = provider.city.toLowerCase();
      const profession = provider.profession.toLowerCase();
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        mobileNumber.includes(searchQuery.toLowerCase()) ||
        city.includes(searchQuery.toLowerCase()) ||
        profession.includes(searchQuery.toLowerCase()) 
      );
    });
    setFilteredProviderData(filteredData);
  }, [searchQuery, providerData]);

  const getProviderData = async () => {
    try {
      let apiUrl = "http://localhost:8000/api/provider/getprovidersalgo";
      if (sortOption === "ratings") {
        apiUrl = "http://localhost:8000/api/provider/getprovidersRating";
      }
      const response = await axios.post(apiUrl, {
        city,
        domain,
      });
      const providerDataWithPayment = await Promise.all(
        response.data.map(async (provider) => {
          const paymentInfoResponse = await axios.get(
            `http://localhost:8000/api/payment/getpaymentinfo/${provider._id}`
          );
          const reviewcountInfo = await axios.get(
            `http://localhost:8000/api/reviews/getratingscount/${provider._id}`
          );

          return {
            ...provider,
            paymentInfo: paymentInfoResponse.data,
            reviewcountInfo: reviewcountInfo.data,
          };
        })
      );
      setProviderData(providerDataWithPayment);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const savedSortOption = localStorage.getItem("sortOption");
    if (savedSortOption) {
      setSortOption(savedSortOption);
    }
    // fetch domain from  url
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    setDomain(parts[parts.length - 1]);
    setCity(localStorage.getItem("servifyCityName"));

    const fetchData = async () => {
      await getProviderData();
    };
    fetchData();
  });

  const clickedServiceProvider = (obj) => {
    navigate(`/user/${city.toLowerCase()}/${domain}/${obj._id}`);
  };
  const [starValue, setValue] = useState(4.5);

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    // Store the selected sorting option in localStorage
    localStorage.setItem("sortOption", selectedOption);
    setSortOption(selectedOption);
    window.location.reload();
  };

  if (loading) return <LoadingAnimation />;
  return (
    <>
      <Header />
      <Box
        sx={{
          background: "#ffffff",
          borderRadius: "1rem",
          padding: "3rem 3rem",
          margin: "1rem",
          border: "1px solid black",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pr: "5rem",
            mb: "1rem",
          }}
        >
          <Box sx={{ display: "flex" }}>
            Favorite Provider : &nbsp;
            <Box sx={{ fontWeight: "600" }}>{providers.length} providers</Box>
          </Box>
        </Box>
        <hr />
        <Box mt={2} width={"100%"}>
          <SearchBar
            style={{ width: "100%" }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>
        <Box
          sx={{ mt: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}
        >
          {filteredProviderData &&
            filteredProviderData.map((obj, index) => {
              return (
                <Box
                  sx={{
                    padding: "1rem",
                    width: "30rem",
                    border: "0.2px solid #ebecf0",
                    borderRadius: "1rem",
                    cursor: "pointer",
                    transition: "0.5s",
                    ":hover": {
                      borderColor: "black",
                    },
                  }}
                  onClick={() => clickedServiceProvider(obj)}
                >
                  <Grid container>
                    <Grid item xs={2.5}>
                      <img
                        src={obj.profilePhoto}
                        style={{
                          width: "100%",

                          border: "0.2px solid #ebecf0",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Box
                        sx={{
                          marginLeft: "2rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.3rem",
                        }}
                      >
                        {/* Name  */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ fontSize: "1.4rem", fontWeight: "600" }}>
                            {obj.fname} {obj.lname}
                          </Box>
                          <img
                            src="/images/plan4.svg"
                            style={{
                              width: "3rem",
                              height: "3rem",
                              marginLeft: "1rem",
                            }}
                          />
                          {/* {obj.paymentInfo.payment === "done" &&
                            obj.paymentInfo.plan === "pro" && (
                              <img
                                src="/images/plan3.svg"
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                  marginLeft: "1rem",
                                }}
                              />
                            )} */}
                        </Box>
                        {/* profession  */}
                        <Box sx={{ fontWeight: "500" }}>{obj.profession}</Box>
                        {/* rating and reviews  */}
                        <Box sx={{ display: "flex" }}>
                          <Box
                            sx={{
                              height: "1.5rem",
                              width: "2rem",
                              background: "#a5d6a7",
                              display: "flex",
                              justifyContent: "center",
                              borderRadius: "0.3rem",
                              mr: "0.7rem",
                            }}
                          >
                            {obj.overallRating}
                          </Box>
                          <Rating
                            name="half-rating-read"
                            defaultValue={obj.overallRating}
                            precision={0.1}
                            readOnly
                          />
                          {/* <Box sx={{ opacity: "0.7", ml: "1.7rem" }}>
                            {obj.reviewcountInfo.count} Reviews
                          </Box> */}
                        </Box>
                        {/* location  */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            fontWeight: "600",
                          }}
                        >
                          <MdOutlineLocationOn />
                          <Box>
                            {obj.location}
                            {","}
                          </Box>

                          {obj.city}
                        </Box>

                        {/* completed work  */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ opacity: "0.7" }}>Completed work : </Box>
                          <Box
                            sx={{
                              ml: "0.3rem",
                              alignItems: "center",
                              fontWeight: "600",
                              fontSize: "0.9rem",
                            }}
                          >
                            {obj.completed_work}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
}

export default Favorite;
