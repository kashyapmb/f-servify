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

function SearchBar({ searchQuery, setSearchQuery, userId }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [isCardOpen, setCardOpen] = useState(false); // Manage card visibility
  const cardRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/search/getallSearch",
          { userId: userId }
        );
        setSearchHistory(response.data);
      } catch (error) {
        console.error("Error retrieving search history:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSearchClick = async () => {
    if (!searchQuery.trim()) {
      // Check if searchQuery is empty or contains only whitespace characters
      alert("Please enter a search query");
      return; // Exit the function early
    }
    try {
      await axios.post("http://localhost:8000/api/search/saveSearch", {
        userId: userId,
        searchQuery,
      });
      console.log("Search saved successfully!");
    } catch (error) {
      console.error("Error saving search:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.post("http://localhost:8000/api/search/clearall", {
        userId: userId,
      });
      console.log("Search history cleared successfully!");
      setSearchHistory([]); // Clear search history from state
    } catch (error) {
      console.error("Error clearing search history:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      await axios.post("http://localhost:8000/api/search/deleteSearch", {
        userId: userId,
        searchIndex: index,
      });
      setSearchHistory((prevSearchHistory) =>
        prevSearchHistory.filter((_, i) => i !== index)
      );
      console.log("Search entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting search entry:", error);
    }
  };

  const handleSearchHistoryClick = (search) => {
    setSearchQuery(search);
    setCardOpen(false); // Close the card after clicking on search history
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setCardOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          placeholder="Search services..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setCardOpen(true)} // Open the card when input is focused
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
        >
          <FaSearch size={22} />
        </Button>
      </Box>

      {/* {isCardOpen && ( // Render card only when isCardOpen is true
        <Card
          ref={cardRef}
          sx={{
            width: "60%",
            border: "1px solid #1976d2",
            marginTop: "0.4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.1rem 1rem",
              fontSize: "0.8rem",
            }}
          >
            <div> Recent searches</div>
            <Button
              style={{ cursor: "pointer", float: "right" }}
              onClick={handleClearAll}
            >
              Clear all
            </Button>
          </div>
          {searchHistory.map((search, index) => (
            <Box key={index}>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.1rem 1rem",
                  ":hover": {
                    background: "#f5f5f5",
                  },
                }}
              >
                <Box
                  onClick={() => handleSearchHistoryClick(search)}
                  sx={{ width: "100%" }}
                >
                  <span>{search}</span>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Card>
      )} */}
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
