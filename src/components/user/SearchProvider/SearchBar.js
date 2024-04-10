import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
  Typography,
  Avatar,
  Box,
  Rating,
  TextField,
  Button,
} from "@mui/material";

function SearchBar({ searchQuery, setSearchQuery }) {
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Box style={styles.search}>
        <input
          className="searchbar"
          style={{
            fontSize: "1rem",
            border: "none",
            outline: "none",
            width: "100%",
          }}
          type="text"
          placeholder="Search serviceprovider..."
          value={searchQuery}
          onChange={handleSearchChange}
          // Open the card when input is focused
        />
        <Button size="large" variant="contained" color="primary">
          <FaSearch size={22} />
        </Button>
      </Box>
    </div>
  );
}

export default SearchBar;

const styles = {
  cancelBtn: {
    backgroundColor: "#bc000b",
    float: "Right",
    marginRight: "1rem",
  },

  search: {
    padding: "0.7rem 0.7rem",
    border: "1px solid black",
    width: "55%",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
  },
};
