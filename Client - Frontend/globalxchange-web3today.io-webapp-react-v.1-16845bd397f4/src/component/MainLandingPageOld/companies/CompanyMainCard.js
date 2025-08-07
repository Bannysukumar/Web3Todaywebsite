import React from "react";

export default function CompanyMainCard({color}) {
  return (
    <div  className="WAPPs-main-card">
      <div style={{backgroundColor: color}} className="c-m-c-above"></div>
      <div className="c-m-c-below">
        <h5>Brain</h5>
        <div>
          <p>Brain.Stream is a data provenance platform that allows users to create anonymous virtual environments </p>
        </div>
        <h6>
          <button>Learn</button>
          <button>Get</button>
        </h6>
      </div>
    </div>
  );
}
