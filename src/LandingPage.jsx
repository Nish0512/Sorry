import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import "./App.css";

function LandingPage() {
  const navigate = useNavigate();
  const [noButtonPosition, setNoButtonPosition] = useState({ top: "58.45%", left: "52%" });

  const handleYes = () => {
    navigate("/second");
  };

  const moveNoButton = () => {
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 100);
    setNoButtonPosition({ top: `${randomY}px`, left: `${randomX}px` });
  };

  return (
    <Box className="background">
      <Box className="content-box">
        <Typography className="cute-text">
          Hiee love, I'm Monish, our inner self. 🌸  
          Let’s go on a little tour together, just you and me 💖  
          Would you like to join me on this ride of us? ✨
        </Typography>
        <Box sx={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "20px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff6b81",
              color: "white",
              "&:hover": { backgroundColor: "#ff4757" },
              marginRight: "9rem"
            }}
            onClick={() => handleYes()}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              position: "absolute",
              top: noButtonPosition.top,
              left: noButtonPosition.left,
              backgroundColor: "#576574",
              color: "white",
            }}
            onMouseEnter={moveNoButton}
          >
            No
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LandingPage;