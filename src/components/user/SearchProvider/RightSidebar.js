// import {
//   Autocomplete,
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   Collapse,
//   IconButton,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";

// import { MdError, MdHome, MdVerified } from "react-icons/md";
// import { GoHeart, GoHeartFill, GoStarFill } from "react-icons/go";
// import { useNavigate } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import { MdOutlineReviews } from "react-icons/md";
// import { RiVerifiedBadgeFill } from "react-icons/ri";
// import axios from "axios";
// import SearchBar from "./SearchBar";

// function RightSidebar() {
//   const [domain, setDomain] = useState();
//   const [city, setCity] = useState();
//   const [providerData, setProviderData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProviderData, setFilteredProviderData] = useState([]);

//   useEffect(() => {
//     const filteredData = providerData.filter((provider) => {
//       const fullName = `${provider.fname} ${provider.lname}`.toLowerCase();
//       const mobileNumber = provider.mobile.toLowerCase();
//       return (
//         fullName.includes(searchQuery.toLowerCase()) ||
//         mobileNumber.includes(searchQuery.toLowerCase())
//       );
//     });
//     setFilteredProviderData(filteredData);
//   }, [searchQuery, providerData]);

//   const getProviderData = async () => {
//     console.log(city);
//     console.log(domain);
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/provider/getProviders",
//         {
//           city,
//           domain,
//         }
//       );
//       console.log(response.data);
//       setProviderData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     // fetch domain from  url
//     const currentURL = window.location.href;
//     const parts = currentURL.split("/");
//     setDomain(parts[parts.length - 1]);
//     setCity(localStorage.getItem("servifyCityName"));

//     const fetchData = async () => {
//       await getProviderData();
//     };
//     fetchData();
//   });

//   const navigate = useNavigate();
//   const clickedServiceProvider = (obj) => {
//     navigate(`/user/${city.toLowerCase()}/${domain}/${obj._id}`);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           background: "#ffffff",
//           borderRadius: "1rem",
//           padding: "3rem 3rem",
//           margin: "1rem",
//           border: "1px solid black",
//         }}
//       >
//         {/* filter functionality */}

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             pr: "5rem",
//             mb: "1rem",
//           }}
//         >
//           <Box sx={{ display: "flex" }}>
//             Search found : &nbsp;
//             <Box sx={{ fontWeight: "600" }}>
//               {providerData.length} providers
//             </Box>
//           </Box>
//           <Box>
//             Sort by : <Select sx={{ height: "2rem" }} />
//           </Box>
//         </Box>
//         <hr />
//         <Box mt={2}>
//           <SearchBar
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//           />
//         </Box>
//         <Box
//           sx={{ mt: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}
//         >
//           {filteredProviderData &&
//             filteredProviderData.map((obj, index) => {
//               return (
//                 <Box
//                   sx={{
//                     padding: "1rem",
//                     width: "40%",
//                     border: "1px solid black",
//                     borderRadius: "1rem",
//                     cursor: "pointer",
//                     transition: "0.5s",
//                     ":hover": {
//                       boxShadow: "5px 5px 5px",
//                     },
//                   }}
//                   onClick={() => clickedServiceProvider(obj)}
//                 >
//                   {/* img, name and profession  */}
//                   <Box sx={{ display: "flex" }}>
//                     <Box>
//                       <img
//                         src={obj.profilePhoto}
//                         style={{
//                           width: "6rem",
//                           height: "6rem",
//                           border: "1px solid black",
//                           borderRadius: "1rem",
//                         }}
//                       />
//                     </Box>
//                     <Box
//                       sx={{
//                         margin: "0 1rem",
//                         mt: "1rem",
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "0.3rem",
//                       }}
//                     >
//                       <Box sx={{ fontSize: "1.1rem" }}>
//                         {obj.fname} {obj.lname}
//                       </Box>
//                       <Box sx={{ fontWeight: "600" }}>{obj.profession}</Box>
//                     </Box>
//                   </Box>
//                   {/* location  */}
//                   <Box sx={{ display: "flex", gap: "2rem" }}>
//                     <Box sx={{ display: "flex", flexDirection: "column" }}>
//                       <Box sx={{ fontWeight: "600" }}>{obj.location}</Box>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         Phone Verified : &nbsp;{" "}
//                         {obj.mobileverified ? (
//                           <MdVerified color="blue" />
//                         ) : (
//                           <MdError color="red" size={20} />
//                         )}
//                       </Box>
//                     </Box>
//                   </Box>
//                   {/* rating ,  job and  reviewsct  */}
//                   <Box sx={{ display: "flex", gap: "2rem" }}>
//                     <Box sx={{ display: "flex", flexDirection: "column" }}>
//                       <Box sx={{ opacity: "0.7" }}>Rating</Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           fontWeight: "600",
//                           fontSize: "0.9rem",
//                           gap: "0.3rem",
//                         }}
//                       >
//                         <FaStar color="#fee701" size={13} />
//                         4.5
//                       </Box>
//                     </Box>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box sx={{ opacity: "0.7" }}>Completed work</Box>
//                       <Box
//                         sx={{
//                           ml: "0.3rem",
//                           alignItems: "center",
//                           fontWeight: "600",
//                           fontSize: "0.9rem",
//                         }}
//                       >
//                         {obj.completed_work}
//                       </Box>
//                     </Box>
//                     <Box sx={{ display: "flex", flexDirection: "column" }}>
//                       <Box sx={{ opacity: "0.7" }}>Reviews</Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           fontWeight: "600",
//                           fontSize: "0.9rem",
//                           gap: "0.3rem",
//                         }}
//                       >
//                         <MdOutlineReviews color="blue" size={13} />
//                         20
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>
//               );
//             })}
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default RightSidebar;

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
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

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
import SearchBar from "./SearchBar";
import Rating from "@mui/material/Rating";
import LoadingAnimation from "../../utils/LoadingAnimation";

function RightSidebar() {
  const [domain, setDomain] = useState();
  const [city, setCity] = useState();
  const [providerData, setProviderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviderData, setFilteredProviderData] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [sortOption, setSortOption] = useState("none");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filteredData = providerData.filter((provider) => {
      const fullName = `${provider.fname} ${provider.lname}`.toLowerCase();
      const mobileNumber = provider.mobile.toLowerCase();
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        mobileNumber.includes(searchQuery.toLowerCase())
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

  const navigate = useNavigate();
  const clickedServiceProvider = (obj) => {
    navigate(`/user/${city.toLowerCase()}/${domain}/${obj._id}`);
  };
  const [starValue, setValue] = useState(4.5);

  if (loading) return <LoadingAnimation />;
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    // Store the selected sorting option in localStorage
    localStorage.setItem("sortOption", selectedOption);
    setSortOption(selectedOption);
    window.location.reload();
  };

  return (
    <>
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
            Search found : &nbsp;
            <Box sx={{ fontWeight: "600" }}>
              {providerData.length} providers
            </Box>
          </Box>
          <Box>
            Sort by :{" "}
            <Select
              value={sortOption}
              onChange={handleSortChange}
              sx={{ height: "2rem" }}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="ratings">Ratings</MenuItem>
            </Select>
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
                    width: "100%",
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
                          {obj.paymentInfo.payment === "done" &&
                            obj.paymentInfo.plan === "pro" && (
                              <img
                                src="/images/plan3.svg"
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                  marginLeft: "1rem",
                                }}
                              />
                            )}
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
                          <Box sx={{ opacity: "0.7", ml: "1.7rem" }}>
                            {obj.reviewcountInfo.count} Reviews
                          </Box>
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

export default RightSidebar;
