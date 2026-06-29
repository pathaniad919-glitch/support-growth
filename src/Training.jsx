import React from "react";
import "./Training.css";
function Training() {
  return (
    <div className="training-page">
      <h1>S&G Meta Ads Training Program</h1>
      <p>
        Welcome to your first training session. Watch carefully and make proper notes.
      </p>

      <div className="video-wrapper">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/n0aDkEbelgg"
          title="S&G Training Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="training-notes">
        <h3>Important Instructions:</h3>
        <ul>
          <li>Watch the full session carefully</li>
          <li>Make proper notes</li>
          <li>Practice after session</li>
          <li>Next training link will be shared separately</li>
        </ul>
      </div>
    </div>
  );
}

export default Training;