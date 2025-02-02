import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Modal,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const ThirdPage = () => {
  const [showPopup, setShowPopup] = useState(false); // Control angry message popup visibility
  const [showVideoPopup, setShowVideoPopup] = useState(false); // Control video popup visibility
  const [showLove, setShowLove] = useState(false); // Control the love emojis visibility
  const [popupText, setPopupText] = useState(""); // Text for the angry popup
  const [popupTimeout, setPopupTimeout] = useState(null); // Timeout to hide angry popup
  const [hearts, setHearts] = useState([]); // Store the heart emojis positions
  const navigate = useNavigate();

  // Function to handle No button click (Navigate to next page)
  const handleNo = () => {
    handleNoInPopup(); // Show popup and handle navigation
  };

  // Function to handle Yes button click (Show video popup)
  const handleYes = () => {
    setShowPopup(false); // Close the angry message popup
    setShowVideoPopup(true); // Open the video popup
  };

  // Function to handle No button click in the angry popup
  const handleNoInPopup = () => {
    setPopupText(
      "You still angry on him? 😢 He is just a cute little boy who loves you, please forgive him 👉🏻👈🏻💖"
    );
    setShowPopup(true);

    // Hide the popup after 5 seconds
    if (popupTimeout) {
      clearTimeout(popupTimeout);
    }

    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 5000);
    setPopupTimeout(timeout);
  };

  // Function to generate heart emojis randomly on screen
  const generateHearts = () => {
    const heartColors = ["#FF0000", "#FF69B4", "#0000FF"]; // Red, Pink, Blue
    const newHearts = [];
    for (let i = 0; i < 50; i++) {
      const heart = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        size: Math.random() * 30 + 20, // Random size for hearts
      };
      newHearts.push(heart);
    }
    setHearts(newHearts);
  };

  // Function to show love (trigger heart emojis)
  const handleShowLove = () => {
    setShowLove(true);
    generateHearts(); // Generate hearts when clicked
  };

  return (
    <Box className="background">
      <Box className="content-box">
        <div className="cute-text">
          Well, I hope your anger will be a bit less now 😊, and I know Nish
          wouldn't have told you this after the meet ended yesterday 😔, but he
          felt bad, very very bad 😭, and he wants to tell you something...
          Would you like to listen to his heart? 💖
        </div>

        <Box className="buttons-container">
          <Button
            variant="contained"
            onClick={handleYes}
            sx={{
              backgroundColor: "#ff6b81",
              color: "white",
              "&:hover": { backgroundColor: "#ff4757" },
              marginRight: "1rem",
            }}
          >
            Yes
          </Button>

          <Button
            variant="contained"
            onClick={handleNo}
            sx={{
              backgroundColor: "#576574",
              color: "white",
              "&:hover": { backgroundColor: "#2f3640" },
            }}
          >
            No
          </Button>
        </Box>

        {/* Show Popup with Angry Message */}
        <Modal
          open={showPopup}
          onClose={() => setShowPopup(false)}
          className="popup-modal"
        >
          <Box
            className="popup-box"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "40px", // Adjust padding as needed
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              width: "auto",
              minWidth: "300px", // Adjust width as needed
              maxWidth: "400px",
            }}
          >
            <div className="cute-text">{popupText}</div>
            <Box className="buttons-container">
              <Button
                variant="contained"
                onClick={() => setShowPopup(false)}
                sx={{
                  backgroundColor: "#ff6b81",
                  color: "white",
                  "&:hover": { backgroundColor: "#ff4757" },
                  marginRight: "1rem",
                }}
              >
                Oki 💙
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>

      {/* Show Video Popup with MUI CardMedia */}
      <Modal
        open={showVideoPopup}
        onClose={() => setShowVideoPopup(false)}
        className="popup-modal"
      >
        <Box
          className="popup-box"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            width: "75%", // 75% width of the screen
            height: "75vh", // 75% height of the viewport
            minWidth: "600px", // Minimum width to make it large enough
            maxWidth: "900px", // Optional: You can limit the maximum width
            maxHeight: "85vh", // Optional: Limit the maximum height if needed
            display: "flex", // Use flexbox to align content
            flexDirection: "column", // Align items vertically
            justifyContent: "space-between", // Space between content and button
          }}
        >
          <iframe
            src="https://drive.google.com/file/d/1OvVvGIU6YN6CbeNLelR1wmV-0mNgnvLj/preview"
            width="100%"
            height="80%" // Use 80% of the modal height for the video
            frameBorder="0"
            allow="autoplay; encrypted-media"
          ></iframe>
          <Box className="buttons-container" sx={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              onClick={handleShowLove}
              sx={{
                backgroundColor: "#ff6b81",
                color: "white",
                "&:hover": { backgroundColor: "#ff4757" },
                width: "100%", // Ensure the button takes the full width of the box
              }}
            >
              Show Love 💖✨
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Show Love Heart Emojis */}
      {showLove && (
        <Box
          className="hearts-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
          }}
        >
          {hearts.map((heart, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${heart.x}px`,
                top: `${heart.y}px`,
                fontSize: `${heart.size}px`,
                color: heart.color,
                opacity: 0.7,
                animation: "move-heart 3s ease-in-out infinite",
              }}
            >
              ❤️
            </div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ThirdPage;
