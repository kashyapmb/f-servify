// import { Box, Grid } from "@mui/material";
// import React, { useEffect } from "react";
// import { MdError, MdVerified } from "react-icons/md";
// import { reviews } from "./reviews";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { useState } from "react";
// import axios from "axios";

// function LeftSidebar({ providerData }) {
//   const [heart, setHeart] = useState(false);
//   const providerId = providerData._id;
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const getFavorite = async () => {
//       const response = await axios.post(
//         "http://localhost:8000/api/utils/isfavorite/",
//         { userId: userId, providerId: providerId }
//       );
//       setHeart(response.data.success);
//     };
//     getFavorite();
//   });

//   const heartClicked = async () => {
//     if (heart) {
//       const response = await axios.post(
//         `http://localhost:8000/api/utils/removefavorite/`,
//         { userId, providerId }
//       );
//       console.log(response);
//     } else {
//       const response = await axios.post(
//         `http://localhost:8000/api/utils/addfavorite/`,
//         { userId, providerId }
//       );
//       console.log(response);
//     }
//     setHeart(!heart);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           pb: "3rem",
//           height: "auto",
//           borderRadius: "1rem",
//           margin: "1rem",

//           /* From https://css.glass */
//           background: "rgba(255, 255, 255, 0.18)",
//           boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//           backdropFilter: "blur(8.6px)",

//           border: "1px solid white",
//         }}
//       >
//         <Box>
//           <Grid container>
//             <Grid
//               item
//               xs={4}
//               sx={{ background: "#e2f0f9", padding: "2rem 1rem 4rem 2rem " }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   flexDirection: "column",
//                 }}
//               >
//                 <img
//                   src={providerData.profilePhoto}
//                   style={{
//                     width: "10rem",
//                     height: "10rem",
//                   }}
//                 />
//                 <Box sx={{ mt: "2rem", fontSize: "1.1rem", display: "flex" }}>
//                   <Box>Completed work : &nbsp;</Box>
//                   <Box>0</Box>
//                 </Box>
//               </Box>
//             </Grid>
//             <Grid
//               item
//               xs={7}
//               sx={{ background: "#ececec", padding: "2rem 1rem 4rem 2rem " }}
//             >
//               <Box sx={{ fontSize: "1.8rem" }}>
//                 {providerData.fname} {providerData.lname}
//               </Box>
//               <Box sx={{ fontSize: "1.3rem", color: "blue" }}>
//                 {providerData.profession}
//               </Box>
//               <Box sx={{ mt: "3rem", fontSize: "1.2rem" }}>
//                 <Box sx={{ fontSize: "1rem", opacity: "0.7" }}>
//                   BASIC INFORMATION{" "}
//                 </Box>
//                 <Box sx={{ mt: "0.2rem", display: "flex" }}>
//                   <Box>Age : &nbsp;</Box>
//                   <Box>{providerData.age}</Box>
//                 </Box>
//                 <Box sx={{ display: "flex" }}>
//                   <Box>Gender : &nbsp;</Box>
//                   <Box>{providerData.gender}</Box>
//                 </Box>
//               </Box>

//               <Box sx={{ mt: "3rem", fontSize: "1.2rem" }}>
//                 <Box sx={{ fontSize: "1rem", opacity: "0.7" }}>
//                   CONTACT INFORMATION{" "}
//                 </Box>
//                 <Box
//                   sx={{ mt: "0.2rem", display: "flex", alignItems: "center" }}
//                 >
//                   <Box>Mobile : &nbsp;</Box>
//                   <Box>+91 {providerData.mobile} &nbsp;</Box>
//                   {providerData.mobileverified ? (
//                     <MdVerified color="green" />
//                   ) : (
//                     <MdError color="red" size={20} />
//                   )}
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Box>E-mail : &nbsp;</Box>
//                   <Box>{providerData.email} &nbsp;</Box>
//                   {providerData.emailverified ? (
//                     <MdVerified color="green" />
//                   ) : (
//                     <MdError color="red" size={20} />
//                   )}
//                 </Box>
//                 <Box sx={{ display: "flex" }}>
//                   <Box>Location : &nbsp;</Box>
//                   <Box>{providerData.location}</Box>
//                 </Box>
//                 <Box sx={{ display: "flex" }}>
//                   <Box>City : &nbsp;</Box>
//                   <Box>{providerData.city}</Box>
//                 </Box>
//               </Box>
//             </Grid>
//             <Grid item xs={1} sx={{ background: "#ececec", pt: "2rem" }}>
//               <Box
//                 sx={{ fontSize: "1.8rem", cursor: "pointer" }}
//                 onClick={heartClicked}
//               >
//                 {heart ? (
//                   <FaHeart color="#e51c53" />
//                 ) : (
//                   <FaRegHeart color="#e51c53" />
//                 )}
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//         <hr />
//         <Box
//           sx={{
//             background: "#ffffff",
//             p: "2rem 0 0 4rem  ",
//             fontSize: "1.3rem",
//           }}
//         >
//           Reviews
//         </Box>
//         {reviews.map((obj, index) => {
//           return (
//             <Box sx={{ mt: "2rem", pl: "4rem" }}>
//               <Box sx={{ display: "flex", gap: "1rem" }}>
//                 <img
//                   src={obj.profileimg}
//                   style={{
//                     width: "3rem",
//                     borderRadius: "50%",
//                   }}
//                 />
//                 <Box>
//                   <Box>
//                     {obj.fname} {obj.lname}
//                   </Box>
//                   <Box>{obj.createdAt}</Box>
//                 </Box>
//               </Box>
//               <Box sx={{ mt: "1rem" }}>{obj.review}</Box>
//             </Box>
//           );
//         })}
//       </Box>
//     </>
//   );
// }

// export default LeftSidebar;

import { Box, Grid, Rating, Button } from "@mui/material";
import React, { useEffect } from "react";
import { MdError, MdVerified } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import ReviewDialog from "./ReviewDialog";

function LeftSidebar({ providerData }) {
  const [heart, setHeart] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewStatus, setReviewStatus] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const providerId = providerData._id;
  const userId = localStorage.getItem("userId");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/reviews/check/${providerId}/${userId}`)
      .then((response) => {
        setReviewStatus(response.data);
      })
      .catch((error) => {
        console.error("Error checking review status:", error);
      });
  }, [providerId, userId]);

  useEffect(() => {
    const getFavorite = async () => {
      const response = await axios.post(
        "http://localhost:8000/api/utils/isfavorite/",
        { userId: userId, providerId: providerId }
      );
      setHeart(response.data.success);
    };

    const getReviews = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/reviews/getReviewswithspecificuser/${providerId}`,
          { userId: userId }
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    getFavorite();
    getReviews();
  }, [userId, providerId]);

  const heartClicked = async () => {
    if (heart) {
      const response = await axios.post(
        `http://localhost:8000/api/utils/removefavorite/`,
        { userId, providerId }
      );
      console.log(response);
    } else {
      const response = await axios.post(
        `http://localhost:8000/api/utils/addfavorite/`,
        { userId, providerId }
      );
      console.log(response);
    }
    setHeart(!heart);
  };

  return (
    <>
      <Box
        sx={{
          pb: "3rem",
          height: "auto",
          borderRadius: "1rem",
          margin: "1rem",

          /* From https://css.glass */
          background: "rgba(255, 255, 255, 0.18)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8.6px)",

          border: "1px solid white",
        }}
      >
        <Box>
          <Grid container>
            <Grid
              item
              xs={4}
              sx={{ background: "#e2f0f9", padding: "2rem 1rem 4rem 2rem " }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={providerData.profilePhoto}
                  style={{
                    width: "10rem",
                    height: "10rem",
                  }}
                />
                <Box sx={{ mt: "2rem", fontSize: "1.1rem", display: "flex" }}>
                  <Box>Completed work : &nbsp;</Box>
                  <Box>0</Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={7}
              sx={{ background: "#ececec", padding: "2rem 1rem 4rem 2rem " }}
            >
              <Box sx={{ fontSize: "1.8rem" }}>
                {providerData.fname} {providerData.lname}
              </Box>
              <Box sx={{ fontSize: "1.3rem", color: "blue" }}>
                {providerData.profession}
              </Box>
              <Box sx={{ mt: "3rem", fontSize: "1.2rem" }}>
                <Box sx={{ fontSize: "1rem", opacity: "0.7" }}>
                  BASIC INFORMATION{" "}
                </Box>
                <Box sx={{ mt: "0.2rem", display: "flex" }}>
                  <Box>Age : &nbsp;</Box>
                  <Box>{providerData.age}</Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box>Gender : &nbsp;</Box>
                  <Box>{providerData.gender}</Box>
                </Box>
              </Box>

              <Box sx={{ mt: "3rem", fontSize: "1.2rem" }}>
                <Box sx={{ fontSize: "1rem", opacity: "0.7" }}>
                  CONTACT INFORMATION{" "}
                </Box>
                <Box
                  sx={{ mt: "0.2rem", display: "flex", alignItems: "center" }}
                >
                  <Box>Mobile : &nbsp;</Box>
                  <Box>+91 {providerData.mobile} &nbsp;</Box>
                  {providerData.mobileverified ? (
                    <MdVerified color="green" />
                  ) : (
                    <MdError color="red" size={20} />
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>E-mail : &nbsp;</Box>
                  <Box>{providerData.email} &nbsp;</Box>
                  {providerData.emailverified ? (
                    <MdVerified color="green" />
                  ) : (
                    <MdError color="red" size={20} />
                  )}
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box>Location : &nbsp;</Box>
                  <Box>{providerData.location}</Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box>City : &nbsp;</Box>
                  <Box>{providerData.city}</Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1} sx={{ background: "#ececec", pt: "2rem" }}>
              <Box
                sx={{ fontSize: "1.8rem", cursor: "pointer" }}
                onClick={heartClicked}
              >
                {heart ? (
                  <FaHeart color="#e51c53" />
                ) : (
                  <FaRegHeart color="#e51c53" />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <hr />
        <Box
          sx={{
            background: "#ffffff",
            p: "2rem 4rem 0 4rem  ",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Reviews
          {reviewStatus === "Reviewed" ? (
            <Button
              variant="contained"
              style={{ float: "right" }}
              onClick={handleDialogOpen}
            >
              Edit Review
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ float: "right" }}
              onClick={handleDialogOpen}
            >
              Give Review
            </Button>
          )}
        </Box>
        {reviews.map((obj, index) => {
          return (
            <Box sx={{ mt: "2rem", p: "0rem 4rem" }}>
              {index > 0 && <hr style={{marginBottom:'2rem'}} />}

              <Box sx={{ display: "flex", gap: "1rem" }}>
                <img
                  src={obj.profileimg}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                  }}
                />
                <Box>
                  <Box sx={{ fontSize: "1.1rem", fontWeight: "600" }}>
                    {obj.fname} {obj.lname}
                  </Box>
                  <Box sx={{ mb: "0.5rem", fontSize: "0.9rem" }}>
                    {obj.createdAt}
                  </Box>
                  <Box>
                    <Rating name="read-only" value={obj.rating} readOnly />
                  </Box>
                  <Box>
                    <Box>{obj.review}</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      <ReviewDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        isEdit={reviewStatus === "Reviewed"}
        providerId={providerId}
        userId={userId}
      />
    </>
  );
}

export default LeftSidebar;
