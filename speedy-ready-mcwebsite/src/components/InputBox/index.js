import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import React, { useState, useEffect, useRef } from "react";
import { GiPlayButton, GiPauseButton } from "react-icons/gi";
import { GoTextSize } from "react-icons/go";
import { BsFillSkipStartFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import ControlBox from "../ControlBox";

const InputBox = () => {
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

  var countdownFlag = 3;

  function handleClose() {
    setShow(false);
    clearInterval(countRef.current);
  }

  function handlePause() {
    clearInterval(countRef.current);
    setIsPaused(true);
  }

  function handleResume() {
    setIsPaused(false);
  }

  function handleShow() {
    setShowRsvp(true);
    updateWord();
  }

  useEffect(() => {
    let interval = null;
    if (!isPaused) {
      interval = setInterval(() => {
        var tempWords = [];

        if (startIndex < newText.length) {
          for (var i = 0; i < wordsPerGroup; i++) {
            if (startIndex + i < newText.length) {
              tempWords += newText[startIndex + i] + ` `;
            }

            setDisplayText(tempWords);
          }
          incrementStartIndex();
        } else {
          setDisplayText("Finished!");
          setIsPaused(true);
          clearInterval(countRef.current);
        }
      }, 1000 / (wpm / wordsPerGroup / 60));
    } else if (isPaused && countdownFlag !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPaused, startIndex]);

  function startCountdown() {
    function countdown() {
      if (countdownFlag > 0) {
        if (countdownFlag != 0) {
          setDisplayText(countdownFlag);
        }
        countdownFlag--;
      } else if (countdownFlag == 0) {
        setDisplayText("Go!");

        setIsPaused(false);
        clearInterval(secondIntervalVariable);
        clearInterval(countdownId);
      }
    }

    if (countdownFlag > 0) {
      var countdownId = setInterval(function () {
        countdown();
      }, 1000);

      setSecondIntervalVariable(countdownId);
    }
  }

  function updateWord() {
    setStartIndex(0);
    setDisplayText("");

    clearInterval(secondIntervalVariable);
    startCountdown();
  }

  function incrementStartIndex() {
    setStartIndex(
      (startIndex) => parseInt(startIndex) + parseInt(wordsPerGroup)
    );
  }

  useEffect(() => {
    setNewText(text.split(" "));
    console.log(newText);
  }, [text]);

  function handleTextChange(event) {
    const words = event.target.value;
    setText(words);
  }

  function handleWpmChange(event) {
    const tempWpm = event.target.value;
    setWpm(tempWpm);
  }

  function handleWordPerGroupChange(event) {
    var tempWordPerGroup = parseInt(event.target.value);
    setWordsPerGroup(tempWordPerGroup);
  }

  function validateMinMax(e, min, max) {
    const thingToBeValidated = e.target.value;
    if (thingToBeValidated > max || thingToBeValidated < min) {
      alert(`Please enter a number in between ` + min + ` and ` + max);
    }
  }

  function clampMinMax(e, min, max) {
    const thingToBeValidated = e.target.value;
    if (thingToBeValidated > max) {
      return max;
    } else if (thingToBeValidated < min) {
      return min;
    } else return thingToBeValidated;
  }

  function validateAndClampWpm(e, min, max) {
    validateMinMax(e, min, max);
    setWpm(clampMinMax(e, min, max));
  }

  function validateAndClampGrouping(e, min, max) {
    validateMinMax(e, min, max);
    setWordsPerGroup(clampMinMax(e, min, max));
  }






  return (
    <div className="inputBox" id="input-box">
      <h1>Paste your text below and click start to begin!</h1>
      <textarea onChange={handleTextChange} className="text-input-box">
        Paste whatever text you would like to speed read into this box. You can
        also choose how many words you would like displayed at a time, so that
        you can work on expanding your peripheral grouping.
      </textarea>
      <p>Total # of words: {newText.length}</p>
      <br />
      <br />
      <form>
        <p>
          Words Per Minute:&nbsp;
          <input
            type="number"
            inputmode="numeric"
            onBlur={(e) => {
              validateAndClampWpm(e, 100, 1000);
            }}
            value={wpm}
            onChange={handleWpmChange}
            min="100"
            max="1000"
          />
        </p>

        <input
          type="range"
          onChange={handleWpmChange}
          placeholder="140"
          value={wpm}
          min="100"
          max="1000"
          className="slider"
          id="myRange"
        />
        <br />

        <p>
          Words Per Group&nbsp;
          <input
            type="number"
            inputmode="numeric"
            value={wordsPerGroup}
            onChange={handleWordPerGroupChange}
            onBlur={(e) => {
              validateAndClampGrouping(e, 1, 10);
            }}
            min="1"
            max="10"
          />
        </p>
      </form>

      <button onClick={handleShow}>Rapid Sub Visual Presentation</button>
      <br />

      <span
        className="rsvp-text-container"
        style={{ display: showRsvp ? "flex" : "none" }}
      >
        {displayText}
      </span>
      <p>Start Index: {startIndex}</p>
      <br style={{ display: showRsvp ? "flex" : "none" }} />
      

      <ControlBox />

      <button
        onClick={() => (showRsvp ? setShowRsvp(false) : setShowRsvp(true))}
      >
        Flipppity the hiding
      </button>
      <br />

      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="centered-text modal-small">
          {" "}
          {displayText}
          <br />
          {startIndex}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {isPaused ? (
            <Button variant="primary" onClick={handleResume}>
              <GiPlayButton />
            </Button>
          ) : (
            <Button variant="primary" onClick={handlePause}>
              <GiPauseButton />
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InputBox;
