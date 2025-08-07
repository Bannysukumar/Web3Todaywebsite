import React from "react";
import "./articles.scss";
import Sidenav from "../HomePageOld/HomeSideNav/homesidenav";
import { ImagesCS } from "../../assets/0a-exporter";

function Articles() {
  const item = {
    img: ImagesCS.dogeico,
    title: "Dogecoin Joins Ethereum in Double-Digit Gains as Crypto Rallies",
    desc: "Like a dog with two tails. Dogecoin and Shiba Inu have staged impressive rallies this morning. As the cryptocurrency market stages a strong recovery following last week’s selloff, meme coins S...",
    crumb: "Markets",
    author: "Sujith Somraaj",
    date: "Oct 28, 2022",
  };

  const thecoins = [
    {
      coinname: "Bitcoin",
      coinsymbol: "BTC",
      coinchart: ImagesCS.chartico,
      coinimage: ImagesCS.bitcoinico,
      price: "$20,274.93",
      change: "-2.21%",
    },
    {
      coinname: "Ethereum",
      coinsymbol: "ETH",
      coinchart: ImagesCS.ethchartico,
      coinimage: ImagesCS.ethico,
      price: "$1,514.40",
      change: "-2.70%",
    },
    {
      coinname: "Binance Coin",
      coinsymbol: "BNB",
      coinchart: ImagesCS.binancechartico,
      coinimage: ImagesCS.binanceico,
      price: "$287.43",
      change: "-1.35%",
    },
    {
      coinname: "Bitcoin",
      coinsymbol: "BTC",
      coinchart: ImagesCS.chartico,
      coinimage: ImagesCS.bitcoinico,
      price: "$20,274.93",
      change: "-2.21%",
    },
    {
      coinname: "Ethereum",
      coinsymbol: "ETH",
      coinchart: ImagesCS.ethchartico,
      coinimage: ImagesCS.ethico,
      price: "$1,514.40",
      change: "-2.70%",
    },
  ];
  return (
    <div className="mainpagearticle">
      <div>
        <Sidenav />
      </div>
      <div className="thebgm">
        <div className="coinsdata theheight">
          {thecoins.map((item) => {
            return (
              <div className="coinsdata chartdisp">
                <div>
                  <img src={item.coinimage} alt="bitcoinico" />
                </div>
                <div className="thecoins">
                  <p className="coinsty">
                    {item.coinname.split(" ")[0]}&nbsp;
                    {item.coinname.split(" ")[1]}
                  </p>
                  <p className="coinsym">{item.coinsymbol}(24h)</p>
                </div>
                <div className="thecoins">
                  <img src={item.coinchart} alt="chartico" />
                </div>
                <div className="thecoins">
                  <p className="coinrate">{item.price}</p>
                  <p className="coinchange">{item.change}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="thepagecrumb">
          <p className="breadcrumbs" style={{ marginTop: "50px" }}>
            <img src={ImagesCS.sideico} alt="rightarrow" width="20px" />
            &nbsp;
            <span>
              <img src={ImagesCS.rightarrowico} alt="rightarrow" width="5px" />
              &nbsp;
            </span>
            News&nbsp;
            <span>
              <img src={ImagesCS.rightarrowico} alt="rightarrow" width="5px" />
              &nbsp;
            </span>
            NFT's
          </p>
          <hr />
          <div>
            <p className="art-title">
              Todd McFarlane Toy Spinoff Jumps Into Digital Collectibles
            </p>
            <p className="art-desc">
              The comic creator partners with Polygon and Rarible to sell
              collectible digital versions of his iconic hellspawn.
            </p>
          </div>
          <br />
          <div className="thedataauth">
            <div className="theauthordata">
              <img src={ImagesCS.authorprofile} alt="author-profile" />
              &nbsp;
              <p>By Jason Nelson</p>
            </div>
            <div>
              <p className="readtime">
                <span>
                  <img src={ImagesCS.calico} alt="timeico" />
                </span>
                &nbsp;Oct 28, 2022
              </p>
              <p className="readtime">
                <span>
                  <img src={ImagesCS.timerico} alt="timeico" />
                </span>
                &nbsp;3 min read
              </p>
            </div>
          </div>
          <br />
          <div>
            <img
              src={ImagesCS.mainartimg}
              alt="mainimg"
              className="mainartimg"
            />
            <p className="textsub">
              DeFi has been the center of regulatory attention of late. Image:
              Shutterstock.
            </p>
          </div>
          <div className="mainartimg">
            <p className="articlepara">
              McFarlane Toys, founded by famed comic book artist Todd McFarlane
              as a subsidiary of his media production company, announced today
              its new line of digital collectibles based on McFarlene's popular
              Spawn series.
            </p>
            <p className="articlepara">
              The McFarlane Toys Digital collection launches on December 1,
              2022.
            </p>
            <p className="articlepara">
              "For 30 years, McFarlane Toys has led in high-quality,
              design-driven collectibles for some of the world's biggest
              brands," McFarlane Toys tweeted. “Today we expand that legacy with
              McFarlane Toys Digital, the first AAA digital collectibles
              platform."
            </p>
            <p className="articlepara">
              Launched in 1994, McFarlane Toys, McFarlane Toys makes action
              figures of characters from films, comics, popular music, and video
              games. Projects include Supernoobs, Warhammer, Mortal Kombat, The
              Princess Bride, and Avatar: The Last Airbender.
            </p>
          </div>
          <br />
          <div>
            <div className="thearticle-data">
              <div>
                <img src={item.img} alt="article" className="imgarticle" />
              </div>
              <div className="articletext">
                <p className="articlehead">{item.title}</p>
                <p className="articledesc">{item.desc}</p>
                <div className="crumbsdata">
                  <p className="breadcrumbs">
                    News&nbsp;
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
                    &nbsp;2 min read
                  </p>
                </div>
                <div className="authordetail">
                  <div className="authormsg">
                    <p className="authorname">{item.author}</p>
                    &nbsp;&nbsp;&nbsp;
                    <li className="authordate">{item.date}</li>
                  </div>
                  <div>
                    <img src={ImagesCS.favouriteico} alt="favouriteico" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mainartimg">
              <p className="articlepara">
                (NFTs) are cryptographically unique tokens that are linked to
                digital and physical content, providing proof of ownership,
                including artwork, digital collectibles, music, and items in
                video games.
              </p>
              <p className="articlepara">
                In the tweet thread, the company said that anyone who spends
                over $100 in November at the official McFarlene Toys website
                using a
              </p>
              <p className="articlepara">
                would receive a random limited edition Spawn launch collectible
                featuring Spawn, Redeemer, or Clown.
              </p>
            </div>
            <br />
            <div className="mainartimg">
              <p className="discdata" style={{ color: "black" }}>
                DISCLAIMER
              </p>
              <p className="discdata">
                THE VIEWS AND OPINIONS EXPRESSED BY THE AUTHOR ARE FOR
                INFORMATIONAL PURPOSES ONLY AND DO NOT CONSTITUTE FINANCIAL,
                INVESTMENT, OR OTHER ADVICE.
              </p>
            </div>
            <br />
            <div className="mainartimg">
              <div className="themailss">
                <p className="themailtext">
                  Stay on top of crypto news, get daily updates in your inbox.
                </p>
                <br />
                <div className="themailform">
                  <p className="mailtag">Your Email</p>
                  <input
                    type="email"
                    placeholder="your email"
                    className="emaill"
                  />
                  <br />
                  <button className="btnn">Get It !</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
