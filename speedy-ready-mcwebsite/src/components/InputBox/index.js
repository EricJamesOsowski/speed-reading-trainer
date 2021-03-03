import React, { useState, COm } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";


const InputBox = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [DisplayText, setDisplayText] = useState([]);
    const [wpm, setWpm] = useState(250);
    const [wordsPerGroup, setWordsPerGroup] = useState(1);
    const [intervalVariable, setIntervalVariable] = useState(0);


    //const handleClose = () => setShow(false);
    function handleClose() {
        setShow(false)
        clearInterval(intervalVariable);
    }


    function handleShow() {
        setShow(true);
        updateWord();
    }


    function updateWord() {
        var startIndex = 0;
        var newText = text.split(" ");
        clearInterval(intervalVariable);

        var intervalId = setInterval(function () {
            
            var tempWords = [];

            if (startIndex < newText.length) {


                for (var i = 0; i < wordsPerGroup; i++) {
                    //console.log(`Start index + i = : ` + (startIndex + i));

                    if ((startIndex + i) < newText.length) {
                        tempWords += newText[(startIndex + i)] + ` `;
                        console.log(tempWords)
                    }
                }

                setDisplayText(tempWords);
                startIndex += parseInt(wordsPerGroup);
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
                    <input type="number" onBlur={(e) => { validateAndClampWpm(e, 100, 1000) }} value={wpm} onChange={handleWpmChange} min="100" max="1000" />
                </p>
                <br />
                <p>How many flashers do you want flashed at you per flash?&nbsp;
                    <input type="number" value={wordsPerGroup} onChange={handleWordPerGroupChange} onBlur={(e) => { validateAndClampGrouping(e, 1, 10) }} min="1" max="10" />
                </p>
            </form>

            <button onClick={handleShow}>Click Me If'n your ready to experience the SPEED of READ!</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body> {DisplayText} </Modal.Body>
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