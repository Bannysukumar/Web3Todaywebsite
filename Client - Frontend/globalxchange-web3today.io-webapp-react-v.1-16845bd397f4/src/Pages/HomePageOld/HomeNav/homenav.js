import React, { useState } from "react";
import "./homenav.scss";
import { ImagesCS } from "../../../assets/0a-exporter";

function HomeNav({ sidedisp, setsidedisp, closeicon, setcloseicon }) {
  const [navActive, setNavActive] = useState("All News");

  const Navs = [
    {
      image: ImagesCS.newsico,
      text: "All News",
    },
    {
      image: ImagesCS.editorpicksico,
      text: "Editor's Picks",
    },
    {
      image: ImagesCS.businessico,
      text: "Business",
    },
    {
      image: ImagesCS.technologyico,
      text: "Technology",
    },
    {
      image: ImagesCS.nftico,
      text: "NFT's",
    },
    {
      image: ImagesCS.coinico,
      text: "Coins",
    },
    {
      image: ImagesCS.defiico,
      text: "DeFi",
    },
    {
      image: ImagesCS.gameico,
      text: "Gaming",
    },
    {
      image: ImagesCS.marketico,
      text: "Markets",
    },
    {
      image: ImagesCS.opinionico,
      text: "Opinion",
    },
  ];
  return (
    <>
      <div className="mobilehead">
        <div onClick={() => setsidedisp("block")}>
          <img
            src={ImagesCS.barsimg}
            alt="barsimg"
            style={{ marginLeft: "20px" }}
          />
        </div>
        <div className="mainimg">
          <img src={ImagesCS.sideico} alt="sideico" />
          <p className="maintext">cryptoStartup's</p>
        </div>
        <div></div>
      </div>
      <div className="homebox">
        <p className="headtag">All News</p>
        <p className="headdesc">
          Insights into the biggest events shaping the crypto industry.
        </p>
        <div className="navhead">
          {Navs.map((item) => {
            return (
              <div className="mainnav" onClick={() => setNavActive(item.text)}>
                <div
                  className={
                    "navdata " + (navActive === item.text ? "active" : "")
                  }
                >
                  <img src={item.image} alt="newico" />
                  <p className="navtext">
                    {item.text.split(" ")[0]}&nbsp;{item.text.split(" ")[1]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomeNav;
