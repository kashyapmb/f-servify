import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Button,
  TextField, // Import TextField from MUI
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import LeftSidebar from "./UserHomepage/LeftSidebar";
import { imageDb } from "../firebaseImageupload/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { cities } from "../../data/cities";
import "./UserProfile.css";
import { ContactlessOutlined } from "@mui/icons-material";

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState("");
  const [edit, setEdit] = useState(false); // State to manage edit mode
  const [editedUser, setEditedUser] = useState({});
  const [editedUser1, setEditedUser1] = useState({});
  const [img, setImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/getone/${userId}`
      );
      setUser(response.data);
      setEditedUser(response.data); // Initialize editedUser state with fetched data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("now updated", editedUser);
  }, [editedUser]);

  useEffect(() => {
    try {
      const sendDetails = async () => {
        const response = await axios.put(
          `http://localhost:8000/api/user/updateDetails/${userId}`,
          editedUser1
        );
        console.log(response);
      };
      const sendDetailsUserEdited = async () => {
        try {
          const response = await axios.put(
            `http://localhost:8000/api/admin/userediteddata`,
            editedUser1
          );
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      };
      sendDetails();
      sendDetailsUserEdited();
    } catch (error) {
      console.log(error);
    }
  }, [editedUser1]);

  const handleEdit = () => {
    setEdit(true);
  };

  const validateMobile = async (mobile) => {
    return /^\d{10}$/.test(mobile);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickImage = () => {
    document.getElementById("fileInput").click();
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageforUpload, setSelectedImageforUpload] = useState(null);
  const imageInputHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      setSelectedImageforUpload(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = function (e) {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    const storageRef = ref(imageDb, `userImages/${uuidv4()}`);
    await uploadBytes(storageRef, selectedImageforUpload);

    const imageUrl = await getDownloadURL(storageRef);
    console.log("Uploaded Image URL:", imageUrl);
    return imageUrl;
  };

  const handleUpdate = async () => {
    const { fname, lname, mobile, city, address } = editedUser;
    if (fname && lname && mobile && city && address) {
      if (await validateMobile(mobile)) {
        if (selectedImage) {
          console.log("Called");
          const imageUrl = await uploadImage();

          const updatedUser = {
            ...editedUser,
            profilePhoto: imageUrl.toString(),
          };

          setEditedUser1(updatedUser);
        } else {
          updateDetailINDatabase(editedUser);
        }

        setEdit(false);
        window.location.reload();
      } else {
        alert("Enter valid Mobile Number");
      }
    } else {
      alert("Enter all information");
    }
  };

  const updateDetailINDatabase = async (updatedUser) => {
    try {
      console.log("This come", updatedUser);
      const response = await axios.put(
        `http://localhost:8000/api/user/updateDetails/${userId}`,
        updatedUser
      );
      console.log(response);
      const res = await axios.post(
        `http://localhost:8000/api/admin/userediteddata`,
        updatedUser
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        mt: "3rem",
      }}
    >
      <Box
        style={{
          width: "40%",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8.6px)",
        }}
      >
        <Box
          sx={{ fontSize: "1.5rem", textDecoration: "underline", mb: "2rem" }}
        >
          Profile
        </Box>
        {edit ? (
          <Box>
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box
                className="container_image"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClickImage}
              >
                {isHovered && (
                  <img
                    src="/images/profileAnotherImage.jpg"
                    alt="Image 2"
                    className="upper_image"
                  />
                )}
                <img
                  className="bottom_image"
                  src={selectedImage ? selectedImage : user.profilePhoto}
                />
                <input
                  id="fileInput"
                  type="file"
                  onChange={imageInputHandler}
                  style={{ display: "none" }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  fontSize: "1.5rem",
                }}
              >
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    value={editedUser.fname}
                    onChange={inputHandler}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    value={editedUser.lname}
                    onChange={inputHandler}
                  />
                </Box>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  value={editedUser.mobile}
                  onChange={inputHandler}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={editedUser.address}
                  onChange={inputHandler}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={editedUser.city}
                  onChange={inputHandler}
                />
              </Box>
            </Box>
            <Box
              sx={{
                mt: "3rem",
                display: "flex",
                justifyContent: "center",
                fontSize: "1.4rem",
                cursor: "pointer",
                border: "1px solid black",
                transition: "0.5s",
                ":hover": { background: "#2962ff", color: "white" },
              }}
              onClick={handleUpdate}
            >
              Update
            </Box>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: "flex", gap: "3rem" }}>
              <img
                src={user.profilePhoto}
                style={{
                  width: "10rem",
                  height: "10rem",
                  border: "1px solid black",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  fontSize: "1.5rem",
                }}
              >
                <Box>
                  {user.fname} {user.lname}
                </Box>
                <Box>Mobile : {user.mobile}</Box>
                <Box>E-mail : {user.email}</Box>
                <Box sx={{ display: "flex" }}>
                  Address :&nbsp;
                  {user.address ? (
                    user.address
                  ) : (
                    <Box sx={{ opacity: "0.6" }}>not given</Box>
                  )}
                </Box>
                <Box sx={{ display: "flex" }}>
                  City :&nbsp;
                  {user.city ? (
                    user.city
                  ) : (
                    <Box sx={{ opacity: "0.6" }}>not given</Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: "3rem",
                display: "flex",
                justifyContent: "center",
                fontSize: "1.4rem",
                cursor: "pointer",
                border: "1px solid black",
                transition: "0.5s",
                ":hover": { background: "#2962ff", color: "white" },
              }}
              onClick={handleEdit}
            >
              Edit
            </Box>
          </Box>
        )}
        {/* <Card style={styles.cardprofile}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="App">
              {editable && (
                <>
                  <input
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  <button onClick={handleClick}>Upload</button>
                  <button onClick={handleDelete}>Remove Image</button>
                </>
              )}
              {imageUrl && (
                <div>
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    height="200px"
                    width="200px"
                  />
                </div>
              )}
            </div>
            <div
              variant="h5"
              style={{ fontSize: "2.5rem", marginLeft: "1rem" }}
            >
              {editable ? (
                <TextField
                  id="outlined-basic"
                  label="first name"
                  variant="outlined"
                  name="fname"
                  value={editedUser.fname}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              ) : (
                user.fname
              )}
            </div>
            <div
              variant="h5"
              style={{ fontSize: "2.5rem", marginLeft: "1rem" }}
            >
              {editable ? (
                <TextField
                  id="outlined-basic"
                  label="last name"
                  variant="outlined"
                  name="lname"
                  value={editedUser.lname}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              ) : (
                user.lname
              )}
            </div>
          </div>
          <div style={styles.updatediv}>
            {editable ? (
              <TextField
                fullWidth
                id="outlined-basic"
                label="email"
                variant="outlined"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                style={styles.inputField}
                error={emailError !== ""}
                helperText={emailError}
              />
            ) : (
              <div variant="h5" style={styles.content}>
                {user.email}
              </div>
            )}
          </div>

          <div style={styles.updatediv}>
            {editable ? (
              <TextField
                fullWidth
                id="outlined-basic"
                label="mobile"
                variant="outlined"
                name="mobile"
                value={editedUser.mobile}
                onChange={handleInputChange}
                style={styles.inputField}
                error={mobileError !== ""}
                helperText={mobileError}
              />
            ) : (
              <div variant="h5" style={styles.content}>
                {user.mobile}
              </div>
            )}
          </div>
          <div style={styles.updatediv}>
            {editable ? (
              <TextField
                fullWidth
                id="outlined-basic"
                label="address"
                variant="outlined"
                name="address"
                value={editedUser.address}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            ) : (
              <div variant="h5" style={styles.content}>
                {user.address}
              </div>
            )}
          </div>
          <div style={styles.updatediv}>
            {editable ? (
              <div>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editedUser.city}
                  label="City"
                  name="city"
                  onChange={handleInputChange}
                >
                  {cities.map((obj) => {
                    return <MenuItem value={obj.value}>{obj.value}</MenuItem>;
                  })}
                </Select>
              </div>
            ) : (
              <div variant="h5" style={styles.content}>
                {user.city}
              </div>
            )}
          </div>

          <Button
            style={styles.updatebtn}
            className="acceptedBtn"
            variant="contained"
            color="primary"
            onClick={editable ? handleUpdate : handleEdit}
          >
            {editable ? "Update" : "Edit"}
          </Button>
        </Card> */}
      </Box>
    </Box>
  );
}

export default UserProfile;
