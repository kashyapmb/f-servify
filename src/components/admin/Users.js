import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdError, MdOutlineReviews, MdVerified } from "react-icons/md";

function Users() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/getall"
        );
        console.log(response.data);
        setUsers(response.data);
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
        <h2>Users</h2>
      </Box>
      <Box sx={{ mt: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {users.map((obj, index) => {
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
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default Users;
