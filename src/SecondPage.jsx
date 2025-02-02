import { useState } from "react";
import { Button, Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ok1 from "./assets/ok.gif";
import ok2 from "./assets/slap.gif";
import ok3 from "./assets/kick.gif";
import ok4 from "./assets/knife.gif";

const SecondPage = () => {
  const [noClicks, setNoClicks] = useState(0);
  const [popupText, setPopupText] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);
  const [showGifPopup, setShowGifPopup] = useState(false);
  const [selectedGif, setSelectedGif] = useState(ok1);

  const [coffeeSpillCount, setCoffeeSpillCount] = useState(1);
  const [slapCount, setSlapCount] = useState(1);
  const [kickCount, setKickCount] = useState(1);
  const [killCount, setKillCount] = useState(1);

  const navigate = useNavigate();

  const handleYes = () => {
    if (noClicks < 3) {
      setPopupText("Is he that bad? You sure you want to punish him? 😏");
      setShowPopup(true);
    } else {
      setShowGifPopup(true);
      setShowPopup(false);
    }
  };

  const handleNo = () => {
    setNoClicks((prev) => prev + 1);

    if (noClicks === 0) {
      setPopupText("Are you sure? 😏");
    } else if (noClicks === 1) {
      setPopupText("Think again, I know you want to! 😉");
    } else if (noClicks === 2) {
      setPopupText("I know you more than urself monuuji😘 Just click Yes love");
    }

    setShowPopup(true);
  };

  const closeGifPopup = () => {
    setShowGifPopup(false);
  };

  const changeGif = (gif) => {
    setSelectedGif(gif);
    if (gif === ok1) setCoffeeSpillCount((prev) => prev + 1);
    else if (gif === ok2) setSlapCount((prev) => prev + 1);
    else if (gif === ok3) setKickCount((prev) => prev + 1);
    else if (gif === ok4) setKillCount((prev) => prev + 1);
  };

  const getPunishmentText = () => {
    if (selectedGif === ok1) return `No. of times you spilled coffee on ur Nish : ${coffeeSpillCount}`;
    if (selectedGif === ok2) return `No. of times you slapped ur Nish : ${slapCount}`;
    if (selectedGif === ok3) return `No. of times you kicked ur Nish : ${kickCount}`;
    if (selectedGif === ok4) return `No. of times you killed ur Nish : ${killCount}`;
  };

  return (
    <Box className="background">
      <Box className="content-box">
        <div className="cute-text">
          The most important part of "Monish", is you, Mohana 💖. Without you, there would have been no "Monish", and Nish 🧑🏻‍💻 would have always been incomplete without you 👉🏻👈🏻. I know Nishant did a bad thing 😞, and it's not easy to forgive him 💔, so let's punish him together 🌚. You with me, Monuu? 💖
        </div>

        <Box className="buttons-container">
          {(noClicks < 3 || popupText === "I know you more than urself monuuji😘 Just click Yes love") && (
            <Button
              variant="contained"
              onClick={handleYes}
              sx={{ backgroundColor: "#ff6b81", color: "white", "&:hover": { backgroundColor: "#ff4757" }, marginRight: "9rem" ,justifyContent: noClicks < 3 ? "space-between" : "center"}}
            >
              Yes
            </Button>
          )}

          {noClicks < 3 && (
            <Button variant="contained" onClick={handleNo} sx={{ backgroundColor: "#576574", color: "white" }}>
              No
            </Button>
          )}

          {/* Popup Modal */}
          <Modal open={showPopup} onClose={() => setShowPopup(false)} className="popup-modal">
            <Box className="popup-box" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", textAlign: "center", minWidth: "300px", maxWidth: "400px" }}>
              <div className="cute-text">{popupText}</div>

              {popupText === "Is he that bad? You sure you want to punish him? 😏" && (
                <Box sx={{ marginTop: "1rem" }}>
                  <Button onClick={() => { setShowGifPopup(true); setShowPopup(false); }} sx={{ backgroundColor: "#ff6b81", color: "white", "&:hover": { backgroundColor: "#ff4757" }, marginRight: "0.5rem" }}>
                    Yes
                  </Button>
                  <Button onClick={() => setShowPopup(false)} sx={{ backgroundColor: "#576574", color: "white" }}>
                    No
                  </Button>
                </Box>
              )}

              {popupText === "I know you more than urself monuuji😘 Just click Yes love" && (
                <Box sx={{ marginTop: "1rem" }}>
                  <Button onClick={() => { setShowGifPopup(true); setShowPopup(false); }} sx={{ backgroundColor: "#ff6b81", color: "white", "&:hover": { backgroundColor: "#ff4757" } }}>
                    Yes
                  </Button>
                </Box>
              )}
            </Box>
          </Modal>

          {/* GIF Popup */}
          <Modal open={showGifPopup} onClose={closeGifPopup} className="gif-popup-modal">
            <Box className="gif-popup-box" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", textAlign: "center", minWidth: "300px", maxWidth: "400px" }}>
              <div className="cute-text">{getPunishmentText()}</div>

              <Box sx={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "1rem" }}>
                <Button variant="contained" onClick={() => changeGif(ok1)}>Coffee Attack</Button>
                <Button variant="contained" onClick={() => changeGif(ok2)}>Slap Him</Button>
                <Button variant="contained" onClick={() => changeGif(ok3)}>Kick Him</Button>
                <Button variant="contained" onClick={() => changeGif(ok4)}>Kill Him😈</Button>
              </Box>

              <img src={selectedGif} alt="Punishment GIF" style={{ width: "100%", height: "auto", borderRadius: "10px" }} />

              <Box>
                <Button onClick={() => changeGif(selectedGif)} sx={{ marginTop: "1rem", backgroundColor: "#ff6b81", color: "white", "&:hover": { backgroundColor: "#ff4757" }, marginRight: "0.5rem" }}>
                  Yes, his mistake was big
                </Button>
                <Button onClick={() => navigate("/third")} sx={{ marginTop: "1rem", backgroundColor: "#576574", color: "white" }}>
                  No, he is cute
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default SecondPage;
