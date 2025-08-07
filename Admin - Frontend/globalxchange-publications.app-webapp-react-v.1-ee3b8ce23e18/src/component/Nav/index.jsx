import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const Nav = () => {
  const navigate = useNavigate();
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
        "https://publications.apimachine.com/article/navbar/638dd8a8b257b3715a8fbe08"
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

  // useEffect(() => {
  //   const prevRoute = navigate.pop();
  //   const newRoute = location.pathname;
  //   if (
  //     prevRoute.includes("/news/article/") &&
  //     !newRoute.includes("/news/article/")
  //   ) {
  //     stopCounter();
  //   }
  // }, [location, loginData]);

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
  const [addtab, setaddtab] = useState(["Ads", "Points", "AirDrops"]);
  const apps = allPrices?.map((item, id) => {
    return (
      <span
        style={{
          width: "190px",
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "space-between",
          // alignItems: "center",
          borderRight: "1px solid #e7e7e7",
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
    setDisp(!disp);
    if (disp) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown("");
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <>
      <div
        style={{
          filter: selectedStory ? "blur(70px)" : "none",
          display: selectedStory ? "none" : "",
          // paddingLeft: loginData ? "80px" : "",
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
                    location.pathname.includes("/news/article/") &&
                    loginData
                  ) {
                    stopCounter();
                    navigate(`/`);
                  } else {
                    navigate(`/`);
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img src={MainIco} alt="mainico" className={styles.logoimg} />
              </div>
              <div
                className={
                  styles.navSty +
                  " " +
                  (selectedNav === "News" ? styles.selectedNav : "")
                }
                style={{
                  borderBottom: selectedNav === "News" ? "none" : "",
                  padding: selectedNav === "News" ? "0 30px" : "",
                }}
              >
                <span
                  onClick={(e) => {
                    setDropdown("news");
                    if (
                      location.pathname.includes("/news/article/") &&
                      loginData
                    ) {
                      stopCounter();
                      setSelectedNav("News");
                      // navigate("/");
                      setSelectedSubNav("Articles");
                    } else {
                      setSelectedNav("News");
                      // navigate("/");
                      setSelectedSubNav("Articles");
                    }
                  }}
                >
                  News
                </span>
                <div
                  className={styles.dropdown}
                  style={{
                    bottom: "-116px",
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
                            if (
                              item === "Articles" ||
                              item === "WAPPs" ||
                              item === "Videos"
                            ) {
                              if (
                                location.pathname.includes("/news/article/") &&
                                loginData
                              ) {
                                stopCounter();
                                setSelectedSubNav(item);
                                navigate(`/news/${item?.toLowerCase()}`);
                                setDropdown("");
                              } else {
                                setSelectedSubNav(item);
                                navigate(`/news/${item?.toLowerCase()}`);
                                setDropdown("");
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
              </div>
              {/* <div
              className={
                styles.navSty +
                " " +
                (selectedNav === "Markets" ? styles.selectedNav : "")
              }
              style={{
                borderBottom: selectedNav === "Markets" ? "none" : "",
                padding: selectedNav === "Markets" ? "0 30px" : "",
              }}
            >
              <span
                onClick={(e) => {
                  setDropdown("markets");
                  if (
                    location.pathname.includes("/news/article/") &&
                    loginData
                  ) {
                    stopCounter();
                    setSelectedNav("Markets");
                    navigate("/markets/crypto");
                    setSelectedSubNav("Crypto");
                  } else {
                    setSelectedNav("Markets");
                    navigate("/markets/crypto");
                    setSelectedSubNav("Crypto");
                  }
                }}
              >
                Markets
              </span>
            </div> */}
              <div
                className={
                  styles.navSty +
                  " " +
                  (selectedNav === "Earn" ? styles.selectedNav : "")
                }
                style={{
                  borderBottom: selectedNav === "Earn" ? "none" : "",
                  padding: selectedNav === "Earn" ? "0 30px" : "",
                }}
              >
                <span
                  onClick={(e) => {
                    setDropdown("earn");
                    if (location.pathname.includes("/earn/ads") && loginData) {
                      // stopCounter();
                      setSelectedNav("Earn");
                      setSelectedSubNav("");
                      navigate("/earn/ads");
                    } else {
                      setSelectedNav("Earn");
                      setSelectedSubNav("");
                      navigate("/earn/ads");
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Commercials
                </span>
                {/* <div
                className={styles.dropdown}
                style={{
                  bottom: "-138px",
                  display: dropdown == "earn" ? "block" : "none",
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
                      navigate("/markets/crypto");
                      setDropdown("");
                      setSelectedSubNav("Ads");
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div> */}
              </div>
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
              {/* <div
            className={selectedNav === "News" ? styles.selectedNav : ""}
            onClick={(e) => {
              if (location.pathname.includes("/news/article/") && loginData) {
                stopCounter();
                setSelectedNav("News");
                navigate("/");
                setSelectedSubNav("Articles");
              } else {
                setSelectedNav("News");
                navigate("/");
                setSelectedSubNav("Articles");
              }
            }}
          >
            News
          </div>
          <div
            className={selectedNav === "Markets" ? styles.selectedNav : ""}
            onClick={(e) => {
              if (location.pathname.includes("/news/article/") && loginData) {
                stopCounter();
                setSelectedNav("Markets");
                navigate("/markets/crypto");
                setSelectedSubNav("Crypto");
              } else {
                setSelectedNav("Markets");
                navigate("/markets/crypto");
                setSelectedSubNav("Crypto");
              }
            }}
          >
            Markets
          </div> */}
              {/* <div
            className={selectedNav === "Courses" ? styles.selectedNav : ""}
          >
            Courses
          </div> */}
              {/* <div
            className={selectedNav === "Jobs" ? styles.selectedNav : ""}
          >
            Jobs
          </div> */}
              {/* <div
            className={selectedNav === "Marketplace" ? styles.selectedNav : ""}
          >
            Web3 Marketplace
          </div> */}
              {/* <div
            ref={wrapperRef}
            onMouseEnter={(e) => {
              setShowPopup(!showPopup);
            }}
            className={selectedNav === "Apps" ? styles.selectedNav : ""}
          >
            Apps
          </div> */}
              {loginData ? (
                <div
                  className={styles.loginBtn}
                  onClick={(e) => {
                    if (
                      location.pathname.includes("/news/article/") &&
                      loginData
                    ) {
                      stopCounter();
                      localStorage.clear();
                      window.location.reload();
                    } else {
                      localStorage.clear();
                      window.location.reload();
                    }
                    userLoginHandler();
                  }}
                >
                  <span className={styles.loginBtnText}>Logout</span>
                </div>
              ) : (
                <div
                  className={styles.loginBtn}
                  onClick={(e) => {
                    // navigate("/login");
                    setRegisterUser("");
                  }}
                >
                  <p className={styles.loginBtnText}>Start tracking</p>
                </div>
              )}
              {/* <div className={styles.loginBtn}>
            <p className={styles.loginBtnText}  onClick={(e) => {
                navigate("/login");
              }}>Login</p>
          </div> */}
              &nbsp;&nbsp;
              <div className={styles.startBtn}>
                <p
                  className={styles.startBtnText}
                  onClick={(e) => {
                    // navigate("/register");
                    window.open(`https://app.web3today.io`, "_blank");
                  }}
                >
                  Go To App
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
            onClick={(e) => navigate("/register")}
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
                    trendingSectionArticles?.map((eacharticle, index) => {
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
                              navigate(
                                `/news/article/${eacharticle?.custom_url}`
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
        {/* {selectedNav === "News" ? (
          <div className={styles.section3}>
            {!loading ? (
              allNavBar
                .sort((a, b) => a._id - b._id)

                ?.map((item, index) => (
                  <div
                    className={
                      selectedSubNav === item ? styles.selectedSubNav : ""
                    }
                    onClick={(e) => {
                      if (
                        item === "Articles" ||
                        item === "WAPPs" ||
                        item === "Videos"
                      ) {
                        if (
                          location.pathname.includes("/news/article/") &&
                          loginData
                        ) {
                          stopCounter();
                          setSelectedSubNav(item);
                          navigate(`/news/${item.toLowerCase()}`);
                        } else {
                          setSelectedSubNav(item);
                          navigate(`/news/${item.toLowerCase()}`);
                        }
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
        ) : (
          <>
            {selectedNav === "Earn" ? (
              <div
                className={styles.section3}
                style={{
                  justifyContent: !loginData && "center",
                  background: !loginData && "#fff",
                  borderBottom: !loginData && "0.5px solid #ddd",
                }}
              >
                {addtab?.map((item, index) => (
                  <div
                    style={{
                      fontWeight: item == "Ads" && "bold",
                      color: !loginData && "#212529",
                    }}
                    className={
                      selectedSubNav === item ? styles.selectedSubNav : ""
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.section3}>
                {marketNavBar.map((item, index) => (
                  <div
                    className={
                      selectedSubNav === item ? styles.selectedSubNav : ""
                    }
                    onClick={(e) => {
                      if (item === "Crypto" || item === "Forex") {
                        if (
                          location.pathname.includes("/news/article/") &&
                          loginData
                        ) {
                          stopCounter();
                          setSelectedSubNav(item);
                          navigate(`/markets/${item.toLowerCase()}`);
                        } else {
                          setSelectedSubNav(item);
                          navigate(`/markets/${item.toLowerCase()}`);
                        }
                      }
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </>
        )} */}
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
                    location.pathname.includes("/news/article/") &&
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
                  navigate("/login");
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
