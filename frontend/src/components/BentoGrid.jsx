import React from "react";
import "../styles/BentoGrid.css";
import bento3 from "../assets/bento3.avif";
import infinitelogo from "../assets/infinite.png";
import pexel from "../assets/pexel.jpg";
import ThoughtBento from "./ThoughtBento";

const BentoGrid = () => {
  return (
    <div className="home-bento">
      <div className="bento-left">
        <div className="left-up">
          <h2>Develop Creative Ideas</h2>
        </div>
        <div className="left-down">
          <img src={bento3} alt="" />
        </div>
      </div>

      <div className="bento-center">
        <div className="center-up">
          <div className="center-up-left">
            <img src={infinitelogo} alt="" />
          </div>
          <div className="center-up-right">
            <h1>Real Design for Real People</h1>
          </div>
        </div>

        <div className="center-center">
          <img src={pexel} alt="" />
        </div>

        <div className="center-down">
          <div className="center-down-left">
            <ThoughtBento />
          </div>
          <div className="center-down-right">
            <h3>
              Own your strength,
              <br />
              Own You
            </h3>
          </div>
        </div>
      </div>

      <div className="bento-right">
        <div className="right-up">
          <h2>
            More about Notezen and <br />
            Future Enhancements
          </h2>
        </div>
        <div className="right-down">
          <button className="right-down-btn">
            <a href="/about">Let`s go →</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
