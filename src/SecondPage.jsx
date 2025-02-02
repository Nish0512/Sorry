import { useState, useEffect } from "react";
import { Button, Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import okGif from "./assets/ok.gif"; // Import the GIF from the assets folder

const SecondPage = () => {
  const [noClicks, setNoClicks] = useState(0);
  const [popupText, setPopupText] = useState(""); // Text for popups
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [showGifPopup, setShowGifPopup] = useState(false); // Control GIF popup visibility
  const [showGif, setShowGif] = useState(false); // Control GIF visibility
  const [popupTimeout, setPopupTimeout] = useState(null); // Timeout to hide popup
  const [coffeeSpillCount, setCoffeeSpillCount] = useState(1); // Track coffee spill count
  const [gifPlayed, setGifPlayed] = useState(false); // Flag to track if the GIF was played
  const navigate = useNavigate();

  // Function to handle Yes button click
  const handleYes = () => {
    if (noClicks === 0) {
      // If Yes is clicked directly, show "Are you sure" popup
      setPopupText("Is he that bad? You sure you want to punish him? 😏");
      setShowPopup(true);
    } else {
      setShowGifPopup(true); // Show GIF popup
      setShowPopup(false);
    }
  };

  // Function to handle No button click
  const handleNo = () => {
    setNoClicks((prev) => prev + 1);

    // Handle popups based on the number of "No" clicks
    if (noClicks === 0) {
      setPopupText("Are you sure? 😏");
    } else if (noClicks === 1) {
      setPopupText("Think again, I know you want to! 😉");
    } else if (noClicks === 2) {
      setPopupText("I know you more than urself monuuji😘 Just click Yes love");
    }

    // Show popup for 5 seconds
    setShowPopup(true);

    // Hide the popup after 5 seconds
    if (popupTimeout) {
      clearTimeout(popupTimeout);
    }

    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    setPopupTimeout(timeout);

    // After the 3rd "No", replace the "No" button with the "Yes" button
    if (noClicks === 3) {
      setTimeout(() => {
        setPopupText("");
        setShowPopup(false);
      }, 3000); // Hide the popup after 5 seconds and remove the "No" button
    }
  };

  // Function to handle GIF popup confirmation
  const handleGifPopup = () => {
    setShowGifPopup(true); // Show GIF popup
    setShowPopup(false); // Close the current popup
  };

  // Function to handle closing the GIF popup
  const closeGifPopup = () => {
    setShowGifPopup(false); // Close GIF popup
  };

  // Function to handle "Yes" in GIF popup
  const handleYesInGifPopup = () => {
    setCoffeeSpillCount((prevCount) => prevCount + 1); // Increase the coffee spill count
    setGifPlayed(true); // Mark the GIF as played
  };

  // Function to handle "No" in GIF popup
  const handleNoInGifPopup = () => {
    navigate("/third"); // Just log "No"
  };

  return (
    <Box className="background">
      <Box className="content-box">
        <div className="cute-text">
        The most important part of "Monish", is you, Mohana 💖. Without you, there would have been no "Monish", and Nish 🧑🏻‍💻 would have always been incomplete without you 👉🏻👈🏻. I know Nishant did a bad thing 😞, and it's not easy to forgive him 💔, so let's punish him together 🌚. You with me, Monuu? 💖
        </div>

        <Box className="buttons-container" style={{ position: "relative" }}>
          {noClicks < 3 && (
            <Button
              variant="contained"
              onClick={handleYes}
              sx={{
                backgroundColor: "#ff6b81",
                color: "white",
                "&:hover": { backgroundColor: "#ff4757" },
                marginRight: "9rem",
              }}
            >
              Yes
            </Button>
          )}

          {noClicks < 3 && (
            <Button
              variant="contained"
              onClick={handleNo}
              style={{
                position: "relative",
                backgroundColor: "#576574",
                color: "white",
              }}
            >
              No
            </Button>
          )}

          {/* Display Popups */}
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

              {showGif ? (
                // Show local GIF inside the popup, but only play once
                !gifPlayed ? (
                  <img
                    src={okGif}
                    alt="Punishment GIF"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                    onLoad={() => setGifPlayed(true)} // Mark as played when GIF loads
                  />
                ) : null
              ) : (
                <Box>
                  {/* Popup options only if "Yes" was clicked directly */}
                  {noClicks < 1 && (
                    <>
                      <Button
                        onClick={handleGifPopup}
                        sx={{
                          marginTop: "1rem",
                          backgroundColor: "#576574",
                          color: "white",
                          marginRight: "0.5rem"
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={() => setShowPopup(false)}
                        sx={{
                          backgroundColor: "#ff6b81",
                          color: "white",
                          "&:hover": { backgroundColor: "#ff4757" },
                          marginTop: "1rem",
                        }}
                      >
                        No
                      </Button>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Modal>

          {/* Show GIF in a new popup if Yes is clicked */}
          <Modal
            open={showGifPopup}
            onClose={closeGifPopup}
            className="gif-popup-modal"
          >
            <Box
              className="gif-popup-box"
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
              {/* Display Coffee Spill Count */}
              <div className="coffee-spill-count cute-text">
                No. of times you spilled coffee on ur Nish : {coffeeSpillCount}
              </div>
              {/* Embed the local GIF */}
              <img
                src={okGif}
                alt="Punishment GIF"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
              {/* Buttons in the GIF Popup */}
              <Box>
                <Button
                  onClick={handleYesInGifPopup}
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#ff6b81",
                    color: "white",
                    "&:hover": { backgroundColor: "#ff4757" },
                    marginRight: "0.5rem"
                  }}
                >
                  Yes, his mistake was big
                </Button>
                <Button
                  onClick={handleNoInGifPopup}
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#576574",
                    color: "white",
                  }}
                >
                  No, he is cute
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* After 3rd No click, center Yes button */}
          {noClicks === 3 && (
            <Box
              className="centered-yes buttons-container"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Button
                variant="contained"
                onClick={handleYes}
                sx={{
                  backgroundColor: "#ff6b81",
                  color: "white",
                  "&:hover": { backgroundColor: "#ff4757" },
                  marginBottom: "2.2rem",
                }}
              >
                Yes
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SecondPage;
