import React, { useEffect, useState } from "react";
import "./mainpage.scss";
import Navbar from "./Navbar/navbar";
import graphico from "../../assets/graphico.png";
import ESGicon from "../../assets/ESGicon.svg";
import bannerImg from "../../assets/bannerImg.svg";
import searchIco from "../../assets/NavImages/thesearch.svg";
import stockchart from "../../assets/stockchart.png";
import adduser from "../../assets/adduser.svg";
import cardico from "../../assets/card.svg";
import graph from "../../assets/graph.svg";
import gettyimg from "../../assets/gettyimg.svg";
import goldbars from "../../assets/thegoldbars.svg";
import worldmap from "../../assets/worldmap.svg";
import { useHistory } from "react-router-dom";
import market1ico from "../../assets/MainPageImgs/market1.svg";
import market2ico from "../../assets/MainPageImgs/market2.svg";
import market3ico from "../../assets/MainPageImgs/market3.svg";
import videoimg from "../../assets/MainPageImgs/videoimg.svg";
import circletick from "../../assets/MainPageImgs/circletick.svg";
import cryptocharts from "../../assets/MainPageImgs/cryptochart.svg";
import tradingView from "../../assets/MainPageImgs/tradingView.svg";
import rateimg from "../../assets/MainPageImgs/rateimg.svg";
import hatimg from "../../assets/MainPageImgs/hatimg.svg";
import ratestars from "../../assets/MainPageImgs/thestarsrate.svg";
import trustico from "../../assets/MainPageImgs/trustico.svg";
import mobiltrade from "../../assets/MainPageImgs/mobiltrade.svg";
import sellbuyline from "../../assets/MainPageImgs/sellbuyline.svg";
import pltfrmimg from "../../assets/MainPageImgs/pltfrmimg.svg";
import mobileimgs from "../../assets/MainPageImgs/mobileimgs.svg";
import storeicons from "../../assets/MainPageImgs/storeicons.svg";
import partnerimg from "../../assets/MainPageImgs/partnerimg.svg";
import trustimg from "../../assets/MainPageImgs/trustedimg.svg";
import payimgs from "../../assets/MainPageImgs/payimgs.svg";
import trustpilotimg from "../../assets/MainPageImgs/trustpilotimg.svg";
import socialico from "../../assets/MainPageImgs/fbico.svg";
import playico from "../../assets/MainPageImgs/gplayico.svg";
import appleico from "../../assets/MainPageImgs/apstoreico.svg";
import web3full from "../../assets/NavImages/web3full.svg";
import CountUp from "react-countup";

function MainPage() {
  const history = useHistory();
  const thelinksdata = [
    "News Platform",
    "Bitcoin",
    "The basics of trading",
    "Charges and fees",
    "Why Capital.com?",
  ];
  const [collapsemenu, setcollapsemenu] = useState(true);
  const thebtmbtns = [
    {
      text: "Get involved. Become a trader.",
      image: ESGicon,
    },
    {
      text: "Don’t “trade off” your values. Trade on them.",
      image: ESGicon,
    },
    {
      text: "New to trading. New to trading",
      image: ESGicon,
    },
    {
      text: "Find us on TradingView",
      image: ESGicon,
    },
  ];

  const bannerdata = [
    {
      title: "Get involved. Become a trader.",
      desc: "Trade CFDs on Bitcoin, Gold, Oil, Apple, Tesla and 6,400+ other world-renowned markets.",
      image: (
        <div className="chartgrph">
          <p className="coinchng">Bitcoin/USD</p>
          <p className="coinval">16766.30</p>
          <img className="rightbanner" src={graphico} alt="graph" />
        </div>
      ),
    },
    {
      title: "Don’t “trade off” your values. Trade on them.",
      desc: "Find WAPPs with a high Environmental, Social & Governance score",
      image: <img src={bannerImg} alt="banner-img" className="banimg" />,
    },
    {
      title: "New to trading?.",
      desc: "Learn the basics on a demo account.Top it up in one click up to $100k.",
      image: (
        <div className="chartgrph">
          <p className="coinchng">Bitcoin/USD</p>
          <p className="coinval">16766.30</p>
          <img className="rightbanner" src={graphico} alt="graph" />
        </div>
      ),
    },
    {
      title: "Find us on trading view",
      desc: "Connect your account to TradingView for more interactive charts",
      image: <img src={bannerImg} alt="banner-img" className="banimg" />,
    },
  ];

  const Navs = [
    {
      text: "Most traded",
    },
    {
      text: "Commodities",
    },
    {
      text: "Indices",
    },
    {
      text: "Crypto",
    },
    {
      text: "Shares",
    },
    {
      text: "Forex",
    },
    {
      text: "ETFs",
    },
  ];
  const [navActive, setNavActive] = useState("Most traded");

  const [activeTxt, setActiveTxt] = useState("Get involved. Become a trader.");
  const [theindex, settheindex] = useState(0);
  const [mblinks, setmblinks] = useState(true);
  const thecategories = [
    {
      theclr: "#A9C3FE",
      text: "Stocks",
    },
    {
      theclr: "#00C0FF",
      text: "Crypto",
      subtext: "NFTs and Blockchain",
    },
    {
      theclr: "#FCBBF5",
      text: "Economics",
    },
    {
      theclr: "#A3D459",
      text: "Energy",
      subtext: "Oil and Gas",
    },
    {
      theclr: "#ED558D",
      text: "Forex",
    },
  ];

  const mrktnews = [
    {
      image: market1ico,
      title:
        "Who owns the most Jasmy crypto? High concentration among top 10 holders.",
      subtitle: "Iliana Mavrou",
    },
    {
      image: market2ico,
      title:
        "Biggest public bitcoin mining WAPPs: Sector dominated by indebted firms fighting for survival.",
      subtitle: "Alejandro Arrieche",
    },
    {
      image: market3ico,
      title: "How many Chiliz coins are there? CHZ crypto circulation analysis",
      subtitle: "Ankish Jain",
    },
  ];

  const linkclick = () => {
    if (window.innerWidth < 800) {
      setmblinks(!mblinks);
    }
  };

  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 800) {
        setmblinks(true);
      } else {
        setmblinks(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <div className="maindata">
        <Navbar collapsemenu={collapsemenu} setcollapsemenu={setcollapsemenu} />
        {collapsemenu ? (
          <div className="sections">
            <div className="first-section">
              <br />
              <div className="section1-nav">
                <div className="thelinks">
                  <p className="linktext" onClick={linkclick}>
                    Quick Links:
                  </p>
                  {thelinksdata.map((e) => {
                    return (
                      <p
                        className="boldlink"
                        style={{ display: mblinks ? "" : "none" }}
                        onClick={() =>
                          e === "News Platform" ? history.push("/page3") : ""
                        }
                      >
                        {e}
                      </p>
                    );
                  })}
                </div>
                <br />
                <div className="bannerhome">
                  <div className="bannerleft">
                    <p className="lefttext">{bannerdata[theindex].title}</p>
                  </div>
                  <div className="bannerleft">
                    <p className="centerbanner">{bannerdata[theindex].desc}</p>
                  </div>
                  <div>{bannerdata[theindex].image}</div>
                </div>
                <br />
                <div>
                  <button className="tradeadd-btn">Trade Now</button>
                </div>
              </div>

              {/* <hr className="hr-tag" /> */}
              <div className="btm-tags">
                {thebtmbtns.map((e, index) => {
                  let therad = "0px";
                  let lastrad = "0px";
                  if (index === 0) {
                    therad = "32px";
                  }
                  if (index === 3) {
                    lastrad = "32px";
                  }
                  return (
                    <div
                      onClick={() => (setActiveTxt(e.text), settheindex(index))}
                      className="btm-page"
                    >
                      <div
                        className={
                          "btm-data" + (activeTxt === e.text ? " active1" : " ")
                        }
                        style={{
                          borderBottomLeftRadius: therad,
                          borderBottomRightRadius: lastrad,
                        }}
                      >
                        <p
                          className={
                            "btm-text" +
                            (activeTxt === e.text ? " active1" : " ")
                          }
                        >
                          {e.text}
                        </p>
                        <img
                          src={ESGicon}
                          alt="esg-icon"
                          className={
                            "btmimg" + (activeTxt === e.text ? " active1" : " ")
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="second-section">
              <div className="theleftstock">
                <div className="thesearchbar">
                  <img src={searchIco} alt="Search-ico" className="searchico" />
                  <span className="vl1"></span>
                  <input
                    type="search"
                    className="searchfield"
                    placeholder="search instrument"
                  />
                </div>
                <div className="thestocks">
                  <div className="stockhead">
                    {Navs.map((item) => {
                      return (
                        <div
                          className="mainnav"
                          onClick={() => setNavActive(item.text)}
                        >
                          <div
                            className={
                              "navdata " +
                              (navActive === item.text ? "active2" : "")
                            }
                          >
                            <p className="navtext">
                              {item.text.split(" ")[0]}&nbsp;
                              {item.text.split(" ")[1]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <img src={stockchart} alt="stock-chart" />
                  </div>
                  <div className="stocknav">
                    <p>Name</p>
                    <p>Sell</p>
                    <p className="thebuy">Buy</p>
                    <p className="thechg">Chg%</p>
                    <p></p>
                  </div>
                  <div className="stocksdata">
                    {Array(10)
                      .fill("")
                      .map((e) => {
                        return (
                          <div className="stocks">
                            <p className="stockname">Natural gas</p>
                            <p>6.233</p>
                            <p className="thebuy">6.238</p>
                            <p className="chngclr thechg">+0.910%</p>
                            <p className="thestocktrd">Trade</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <p className="thebrws">Browse all markets</p>
              </div>
              <div className="readdata">
                <p className="readtitle">Most Read</p>
                <br />
                <br />
                <div>
                  {Array(6)
                    .fill("")
                    .map((e) => {
                      return (
                        <div>
                          <p className="thetitles">
                            Swiss franc outlook: CHF to rally on higher SNB
                            interest-rate hikes?
                          </p>
                          <p className="subtxt">15:48, 14 November 2022</p>
                          <br />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="readdata thebgfeed">
                <p className="readtitle">Most Read</p>
                <br />
                <br />
                <div>
                  {Array(5)
                    .fill("")
                    .map((e) => {
                      return (
                        <div>
                          <p className="thetitles">
                            Swiss franc outlook: CHF to rally on higher SNB
                            interest-rate hikes?
                          </p>
                          <p className="subtxt">15:48, 14 November 2022</p>
                          <br />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="third-section">
              <p className="third-title">
                Still looking for a broker you can trust?
              </p>
              <p className="third-desc">
                Join the 455.000+ traders worldwide that chose to trade with
                Capital.com
              </p>
              <div className="thestepssdisp">
                <div className="stepsdisp">
                  <div>
                    <img src={adduser} alt="add-user" />
                  </div>
                  <div>
                    <img src={cardico} alt="card-ico" />
                  </div>
                  <div>
                    <img src={graph} alt="graph-disp" />
                  </div>
                </div>
                <div className="thesteps">
                  <p className="stepstxt">1. Create & verify your account</p>
                  <p className="stepstxt">2. Make your first deposit</p>
                  <p className="stepstxt">3. You’re all set. Start trading</p>
                </div>
              </div>
            </div>
            <div className="fourth-section">
              <p className="fourth-title">In-The-Know-Zones</p>
              <br />
              <div className="fourthdata">
                <div>
                  <div>
                    <div className="thebtnnews">
                      <p className="latesttext">Metals latest news</p>
                      <p className="gotext">Go to metals {"-->"}</p>
                    </div>
                    <div>
                      <div className="flexdisp">
                        <div>
                          <img
                            src={gettyimg}
                            alt="getty-img"
                            className="theimg-getty"
                          />
                        </div>
                        <div className="latest-one">
                          <p className="title-newone">
                            Silver hits $22: Ag price boosted as US inflation
                            dip hits dollar
                          </p>
                          <p className="latest-time">16:48, 11 November 2022</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="thegoldbarimg">
                  <img src={goldbars} alt="gold-bars" className="goldbar" />
                </div>
              </div>
            </div>
            <div className="btmblack">
              {thecategories.map((e) => {
                return (
                  <div className="thecate">
                    <p
                      className="stockclr"
                      style={{ background: e.theclr }}
                    ></p>
                    <div>
                      <p className="thebtmzone" style={{ color: e.theclr }}>
                        {e.text}
                      </p>
                      <p className="btmsubtext">{e.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="fifth-section">
              <div>
                <p className="indices">Indices map</p>
                <img src={worldmap} alt="world-map" className="mapimg" />
              </div>
              <div className="marketdata">
                <p className="indices">Market analysis</p>
                <br />
                <div className="mrktshrt">
                  {mrktnews.map((e) => {
                    return (
                      <div className="newsmrkt">
                        <img
                          src={e.image}
                          alt="market-ico"
                          className="themarketico"
                        />
                        <p className="markettitle">{e.title}</p>
                        <p className="marketsub">{e.subtitle}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="thegasdata">
                  <div>
                    <p className="coinpair">XRP/USD</p>
                  </div>
                  <div>
                    <p className="coinvalue">0.34</p>
                    <p className="cointag">Price</p>
                  </div>
                  <div>
                    <p className="pairchange">+0.350%</p>
                    <p className="pairtag">1D Chg, %</p>
                  </div>
                  <div>
                    <p className="therighttrd">Trade Now</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sixth-section">
              <div>
                <p className="indices">Explore our platform</p>
                <br />
                <img src={videoimg} alt="video-disp" className="thevideodisp" />
              </div>
              <div>
                <p className="brieftxt">
                  We created our advanced yet user-friendly platform to make
                  your trading experience even better.
                </p>
                <div className="briefdata">
                  <div className="briefpoints">
                    <img src={circletick} alt="circle-tick" />
                    <p className="brieftitle">
                      Intuitive & <span className="spantitle">easy-to-use</span>{" "}
                      interface
                    </p>
                  </div>
                  <div className="briefpoints">
                    <img src={circletick} alt="circle-tick" />
                    <p className="brieftitle">
                      Regular live updates & price alerts for{" "}
                      <span className="spantitle">6,400+ markets</span>
                    </p>
                  </div>
                  <div className="briefpoints">
                    <img src={circletick} alt="circle-tick" />
                    <p className="brieftitle">
                      Tech indicators,{" "}
                      <span className="spantitle">analytics tools</span> &
                      advanced charts
                    </p>
                  </div>
                  <div className="briefpoints">
                    <img src={circletick} alt="circle-tick" />
                    <p className="brieftitle">
                      Hedging mode &{" "}
                      <span className="spantitle">risk management</span> tools
                    </p>
                  </div>
                  <p className="trybtn">Try&nbsp;Now</p>
                </div>
              </div>
            </div>
            <div className="seventh-section">
              <div>
                <p className="indices">Markets Heatmap</p>
                <img
                  src={cryptocharts}
                  alt="crypto-charts"
                  className="thechart"
                />
              </div>
              <div className="marketdata">
                <p className="indices">Economic calendar</p>
                <br />
                <p className="timezone">(UTC)</p>
                <div>
                  <div className="the-ecn-nav">
                    <p className="datetoday">Monday, November 14, 2022</p>
                  </div>
                  {Array(7)
                    .fill("")
                    .map((e) => {
                      return (
                        <div className="ecn-timeline">
                          <p className="thetime">09:00</p>
                          <p className="thelabel">IT</p>
                          <p className="ecndesc">
                            Brazil-Federal Tax Revenue-Federal Tax Revenue*
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="eighth-section">
              <div>
                <div className="leftrade">
                  <p className="viewtitl">
                    Trade CFDs on Capital.com via TradingView
                  </p>
                  <p className="viewdsc">
                    Connect Capital.com to TradingView, explore and enjoy the
                    best of both trading platforms.
                  </p>
                  <div>
                    <p className="viewbtn">View Features</p>
                  </div>
                  <div className="monitorimg">
                    <img
                      src={tradingView}
                      alt="trade-icon"
                      className="trdviewimg"
                    />
                  </div>
                </div>
                <div className="esgrating">
                  <p className="esgtxt">Company ESG Risk Ratings</p>
                </div>
                <div className="companysrch">
                  <img src={searchIco} alt="Search-ico" className="searchico" />
                  <span className="vl1"></span>
                  <input
                    type="search"
                    className="compfield"
                    placeholder="Find a company by name or ticker"
                  />
                </div>
                <div>
                  <div className="thenavsesg">
                    <p className="esgtext">Company</p>
                    <p className="esgtext">ESG Risk Rating</p>
                  </div>
                  {Array(4)
                    .fill("")
                    .map((e) => {
                      return (
                        <div className="esgtable">
                          <div>
                            <p className="esgcomp">
                              Cognizant Technology Solutions Corp
                            </p>
                            <p className="esgdetail">
                              Company report currency: USD
                            </p>
                          </div>
                          <div className="ratetable">
                            <p className="rate">C+</p>
                          </div>
                          <div>
                            <img src={rateimg} alt="rate-img" />
                          </div>
                          <div>
                            <p className="riskrate">Medium</p>
                          </div>
                        </div>
                      );
                    })}
                  <p className="esgcov">More ESG coverage {"-->"}</p>
                </div>
              </div>
              <div>
                <p className="theguides">Trading Guides</p>
                <div className="tradelevel">
                  <p className="lvltxt lvlactive">Beginner</p>
                  <p className="lvltxt">Intermediate</p>
                  <p className="lvltxt">Advanced</p>
                </div>
                {Array(8)
                  .fill("")
                  .map((e) => {
                    return (
                      <div className="tradefeatures">
                        <div className="trademarg">
                          <img src={hatimg} alt="hatimg" />
                        </div>
                        <div className="thevl trademarg"></div>
                        <div className="trademarg">
                          <p className="featuretxt">Academy</p>
                          <p className="featuresubtxt">
                            Capital.com offers you free basic online courses
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="ninth-section">
              <div className="testimonialframe">
                <p className="monialtitle">
                  Read our reviews to find out more about us
                </p>
                <div className="theframes">
                  {Array(4)
                    .fill("")
                    .map((e) => {
                      return (
                        <div className="margfrms">
                          <div className="framedisp">
                            <img src={ratestars} alt="ratestars" />
                            <p className="usersty">Aria Sarbast</p>
                            <p className="userdescsty">
                              There's a good securuty on the trading platform,
                              and it's going exacly what the customer wanting.
                            </p>
                          </div>
                          <div className="framedisp">
                            <img src={ratestars} alt="ratestars" />
                            <p className="usersty">Aria Sarbast</p>
                            <p className="userdescsty">
                              There's a good securuty on the trading platform,
                              and it's going exacly what the customer wanting.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <img src={trustico} alt="trustico" className="trustimgg" />
                </div>
              </div>
            </div>
            <div className="tenth-section">
              <div className="mobilimgtrd">
                <img src={mobiltrade} alt="mobil-trade" />
              </div>
              <div className="textdisptrd">
                <p className="newtrd">New to trading?</p>
                <p className="lrntrd">Learn to trade with Capital.com</p>
                <p className="newtrdbtn">Practise for free</p>
              </div>
            </div>
            <div className="eleventh-section">
              <div className="trdflx">
                <div className="tradeswp">
                  <p className="tradecalc">Trading calculator</p>
                  <p className="thetrdtxt">
                    Calculate your hypothetical P&L if you had opened a trade
                    today 2022-11-14 at the market opening price:
                  </p>
                  <div className="thetrd">
                    <div className="mrktrd">
                      <p className="mrktlbl">Market</p>
                      <input
                        type="text"
                        value="Ethereum"
                        className="mrktinpt"
                      />
                      <div className="trdpos">
                        <div className="posbg">
                          <p className="possize">Position size</p>
                          <p className="posvlu">5.14787</p>
                        </div>
                        <div className="posbg">
                          <p className="possize">Leverage</p>
                          <p className="posvlu">1:2</p>
                        </div>
                      </div>
                      <div className="trdpos">
                        <div className="posbg">
                          <p className="possize">Spread</p>
                          <p className="posvlu">0.00500</p>
                        </div>
                        <div className="posbg">
                          <p className="possize">Trade&nbsp;commission</p>
                          <p className="posvlu">$ 0</p>
                        </div>
                      </div>
                      <p className="prftxt">
                        Past performance is not a reliable indicator of future
                        results
                      </p>
                    </div>
                    <div className="mrktrd">
                      <p className="mrktlbl">Investment</p>
                      <input type="text" value="$1659" className="mrktinpt" />
                      <div className="trdpos">
                        <div className="posbg">
                          <p className="possize">Opening price</p>
                          <p className="posvlu">$ 1650.21</p>
                        </div>
                        <div className="posbg">
                          <p className="possize">Current price</p>
                          <p className="posvlu">$ 1250.06</p>
                        </div>
                      </div>
                      <div className="tradelevel" style={{ marginLeft: "0px" }}>
                        <p className="lvltxt lvlactive">Sell</p>
                        <p className="lvltxt">Buy</p>
                      </div>
                      <div className="tradpl">
                        <div>
                          <p className="plcls">Profit/Loss</p>
                          <p className="plvlu">$400.15</p>
                        </div>
                        <div>
                          <p className="trdplbtn">Start trading</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="tradecalc">Trader's Dashboard</p>
                  <div className="boarddisp">
                    <p className="prftxt">Instrument</p>
                    <p className="prftxt">Sellers</p>
                    <p className="prftxt">Buyers</p>
                    <p></p>
                  </div>
                  <div className="brddisp">
                    <div className="brdline">
                      {Array(5)
                        .fill("")
                        .map((e) => {
                          return (
                            <div className="brddata">
                              <div>
                                <p className="brdname">Natural Gas</p>
                              </div>
                              <div className="brdchart">
                                <p className="brdbuy">22 %</p>
                                <img
                                  src={sellbuyline}
                                  alt="sellbuy"
                                  className="sellbuy"
                                />
                                <p className="brdsell">78%</p>
                              </div>
                              <div>
                                <p className="brdtrdbtn">Trade</p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="tradenws">
                  <p className="tradecalc margright">Financial News</p>
                  <div className="tradelevel">
                    <p className="lvltxt lvlactive">Economic</p>
                    <p className="lvltxt">Stocks</p>
                    <p className="lvltxt">Forex</p>
                    <p className="lvltxt">Crypto</p>
                    <p className="lvltxt">Commodities</p>
                  </div>
                  {Array(5)
                    .fill("")
                    .map((e) => {
                      return (
                        <div className="fnltags">
                          <div className="fnlnws">
                            <img
                              src={pltfrmimg}
                              alt="pltfrmimg"
                              className="fnlimg"
                            />
                          </div>
                          <div className="fnltxt">
                            <p className="fnltitle">
                              US Dollar Weekly Outlook: USD Slammed, EUR/USD,
                              GBP/USD Breakout
                            </p>
                            <p className="fnldesc">
                              US Dollar EUR/USD, GBP/USD forecast for the week
                              ahead
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="twelvth-section">
              <p className="tradecalc">Our Apps</p>
              <div className="tradeflx">
                <div className="storeicndisp">
                  <div>
                    <img
                      src={storeicons}
                      alt="storeicons"
                      className="appsimg"
                    />
                  </div>
                  <div>
                    <img
                      src={mobileimgs}
                      alt="mobileimgs"
                      className="mobsimg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="thirteenth-section">
              <div className="compstatus">
                <p className="comptitle">
                  Why choose Capital.com? Our numbers speak for themselves.
                </p>
                <p className="compname">Capital.com Group</p>
              </div>
              <div className="statuscount">
                {Array(4)
                  .fill("")
                  .map((e) => {
                    return (
                      <div className="">
                        <p className="countup">
                          <CountUp end={455000} />+
                        </p>
                        <p className="statussub">Traders</p>
                      </div>
                    );
                  })}
                <div>
                  <p className="brdtrdbtn">Try now</p>
                </div>
              </div>
            </div>
            <div className="fourteeth-section">
              <div className="partnersec">
                <div>
                  <div>
                    <img src={partnerimg} alt="partner-img" />
                  </div>
                  <div>
                    <img src={partnerimg} alt="partner-img" />
                  </div>
                </div>
                <div className="partnerimg">
                  <div>
                    <p className="pntrtxt">Powered by</p>
                    <img src={trustimg} alt="partner-img" />
                  </div>
                  <div className="imggpnt">
                    <img src={trustimg} alt="partner-img" />
                  </div>
                </div>
                <div className="partnerimg">
                  <div>
                    <p className="pntrtxt">
                      Group’s Parent Entity is audited by
                    </p>
                    <img src={trustimg} alt="partner-img" />
                  </div>
                  <div className="imggpnt">
                    <img src={trustimg} alt="partner-img" />
                  </div>
                </div>
              </div>
              <div className="theimgtrust">
                <img src={trustpilotimg} alt="trust-pilot" />
              </div>
            </div>
            <div className="fifteenth-section">
              {Array(6)
                .fill("")
                .map((e) => {
                  return (
                    <div>
                      <img src={payimgs} alt="payimgs" />
                    </div>
                  );
                })}
            </div>
            <div className="sixteenth-section">
              <div>
                <img src={web3full} alt="Web3ico" width="150px" />
              </div>
              <div className="socioico">
                {Array(6)
                  .fill("")
                  .map((e) => {
                    return (
                      <div>
                        <img src={socialico} alt="socialico" />
                      </div>
                    );
                  })}
              </div>
              <div className="appiconsss">
                <div>
                  <img src={playico} alt="socialico" />
                </div>
                <div>
                  <img src={appleico} alt="socialico" />
                </div>
              </div>
            </div>
            <div>
              <p className="rights">All Rights Reserved web3today.io 2022</p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default MainPage;
