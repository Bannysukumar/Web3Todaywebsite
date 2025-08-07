import React, { useEffect, useState } from "react";
import "./homepage.scss";
import HomeNav from "./HomeNav/homenav";
import Sidenav from "./HomeSideNav/homesidenav";
import { ImagesCS } from "../../assets/0a-exporter";
import { useHistory } from "react-router-dom";

const articles = [
  {
    img: ImagesCS.articleico,
    title:
      "Crypto Bank SEBA Launches New Service for Ethereum NFTs Like Bored Apes, CryptoPunks",
    desc: "Bored Apes are coming to Zug. SEBA bank, a crypto-friendly bank based in Switzerland, has added an NFT custody solution that gives customers the ability to hold well-known NFTs without managin...",
    crumb: "NFT's",
    author: "Alys Key",
    date: "Oct 28, 2022",
  },
  {
    img: ImagesCS.dogeico,
    title: "Dogecoin Joins Ethereum in Double-Digit Gains as Crypto Rallies",
    desc: "Like a dog with two tails. Dogecoin and Shiba Inu have staged impressive rallies this morning. As the cryptocurrency market stages a strong recovery following last week’s selloff, meme coins S...",
    crumb: "Markets",
    author: "Sujith Somraaj",
    date: "Oct 28, 2022",
  },
  {
    img: ImagesCS.bullishico,
    title:
      "Circle Bullish on EU Growth, Regulators Turn Attention to Developing DeFi Rules",
    desc: "Recent progress on the European Union’s proposed Markets in Crypto Assets (MiCA) law has made stablecoin issuer Circle bullish on growth in the European Union. Earlier this month, EU lawmakers...",
    crumb: "Coins",
    author: "Stacy Elliott",
    date: "Oct 28, 2022",
  },
];
function Homepage() {
  const [sidedisp, setsidedisp] = useState("none");
  const [closeicon, setcloseicon] = useState("none");

  const history = useHistory();

  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1000) {
        setsidedisp("block");
      } else {
        setsidedisp("none");
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <>
      <div className="mainpagearticle">
        <div>
          <Sidenav
            sidedisp={sidedisp}
            setsidedisp={setsidedisp}
            closeicon={closeicon}
            setcloseicon={setcloseicon}
          />
        </div>
        <div>
          <HomeNav
            sidedisp={sidedisp}
            setsidedisp={setsidedisp}
            closeicon={closeicon}
            setcloseicon={setcloseicon}
          />
          <hr className="hrtag" />
          <div className="bgm">
            <div className="artdisp">
              <div className="verticaldisp">
                <p className="datetext">Today</p>
                <div className="rect"></div>
                <div className="vl"></div>
              </div>
              <div>
                {articles.map((item) => {
                  return (
                    <div
                      className="thearticle-data"
                      onClick={() => history.push("/articles")}
                    >
                      <div>
                        <img
                          src={item.img}
                          alt="article"
                          className="imgarticle"
                        />
                      </div>
                      <div className="articletext">
                        <p className="articlehead">{item.title}</p>
                        <p className="articledesc">{item.desc}</p>
                        <div className="crumbsdata">
                          <p className="breadcrumbs">
                            Feed&nbsp;
                            <span>
                              <img
                                src={ImagesCS.rightarrowico}
                                alt="rightarrow"
                                width="5px"
                              />
                              &nbsp;
                            </span>
                            {item.crumb}
                          </p>
                          <p className="readtime">
                            <span>
                              <img src={ImagesCS.timerico} alt="timeico" />
                            </span>
                            {/* &nbsp;2 min read */}
                          </p>
                        </div>
                        <div className="authordetail">
                          <div className="authormsg">
                            <p className="authorname">{item.author}</p>
                            <li className="authordate">{item.date}</li>
                          </div>
                          <div>
                            <img
                              src={ImagesCS.favouriteico}
                              alt="favouriteico"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
