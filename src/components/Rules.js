import React, { useState } from 'react';
import wonlost from '../images/won-lost.jpg'

export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);

  // Initially we declare popupContent but it is set to null

  let popupContent = null;

  // If we click the Help button (below) then showPopup is set to true and content displayed

  if (showPopup) {
    popupContent = (
      <div className="popup">
          <h2>Rules of Hangman</h2>
          <p>
            <ol>
              <li>Take a look at the word represented by the blank spaces</li>
              <li>Start to guess likely letters by clicking on the keyboard</li>
              <li>A wrong guess will progress the drawing of the gallows</li>
              <li>It will also reduce your guesses remaining by 1</li>
              <li>You have a total of 10 'lives' or incorrect guesses</li>
              <li>Once these have run out, it will be 'game over'</li>
              <li>This will also complete the drawing of the man being hanged</li>
              <li>BUT if you complete the word with guesses remaining you WIN!</li>
              <li>A good tip is to guess common letters to begin with, eg vowels</li>
              <li>You may be able to picture the word once it starts to take shape</li>
            </ol>
          </p>

        {/* If the Close button is clicked then showPopup is set back to false */}

          <button onClick={() => setShowPopup(false)}>Close</button>
          <h4>Example screens for a win and a loss:</h4>
          <img src={wonlost} alt="Final screens for an example win and a loss" />
      </div>
    );
  }


  // When the user clicks the help button, we set setShowPopup to true and display popupContent

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Help</button>
      {popupContent}
    </div>
  );
}