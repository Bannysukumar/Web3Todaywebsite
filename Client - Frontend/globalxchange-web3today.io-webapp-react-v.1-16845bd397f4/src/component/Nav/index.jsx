import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./nav.module.scss";
import MainIco from "../../assets/mainico1.svg";
import mobileLogo from "../../assets/NavImages/mobileLogo.svg";
import searchIco from "../../assets/searchIco.svg";
import apple from "../../assets/NavImages/apple.svg";
import google from "../../assets/NavImages/google.svg";

import burgerMenu from "../../assets/NavImages/burgerMenu.svg";
import searchmobile from "../../assets/NavImages/searchmobile.svg";
import upIco from "../../assets/NewHomePage/up.svg";
import downIco from "../../assets/NewHomePage/down.svg";
import axios from "axios";
import { GlobalContex } from "../../globalContext";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ArticleSearch from "./ArticleSearch";
import VideoSearch from "./VideoSearch";
import Ticker from "react-ticker";

import web3FactoryLogo from "../../assets/images/logos/web3factory.svg";
import fireLogo from "../../assets/images/logos/fire.svg";

const Nav = () => {
  const history = useHistory();
  const location = useLocation();
  const wrapperRef = useRef();
  const {
    allNavBar,
    selectedNav,
    setSelectedNav,
    selectedSubNav,
    setSelectedSubNav,
    selectedStory,
    showStory,
    showPopup,
    setShowPopup,
    loginData,
    stopCounter,
    setRegisterUser,
    userLoginHandler,
    themeMode,
    setThemeMode,
    setStatsOpened,
    fullWidthNav,
    setFullWidthNav,
  } = useContext(GlobalContex);

  const [allPrices, setAllPrices] = useState([]);
  const [lazyloadimg, setLazyloadimg] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedText, setSelectedText] = useState("Articles");
  const [disp, setDisp] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const marketNavBar = ["Crypto"];
  const dropdownRef = useRef(null);
  const [trendingSectionArticles, setTrendingSectionArticles] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/article?category=6450dd402c88de7c39cf0f38"
      )
      .then((response) => {
        // console.log(response?.data?.data, "trending articles");
        setTrendingSectionArticles(response?.data?.data);
      })
      .catch((error) => {
        console.log(error?.message, "trending articles error");
      });
  }, []);

  const appresponsive = {
    0: {
      items: 5,
    },
    512: {
      items: 7,
    },
  };

  useEffect(() => {
    if (allNavBar?.length > 0) {
      setLoading(false);
    }
  }, [allNavBar]);

  useEffect(() => {
    axios
      .get(`https://comms.globalxchange.io/coin/vault/get/all/coins`)
      .then(({ data }) => {
        setAllPrices(data.coins);
      });
  }, []);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */

      function handleClickOutside(event) {
        // console.log(ref.current, event.target, "kwjbfkwjbefc");
        if (ref.current && !ref.current.contains(event.target)) {
          //   alert("You clicked outside of me!");
          setShowPopup(false);

          // ref.current = null;
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  const types = ["Articles", "Videos"];
  const [addtab, setaddtab] = useState([
    "Commercials",
    "Ambassadors",
    // "Consulting",
    "Tutorial",
    "Dashboard",
  ]);
  const [middleTab, setMiddleTab] = useState([
    "Portfolio",
    "Marketing",
    "Technology",
    "HR",
    "Investments",
  ]);
  const apps = allPrices?.map((item, id) => {
    return (
      <span
        style={{
          width: "190px",
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "space-between",
          // alignItems: "center",
          borderRight: "1px solid var(--bordercolor-main)",
          // padding: "0px 20px",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        <span style={{ fontWeight: 800 }}>{item.coinSymbol}</span>
        <img
          src={item?._24hrchange > 0 ? upIco : downIco}
          alt=""
          style={{ width: "8px", height: "8px", margin: "0px 8px" }}
        />
        <span>${item?.usd_price?.toFixed(4)}</span>
        <span
          style={{
            paddingLeft: "8px",
            color: item?._24hrchange > 0 ? "green" : "red",
          }}
        >
          {item?._24hrchange?.toFixed(2)}%
        </span>
      </span>
    );
  });

  const displayResults = () => {
    if (selectedText === "Articles") {
      return (
        <>
          <ArticleSearch
            searchText={searchText}
            setSearchText={setSearchText}
            disp={disp}
            setDisp={setDisp}
          />
        </>
      );
    } else {
      return (
        <>
          <VideoSearch
            searchText={searchText}
            setSearchText={setSearchText}
            disp={disp}
            setDisp={setDisp}
          />
        </>
      );
    }
  };

  const handleModal = () => {
    var searchInput = document.getElementById("search-input-main");
    console.log(searchInput, "searchInput");
    setDisp(!disp);
    if (disp) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    setTimeout(() => {
      searchInput?.focus();
    }, 100); // Adjust the delay as needed
  };

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdown("");
  //     }
  //   }

  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [dropdownRef]);

  return (
    <>
      <div
        style={{
          filter: selectedStory ? "blur(70px)" : "none",
          display: selectedStory ? "none" : "",
          // paddingLeft: loginData ? "80px" : "",
          maxWidth: location?.pathname == "/ventures" ? "1400px" : "",
          margin: location?.pathname == "/ventures" ? "0 auto" : "",
        }}
      >
        <div className={styles.section1Parent}>
          <div className={styles.sectionBorder}></div>
          <div className={styles.section1}>
            <AliceCarousel
              mouseTracking
              infinite
              autoPlayInterval={false}
              animationDuration={1500}
              disableDotsControls
              disableButtonsControls
              responsive={appresponsive}
              items={apps}
              autoPlay
              keyboardNavigation={true}
            />
          </div>{" "}
        </div>
        <div className={styles.section2Parent}>
          <div className={styles.sectionBorder}></div>
          <div className={styles.section2}>
            <div>
              <div
                onClick={(e) => {
                  if (
                    location.pathname.includes("/feed/article/") &&
                    loginData
                  ) {
                    stopCounter();
                    history.push(`/`);
                  } else {
                    history.push(`/`);
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img src={MainIco} alt="mainico" className={styles.logoimg} />
              </div>
              {/* <div
                className={
                  styles.navSty +
                  " " +
                  (selectedNav === "Feed" || selectedSubNav == "Market"
                    ? styles.selectedNav
                    : "")
                }
                style={{
                  borderBottom: selectedNav === "Feed" ? "none" : "",
                  padding: selectedNav === "Feed" ? "0 30px" : "",
                  color: window.location.pathname.includes("/markets/")
                    ? "#4b2a91"
                    : "",
                  background: window.location.pathname.includes("/markets/")
                    ? "rgba(75, 42, 145, 0.05)"
                    : "",
                  borderRadius: window.location.pathname.includes("/markets/")
                    ? "25px"
                    : "",
                }}
              >
                <span
                  onClick={(e) => {
                    setDropdown("feed");
                    history.push(`/`);
                    if (
                      location.pathname.includes("/feed/article/") &&
                      loginData
                    ) {
                      stopCounter();
                      setSelectedNav("Feed");
                      // history.push("/");
                      setSelectedSubNav("Articles");
                    } else {
                      setSelectedNav("Feed");
                      // history.push("/");
                      setSelectedSubNav("Articles");
                    }
                  }}
                >
                  Feed
                </span>
                <div
                  className={styles.dropdown}
                  style={{
                    bottom: "-155px",
                  }}
                  onClick={() => setDropdown("")}
                  // ref={dropdownRef}
                >
                  {!loading ? (
                    allNavBar
                      .sort((a, b) => a._id - b._id)
                      ?.map((item, index) => (
                        <div
                          // className={
                          //   selectedSubNav === item ? styles.selectedSubNav : ""
                          // }
                          // style={{
                          //   fontWeight: selectedSubNav == item ? "600" : "",
                          // }}
                          onClick={(e) => {
                            // console.log(item, "selecteddd");
                            setSelectedNav("Feed");
                            setDropdown("feed");
                            if (
                              item === "Articles" ||
                              item === "WAPPs" ||
                              item === "Web3 Apps" ||
                              item === "Videos" ||
                              item === "Markets" ||
                              item === "Case Studies"
                            ) {
                              if (item == "Case Studies") {
                                // setSelectedSubNav("Articles");
                                console.log("clicked case studies");
                                history.push("/feed/casestudies");
                              } else if (item === "Markets") {
                                setSelectedSubNav("Articles");
                                history.push(`/markets/crypto`);
                                // setDropdown("");
                              } else if (
                                location.pathname.includes("/feed/article/") &&
                                loginData
                              ) {
                                stopCounter();
                                setSelectedSubNav(item);
                                history.push(`/feed/${item?.toLowerCase()}`);
                                // setDropdown("");
                              } else if (item === "Web3 Apps") {
                                setSelectedSubNav("WAPPs");
                                history.push(`/feed/wapps`);
                              } else {
                                setSelectedSubNav(item);
                                history.push(`/feed/${item?.toLowerCase()}`);
                                // setDropdown("");
                              }
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              // console.log(
                              //   "item?.toLowerCase()",
                              //   item?.toLowerCase()
                              // );
                            }
                          }}
                        >
                          {item}
                        </div>
                      ))
                  ) : (
                    <Skeleton
                      width="100px"
                      height="20px"
                      style={{ borderRadius: "0px", margin: "12px 0px" }}
                    />
                  )}
                </div>
              </div> */}
              <div
                className={
                  styles.navSty +
                  " " +
                  (selectedNav === "Feed" || selectedSubNav == "Market"
                    ? styles.selectedNav
                    : "")
                }
                style={{
                  borderBottom: selectedNav === "Feed" ? "none" : "",
                  padding: selectedNav === "Feed" ? "0 30px" : "",
                  color: window.location.pathname.includes("/markets/")
                    ? "#4b2a91"
                    : "",
                  background: window.location.pathname.includes("/markets/")
                    ? "rgba(75, 42, 145, 0.05)"
                    : "",
                  borderRadius: window.location.pathname.includes("/markets/")
                    ? "25px"
                    : "",
                }}
                onClick={() => {
                  setFullWidthNav((prev) => !prev);
                }}
                // onClick={(e) => {
                //   let scrollElement =
                //     document.querySelector(".mainAppContainer");
                //   // console.log("ScrollElement :", scrollElement);
                //   scrollElement.scrollIntoView({ behavior: "smooth" });
                //   setFullWidthNav((prev) => !prev);
                //   setDropdown("feed");
                //   // history.push(`/`);
                //   if (
                //     location.pathname.includes("/feed/article/") &&
                //     loginData
                //   ) {
                //     stopCounter();
                //     setSelectedNav("Feed");
                //     // history.push("/");
                //     setSelectedSubNav("Articles");
                //   } else {
                //     setSelectedNav("Feed");
                //     // history.push("/");
                //     setSelectedSubNav("Articles");
                //   }
                // }}
              >
                <span>
                  Feed{" "}
                  {fullWidthNav ? (
                    <span className={styles.upArrow}></span>
                  ) : (
                    <span className={styles.downArrow}></span>
                  )}{" "}
                </span>
              </div>
              <div
                className={
                  styles.navSty +
                  " " +
                  (selectedNav === "WAPP’s" || selectedSubNav == "Market"
                    ? styles.selectedNav
                    : "")
                }
                style={{
                  borderBottom: selectedNav === "WAPP’s" ? "none" : "",
                  padding: selectedNav === "WAPP’s" ? "0 30px" : "",
                  marginLeft: "0",
                }}
              >
                <span
                  onClick={(e) => {
                    setDropdown("WAPP’s");
                    setSelectedNav("WAPP’s");
                    history.push("/feed/wapps");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  WAPP’s
                </span>
              </div>
              <div
                className={styles.darkmodeToggle}
                onClick={() => {
                  if (themeMode == "light") {
                    setThemeMode("dark");
                  } else {
                    setThemeMode("light");
                  }
                }}
              >
                {themeMode == "light" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="css-rogu1"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.929 4.93a9.959 9.959 0 015.288-2.77l.99 1.565a6.5 6.5 0 009.067 9.067l1.566.992a9.959 9.959 0 01-2.769 5.287c-3.905 3.905-10.237 3.905-14.142 0-3.905-3.905-3.905-10.237 0-14.142zm3.496-.09a8 8 0 109.232 12.816 7.992 7.992 0 001.502-2.08A8.5 8.5 0 018.424 4.84z"
                      fill="currentColor"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="css-17wwyrf"
                  >
                    <path
                      d="M11 4V1h2v3h-2zM4 13H1v-2h3v2zM11 20v3h2v-3h-2zM23 13h-3v-2h3v2zM5.636 7.05L3.515 4.93l1.414-1.414L7.05 5.636 5.636 7.05zM7.05 18.364l-2.12 2.121-1.415-1.414 2.121-2.121 1.414 1.414zM16.95 18.364l2.121 2.121 1.414-1.414-2.12-2.121-1.415 1.414zM20.485 4.929l-2.12 2.121-1.415-1.414 2.121-2.121 1.414 1.414z"
                      fill="currentColor"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 6a6 6 0 100 12 6 6 0 000-12zm-4 6a4 4 0 118 0 4 4 0 01-8 0z"
                      fill="currentColor"
                    ></path>
                  </svg>
                )}
              </div>
              {/* <div
                className={
                  styles.navSty +
                  " " +
                  (selectedNav === "Consulting" || selectedSubNav == "Market"
                    ? styles.selectedNav
                    : "")
                }
                style={{
                  borderBottom: selectedNav === "Consulting" ? "none" : "",
                  padding: selectedNav === "Consulting" ? "0 30px" : "",
                  marginLeft: "0",
                }}
              >
                <span
                  onClick={(e) => {
                    setDropdown("Consulting");
                    // if (location.pathname.includes("/earn/ads") && loginData) {
                    //   // stopCounter();
                    //   setSelectedNav("Earn");
                    //   setSelectedSubNav("Earn");
                    //   history.push("/earn/ads");
                    // } else {
                    //   setSelectedNav("Consulting");
                    //   setSelectedSubNav("Consulting");
                    //   history.push("/earn/ads");
                    // }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Consulting
                </span>
                <div
                  className={styles.dropdown}
                  style={{
                    bottom: "-186px",
                  }}
                  onClick={() => setDropdown("")}
                  // ref={dropdownRef}
                >
                  {middleTab?.map((item, index) => (
                    <div
                      style={{
                        // fontWeight: item == "Ads" && "bold",
                        color: !loginData && "#212529",
                        fontWeight: selectedSubNav == item ? "600" : "",
                      }}
                      className={
                        selectedSubNav === item ? styles.selectedSubNav : ""
                      }
                      onClick={() => {
                        if (item == "Commercials") {
                          history.push("/earn/ads");
                          setSelectedSubNav("Commercials");
                        } else if (item == "Ambassadors") {
                          history.push("/ambassadors");
                          setSelectedSubNav("Ambassadors");
                        }
                        setDropdown("");
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={
                  styles.navSty +
                  " " +
                  (selectedNav === "Earn" ? styles.selectedNav : "")
                }
                style={{
                  borderBottom: selectedNav === "Earn" ? "none" : "",
                  padding: selectedNav === "Earn" ? "0 30px" : "",
                  marginLeft: "0",
                }}
              >
                <span
                  onClick={(e) => {
                    setDropdown("earn");
                    if (location.pathname.includes("/earn/ads") && loginData) {
                      // stopCounter();
                      setSelectedNav("Earn");
                      setSelectedSubNav("Earn");
                      history.push("/earn/ads");
                    } else {
                      setSelectedNav("Earn");
                      setSelectedSubNav("Earn");
                      history.push("/earn/ads");
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Earn
                </span>
                <div
                  className={styles.dropdown}
                  style={{
                    bottom: "-150px",
                  }}
                  onClick={() => setDropdown("")}
                  // ref={dropdownRef}
                >
                  {addtab?.map((item, index) => (
                    <div
                      style={{
                        // fontWeight: item == "Ads" && "bold",
                        color: !loginData && "#212529",
                        fontWeight: selectedSubNav == item ? "600" : "",
                      }}
                      className={
                        selectedSubNav === item ? styles.selectedSubNav : ""
                      }
                      onClick={() => {
                        if (item == "Commercials") {
                          history.push("/earn/ads");
                          setSelectedSubNav("Commercials");
                        } else if (item == "Ambassadors") {
                          history.push("/ambassadors");
                          setSelectedSubNav("Ambassadors");
                        }
                        setDropdown("");
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
            <div className={styles.searchBox} onClick={handleModal}>
              <input
                type="search"
                value=""
                placeholder="Search Anything..."
                className={styles.searchBar}
              />
              <img
                src={searchIco}
                alt="searchico"
                className={styles.searchIco}
              />
              <div
                className={styles.searchData}
                onClick={(e) => e.stopPropagation()}
                style={{ display: disp ? "" : "none" }}
              >
                <input
                  type="search"
                  placeholder="Search Anything..."
                  className={styles.searchBar}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: "100%" }}
                  id="search-input-main"
                />
                <p className={styles.resultsType}>Show Results Type</p>
                <div className={styles.dispType}>
                  {types.map((item, id) => {
                    return (
                      <>
                        <p
                          className={
                            styles.dispText +
                            " " +
                            (item === selectedText ? styles.selectedText : "")
                          }
                          onClick={() => setSelectedText(item)}
                        >
                          {item}
                        </p>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </>
                    );
                  })}
                </div>
                <div style={{ width: "100%" }}>{displayResults()}</div>
              </div>
              <div
                className={styles.modal}
                style={{ display: disp ? "" : "none" }}
                onClick={handleModal}
              ></div>
            </div>

            <div className={styles.right}>
              <div
                className={styles.startBtn}
                style={{
                  display: "block",
                  marginRight: "0.5rem",
                  // background: "white",
                  border: "1px solid #e5e5e5",
                }}
                onClick={(e) => {
                  history.push("/ventures");
                }}
              >
                <p className={styles.startBtnText}>
                  <img src={web3FactoryLogo} alt="web3FactoryLogo" />
                  Web3&nbsp;Ventures
                </p>
              </div>
              {loginData ? (
                <div
                  className={styles.loginBtn}
                  onClick={(e) => {
                    setStatsOpened(true);
                  }}
                >
                  <span className={styles.loginBtnText}>Stats</span>
                </div>
              ) : (
                <div
                  className={styles.loginBtn}
                  onClick={(e) => {
                    // history.push("/login");
                    setRegisterUser("EarningOpportunity");
                  }}
                >
                  <p className={styles.loginBtnText}>
                    <img src={fireLogo} alt="fireLogo" />
                    Start&nbsp;Earning
                  </p>
                </div>
              )}
              &nbsp;&nbsp;
              <div className={styles.startBtn}>
                <p
                  className={styles.startBtnText}
                  onClick={(e) => {
                    // history.push("/register");
                    window.open(`https://app.web3today.io`, "_blank");
                  }}
                >
                  Go&nbsp;To&nbsp;App
                </p>
              </div>
              {/* <div>
            <img src={searchIco} alt="mainico" />
          </div> */}
            </div>

            {/* <div className={styles.right}> */}

            {/* <div className={styles.iconBox}>
            <img src={locationIco} alt="mainico" />
          </div>
          <div className={styles.iconBox}>
            <img src={searchIco} alt="mainico" />
          </div>
          <div
            className={styles.getStarted}
            onClick={(e) => history.push("/register")}
          >
            Get Started
          </div> */}
            {/* </div> */}
          </div>
        </div>
        <div className={styles.sectionNewsScrollParent}>
          <div className={styles.sectionBorder}></div>
          <div
            className={styles.sectionNewsScroll}
            // style={{ display: trendingSectionArticles ? "" : "none" }}
          >
            <div className={styles.title}>BREAKING NEWS</div>
            <Ticker height={34.4} speed={8} offset={0}>
              {({ index }) => (
                <>
                  {trendingSectionArticles?.length > 0 &&
                    trendingSectionArticles
                      .slice(0, 10)
                      ?.map((eacharticle, index) => {
                        return (
                          <div key={eacharticle?.title + index}>
                            <div>
                              <svg
                                width="5"
                                height="5"
                                viewBox="0 0 5 5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="5"
                                  height="5"
                                  transform="matrix(1 0 0 -1 0 5)"
                                  fill="#212529"
                                />
                              </svg>
                            </div>
                            <div
                              onClick={() => {
                                history.push(
                                  `/feed/article/${eacharticle?.custom_url}`
                                );
                              }}
                            >
                              {eacharticle?.title ? eacharticle?.title : ""}
                            </div>
                          </div>
                        );
                      })}
                </>
              )}
            </Ticker>
          </div>
        </div>

        <div
          className={styles.fullDropdown}
          id="fullDropdown"
          style={{ height: fullWidthNav ? "" : 0, overflow: "hidden" }}
          onClick={(event) => {
            if (event?.target?.id == "fullDropdown") {
              setFullWidthNav(false);
            }
          }}
        >
          <div className={styles.contentBox}>
            <div className={styles.innerContent}>
              <div className={styles.eachSection}>
                <div className={styles.title}>News</div>
                <div className={styles.allOptions}>
                  <div
                    onClick={() => {
                      setFullWidthNav(false);
                      history.push("/feed/articles");
                    }}
                  >
                    Articles
                  </div>
                  <div
                    onClick={() => {
                      setFullWidthNav(false);
                      history.push("/feed/videos");
                    }}
                  >
                    Videos
                  </div>
                  {/* <div>Web3 TV</div> */}
                </div>
              </div>
              <div className={styles.eachSection}>
                <div className={styles.title}>Learn</div>
                <div className={styles.allOptions}>
                  {/* <div>Academy</div> */}
                  <div
                    onClick={() => {
                      setFullWidthNav(false);
                      history.push("feed/casestudies");
                    }}
                  >
                    Case Studies
                  </div>
                  <div style={{ opacity: "0.5", pointerEvents: "none" }}>
                    Reports
                  </div>
                </div>
              </div>
              <div className={styles.eachSection}>
                <div className={styles.title}>Markets</div>
                <div className={styles.allOptions}>
                  <div
                    onClick={() => {
                      setFullWidthNav(false);
                      history.push("/markets/crypto");
                    }}
                  >
                    Prices
                  </div>
                  {/* <div>Analysis</div>
                  <div>Calendar</div> */}
                </div>
              </div>
              <div className={styles.eachSection}>
                <div className={styles.title}>Upcoming</div>
                <div
                  className={styles.allOptions}
                  style={{ opacity: "0.5", pointerEvents: "none" }}
                >
                  <div>Jobs</div>
                  <div>Events</div>
                  <div>Airdrops</div>
                </div>
              </div>
              <div className={styles.eachSection}>
                <div className={styles.title}>People</div>
                <div className={styles.allOptions}>
                  <div
                    onClick={() => {
                      setFullWidthNav(false);
                      window.open("https://app.web3today.io", "_blank");
                    }}
                  >
                    Readers
                  </div>
                  <div
                    onClick={() => {
                      setFullWidthNav(false);
                      window.open("https://app.web3today.io", "_blank");
                    }}
                  >
                    Brokers
                  </div>
                  <div
                    onClick={() => {
                      setFullWidthNav(false);
                      history.push("/ventures");
                    }}
                  >
                    Startups
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showPopup && (
          <div
            className={styles.popup}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={styles.storeContainer}>
              <div className={styles.storeWrapper}>
                <img src={apple} alt="" />
                <div className={styles.textSection}>
                  <div>Download On</div>
                  <div>App Store</div>
                </div>
              </div>
              <div
                className={styles.storeWrapper}
                style={{ paddingTop: "25px" }}
              >
                <img src={google} alt="" />
                <div className={styles.textSection}>
                  <div>Download on</div>
                  <div>Google Play</div>
                </div>
              </div>
            </div>
            {loginData ? (
              <div
                className={styles.loginButton}
                onClick={(e) => {
                  if (
                    location.pathname.includes("/feed/article/") &&
                    loginData
                  ) {
                    stopCounter();
                    localStorage.clear();
                    window.location.reload();
                  } else {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
              >
                <span className={styles.buttonText}>Logout</span>
              </div>
            ) : (
              <div
                className={styles.loginButton}
                onClick={(e) => {
                  history.push("/login");
                }}
              >
                <span className={styles.buttonText}>Login</span>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div className={styles.searchData} onClick={(e) => e.stopPropagation()} style={{ display: disp ? "" : "none" }} >
        <input type="search" placeholder="Search Anything..." className={styles.searchBar} />
        <p className={styles.resultsType}>Show Results Type</p>
        <div className={styles.dispType}>
          {types.map((item, id) => {
            return (
              <>
                <p className={styles.dispText + " " + (item === selectedText ? styles.selectedText : "")} onClick={() => setSelectedText(item)}>{item}</p>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </>
            )
          })}

        </div>
        <div>
          {displayResults()}
        </div>
      </div> */}

      {/* <div className={styles.mobileNav}>
        <img src={burgerMenu} />
        <img src={mobileLogo} />
        <img src={searchmobile} />
      </div> */}
    </>
  );
};

export default Nav;
