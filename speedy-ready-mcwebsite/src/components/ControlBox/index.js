import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import React, { useState, useEffect, useRef } from "react";
import { GiPlayButton, GiPauseButton } from "react-icons/gi";
import { GoTextSize } from "react-icons/go";
import { BsFillSkipStartFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";

    
    const ControlBox = () =>  {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(
    "Paste whatever text you would like to speed read into this box. You can also choose how many words you would like displayed at a time, so that you can work on expanding your peripheral grouping."
  );
  const [displayText, setDisplayText] = useState([]);
  const [sliderText, setSliderText] = useState([]);
  const [wpm, setWpm] = useState(250);
  const [wordsPerGroup, setWordsPerGroup] = useState(1);
  const [secondIntervalVariable, setSecondIntervalVariable] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [newText, setNewText] = useState([]);
  const [showRsvp, setShowRsvp] = useState(false);
  const [fontSize, setFontSize] = useState(12);
  const countRef = React.useRef(null);


  function handlePause() {
    clearInterval(countRef.current);
    setIsPaused(true);
  }


  function handleResume() {
    setIsPaused(false);
  }


        function handleResetStart(newText) {
            setStartIndex(0);
            setDisplayText(newText[0]);
          }

          function openFontMenu() {
            alert("You did it!");
          }

          function handlePositionSlider(event) {
            const tempPlace = event.target.value;
            setIsPaused(true);
            setStartIndex(tempPlace);
            setDisplayText(newText[tempPlace]);
          }
        
        



        return (
      <div
        className="rsvp-controller"
        style={{ display: showRsvp ? "flex" : "none" }}
      >
        <button
          className="outlined-button"
          variant="gray"
          onClick={handleResetStart}
        >
          <VscDebugRestart />
        </button>

        {isPaused ? (
          <button
            className="outlined-button"
            variant="gray"
            onClick={handleResume}
          >
            <GiPlayButton />
          </button>
        ) : (
          <button
            className="outlined-button"
            variant="gray"
            onClick={handlePause}
          >
            <GiPauseButton />
          </button>
        )}

        <input
          type="range"
          min="0"
          max={newText.length}
          onChange={handlePositionSlider}
          value={startIndex}
        />

        <button className="outlined-button">
          <GoTextSize onClick={openFontMenu}></GoTextSize>
        </button>
      </div>
      )
}

export default ControlBox;