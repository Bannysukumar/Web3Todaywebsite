import React from "react";
import "./companies.style.scss";
import CompanyMainCard from "./CompanyMainCard";
import CompanyRecommendationCard from "./CompanyRecommendationCard";
export default function WAPPs() {
  return (
    <div className="c-s-startup">
      <div className="c-s-s-main-cards-wrapper">
        <div className="c-s-s-m-c-header">
          <h3>Canada’s Crypto Startups</h3>
        </div>
        <div className="c-s-s-m-c-body">
          {["#948A8A", "#bd4444", "#212121", "#212121", "#212121"].map(
            (obj) => (
              <CompanyMainCard color={obj} />
            )
          )}
        </div>
      </div>
      <div className="c-s-s-recommended-cards-wrapper">
        <div className="c-s-s-r-c-header">
          <h5>Recommended For Your Business</h5>
        </div>
        <div className="c-s-s-r-c-body">
          {[1, 2, 2, 2, 2].map((obj) => (
            <CompanyRecommendationCard />
          ))}
        </div>
      </div>
    </div>
  );
}
