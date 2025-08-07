import React from "react";
import { ImagesCS } from "../../../assets/0a-exporter";
import LoadingAnimationCS from "../../../lotties-cs/LoadingAnimationCS";
import { CStartup } from "../cs-context/CSContext";
import "./search-template.style.scss";
export default function SearchTemplate({}) {
  const cstartup = React.useContext(CStartup);
  const { mainSearchTerm, mainSearch, setMainSearchTerm } = cstartup;
  return (
    <div
      style={
        !mainSearchTerm && mainSearch
          ? { height: "70px", position: "relative" }
          : {}
      }
      className={`search-template ${!mainSearch ? "hide-it" : "show-it"}`}
    >
      <div className="s-t-header">
        <button>All</button>
        <div>
          <input
            value={mainSearchTerm}
            onChange={(e) => setMainSearchTerm(e.target.value)}
            placeholder="Search"
          />
          <img src={ImagesCS.search} />
        </div>
      </div>
      <div className={!mainSearchTerm ? "d-none" : "s-t-body"}>
        {!mainSearchTerm ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <LoadingAnimationCS type="no-data" />
          </div>
        ) : (
          <>
            <div className="s-t-b-search-list">
              {[1, 2, 3, 4, 5, 6].map((obj) => (
                <div>
                  <h5>
                    <img src={ImagesCS.canadaFlag} /> Value Name
                  </h5>
                  <p>
                    Instacoins is a financial service that allows you to
                    purchase Bitcoin quickly and safely, from almost anyw here
                    in the world.{" "}
                  </p>
                </div>
              ))}
            </div>
            <div className="s-t-b-others">
              <div className="s-t-b-o-first-image"></div>
              <div className="s-t-b-o-other-image">
                <h6>InstaCryptoPurchase</h6>
                <div className="other-images"></div>
                <div className="more-info">
                  <p>
                    Instacoins is a financial service that allows you to
                    purchase Bitcoin quickly and safely, from almost anywhere in
                    the world. Our simple and secure Bitcoin buying process
                    appeals to those who want to purchase this cryptocurrency
                    without worries or hassle.
                  </p>
                </div>
              </div>
              <div className="s-t-b-o-related">
                <h6>Related Solutions</h6>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
