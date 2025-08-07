import React from "react";
import { ImagesCS } from "../../../assets/0a-exporter";

export default function CompanyRecommendationCard() {
  return (
    <div className="company-rec-card">
      <div className="c-r-c-left">
        <div>
          <img src={ImagesCS.brainLogo} />
        </div>
      </div>
      <div className="c-r-c-right">
        <div className="c-r-c-right-wrapper">
          <h6>Brain</h6>
          <p>Business Optimized Storage</p>
          <div>
            <button>Learn</button>
            <button>Get</button>
          </div>
        </div>
      </div>
    </div>
  );
}
