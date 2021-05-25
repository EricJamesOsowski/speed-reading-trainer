import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const InputBox = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState([]);
  const [wpm, setWpm] = useState(250);
  const [wordsPerGroup, setWordsPerGroup] = useState(1);
  const [intervalVariable, setIntervalVariable] = useState(0);
  const [secondIntervalVariable, setSecondIntervalVariable] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [count, setCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [newText, setNewText] = useState([]);
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

  // TODO TODO TODO TODO TODO TODO TODO
  // get handleResume work as expected

  function handleResume() {
    setIsPaused(false);
  }

  function handleShow() {
    
    setShow(true);
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
              //   console.log("Assigning temp-words");
              tempWords += newText[startIndex + i] + ` `;
            }

            setDisplayText(tempWords);
            console.log("words per group is: " + parseInt(wordsPerGroup));

            incrementStartIndex();
          }
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
  // TODO TODO TODO TODO TODO TODO TODOTODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO

  function startCountdown() {
    function countdown() {
      if (countdownFlag > 0) {
        if (countdownFlag != 0) {
          setDisplayText(countdownFlag);
        }
        countdownFlag--;
      } else if (countdownFlag == 0) {
        setDisplayText("Go!");

        console.log("This should fire once");
        setIsPaused(false);
        clearInterval(secondIntervalVariable);
        clearInterval(countdownId);
        // return;
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
    // alert("I have set startindex to : ", startIndex)

    setDisplayText("");

    clearInterval(secondIntervalVariable);
    clearInterval(intervalVariable);
    startCountdown();

    // TODO work useInterval instead of setInterval.
    // thisIsTheTempShit();
  }

  //   function thisIsTheTempShit() {
  //     countRef.current = setInterval(() => {
  //       var tempWords = [];
  //       if (countdownFlag < 0) {

  //         if (startIndex < newText.length) {
  //           for (var i = 0; i < wordsPerGroup; i++) {
  //             if (startIndex + i < newText.length) {
  //             //   console.log("Assigning temp-words");
  //               tempWords += newText[startIndex + i] + ` `;
  //             }

  //             setDisplayText(tempWords);
  //             console.log("words per group is: " + parseInt(wordsPerGroup));

  //             incrementStartIndex();
  //           }
  //         } else {
  //           setDisplayText("Finished!");
  //           setIsPaused(true);
  //           clearInterval(countRef.current);
  //         }
  //       }
  //     }, 1000 / (wpm / wordsPerGroup / 60));
  //   }

  function incrementStartIndex() {
    console.log("Previous start index :", startIndex);
    // await setStartIndex(startIndex + parseInt(wordsPerGroup));

    setStartIndex((startIndex) => startIndex + parseInt(wordsPerGroup));
    console.log("New start index :", startIndex);

    // await setStartIndex(state => ({count: state.count+1}));
    // // execution will only resume here once state has been applied
    // console.log(this.state.count);  // output will be 1
  }

  useEffect(() => {
    setNewText(text.split(" "));
    console.log("newText is: ", newText);
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
      <h1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum mattis pellentesque. Tincidunt tortor aliquam nulla facilisi cras. Enim blandit volutpat maecenas volutpat. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Diam sollicitudin tempor id eu. Egestas diam in arcu cursus. Senectus et netus et malesuada fames ac. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Vitae tortor condimentum lacinia quis vel eros donec ac. Lacus luctus accumsan tortor posuere. Non nisi est sit amet facilisis magna etiam tempor. Quisque non tellus orci ac auctor. Pharetra vel turpis nunc eget. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor.
      </h1>
      <form>
        <input type="text" onChange={handleTextChange}></input>
        <br />
        <br />
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

        <p>
          WPM is:&nbsp;
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

        <br />
        <p>
          How many flashers do you want flashed at you per flash?&nbsp;
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

      <button onClick={handleShow}>
        Click Me If'n your ready to experience the SPEED of READ!
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="centered-text modal-small">
          {" "}
          {displayText}
          <br />
          {startIndex}
          <br />
          {isPaused.toString()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {isPaused ? (
            <Button variant="primary" onClick={handleResume}>
              RESUME FOR THE LOVE OF FUCK
            </Button>
          ) : (
            <Button variant="primary" onClick={handlePause}>
              PAUSE FOR THE LOVE OF FUCK
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InputBox;
