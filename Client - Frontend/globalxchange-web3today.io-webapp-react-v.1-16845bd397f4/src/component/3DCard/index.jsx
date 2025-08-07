import React from "react";
import "./3dcard.scss";

const Spin3DCard = ({ front, back, image }) => {
  return (
    <div class="card">
      <div class="card-front">
        <h3>{front}</h3>
      </div>
      <div class="card-back">
        <h4>{front}</h4>
        <p>{back}</p>
        {image && <img src={image} atl="image" />}
      </div>
    </div>
  );
};

export default Spin3DCard;
