import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdError, MdOutlineReviews, MdVerified } from "react-icons/md";

function UserChanges() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/getAllUserEditedData"
        );
        console.log(response.data.savedUser);
        setUsers(response.data.savedUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);
  if (loading) return <h3>Loading....</h3>;
  return (
    <>
      <Box>
        <h2>Users who edited their details</h2>
      </Box>
      <Box sx={{ mt: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {users &&
          users.map((obj, index) => {
            return (
              <Box
                sx={{
                  padding: "1rem",
                  width: "40%",
                  border: "1px solid black",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  transition: "0.5s",
                  ":hover": {
                    boxShadow: "5px 5px 5px",
                  },
                }}
                // onClick={() => clickedServiceProvider(obj)}
              >
                {/* img, name and profession  */}
                <Box sx={{ display: "flex" }}>
                  <Box>
                    <img
                      src={obj.profilePhoto}
                      style={{
                        width: "6rem",
                        height: "6rem",
                        border: "1px solid black",
                        borderRadius: "1rem",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      margin: "0 1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <Box sx={{ fontSize: "0.8rem" }}>{obj._id}</Box>
                    <Box sx={{ fontSize: "1.1rem" }}>
                      {obj.fname} {obj.lname}
                    </Box>
                    <Box sx={{ fontWeight: "600" }}>{obj.email}</Box>
                    <Box sx={{ fontWeight: "600" }}>
                      {"+"}
                      {obj.mobile}
                    </Box>
                    <Box>{obj.address}</Box>
                    <Box>{obj.city}</Box>
                    <Box>{obj.created}</Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: "1rem", mt: "1rem" }}>
                  <Button variant="contained" sx={{ background: "green" }}>
                    OK
                  </Button>
                  <Button variant="contained" sx={{ background: "#b9186d" }}>
                    Block
                  </Button>
                </Box>
              </Box>
            );
          })}
      </Box>
    </>
  );
}

export default UserChanges;
