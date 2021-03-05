import React, { useState, COm } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";


const InputBox = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [displayText, setDisplayText] = useState([]);
    const [wpm, setWpm] = useState(250);
    const [wordsPerGroup, setWordsPerGroup] = useState(1);
    const [intervalVariable, setIntervalVariable] = useState(0);
    const [secondIntervalVariable, setSecondIntervalVariable] = useState(0);

    var countdownFlag = 5;

    function handleClose() {
        setShow(false)
        clearInterval(intervalVariable);
    }

    function handleShow() {
        setShow(true);
        updateWord();
    }

    function startCountdown() {
        function countdown() {
            if (countdownFlag >= 0) {
                if (countdownFlag != 0) {
                setDisplayText(countdownFlag)
                }
                countdownFlag--;
            }
            else {
                return;
            }
        }

        if (countdownFlag > 0) {

            var countdownId = setInterval(function () {
                countdown();
            }, 1000);

            setSecondIntervalVariable(countdownId)

        }
    }

    function updateWord() {
        setDisplayText("");
        var startIndex = 0;
        var newText = text.split(" ");
        clearInterval(secondIntervalVariable);
        clearInterval(intervalVariable);

        startCountdown();

        var intervalId = setInterval(function () {

            var tempWords = [];

            if (countdownFlag < 0) {

                if (startIndex < newText.length) {

                    for (var i = 0; i < wordsPerGroup; i++) {

                        if ((startIndex + i) < newText.length) {
                            tempWords += newText[(startIndex + i)] + ` `;
                        }

                    }

                    setDisplayText(tempWords);
                    startIndex += parseInt(wordsPerGroup);
                }

                else {
                    setDisplayText("Finished!")
                }
            }
        }, 1000 / (wpm / wordsPerGroup / 60));

        setIntervalVariable(intervalId);

    }

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
        }

        else if (thingToBeValidated < min) {
            return min;
        }
        else return thingToBeValidated;
    }

    function validateAndClampWpm(e, min, max) {

        validateMinMax(e, min, max);
        setWpm(clampMinMax(e, min, max))
    }


    function validateAndClampGrouping(e, min, max) {

        validateMinMax(e, min, max);
        setWordsPerGroup(clampMinMax(e, min, max))
    }

    return (
        <div className="inputBox" id="input-box" >
            <h1>Just go ahead and paste your thingle-dingle right on up into that there this box</h1>
            <form >
                <input type="text" onChange={handleTextChange}></input>
                <br />
                <br />
                <input type="range" onChange={handleWpmChange} placeholder="140" value={wpm} min="100" max="1000" className="slider" id="myRange" />

                <p>WPM is:&nbsp;
                    <input type="number" inputmode="numeric" onBlur={(e) => { validateAndClampWpm(e, 100, 1000) }} value={wpm} onChange={handleWpmChange} min="100" max="1000" />
                </p>
                <br />
                <p>How many flashers do you want flashed at you per flash?&nbsp;
                    <input type="number" inputmode="numeric" value={wordsPerGroup} onChange={handleWordPerGroupChange} onBlur={(e) => { validateAndClampGrouping(e, 1, 10) }} min="1" max="10" />
                </p>
            </form>

            <button onClick={handleShow}>Click Me If'n your ready to experience the SPEED of READ!</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body className="centered-text modal-small" > {displayText} </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InputBox;