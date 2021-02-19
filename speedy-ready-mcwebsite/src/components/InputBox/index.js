import React, { useState, COm } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";


const InputBox = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [wpm, setWpm] = useState(250);

    const handleClose = () => setShow(false);
    var counter = 0;

    function handleShow() {
        setShow(true);
        updateWord();

    }

    function updateWord() {
        counter = 0;
        var newText = text.split(" ");

        setInterval(function () {
            setText(newText[counter])
            counter++;
        }, 1000/(wpm/60));

    }
    

    function handleSubmit() {
        displayWord();
    }

    function handleTextChange(event) {
        const words = event.target.value;
        setText(words);
    }

    function handleWpmChange(event) {
        const wpm = event.target.value;
        setWpm(wpm);
    }

   

    function displayWord() {
        var newText = text.split(" ");

        for (var i = 0; i < newText.length; i++) {
            alert(newText[i]);
        }

    }


    return (
        <div className="inputBox" id="input-box" >
            <h1>Just go ahead and paste your thingle-dingle right on up into that there this box</h1>
            <form onSubmit={handleSubmit} >
                <input type="text" onChange={handleTextChange}></input>
                <br />
                <p>{wpm}</p>
                <p>Text is: {text}</p>


                <input type="range" onChange={handleWpmChange} placeholder="140" value={wpm} min="100" max="1000" class="slider" id="myRange"></input>
                <br />
            </form>
            <button onClick={handleShow}>Click Me If'n your ready to experience the SPEED of READ!</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body> { text } </Modal.Body>
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