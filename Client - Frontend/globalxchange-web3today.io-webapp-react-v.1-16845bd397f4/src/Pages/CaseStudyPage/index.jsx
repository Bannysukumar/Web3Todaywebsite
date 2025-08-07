import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ImageModal from "./ImageModal";
import "./casestudy.scss";

//images
import logo from "../../assets/images/Homepage/garagelogo.svg";
import quotes from "../../assets/images/Casestudy/quotes.svg";
import bullet from "../../assets/images/Homepage/bullet.png";
import sectionTitleBg from "./sectionTitle.png";
import leftArrow from "./arrowLeft.svg";
import rightArrow from "./arrowRight.svg";
// import sectionTitleBg as component
import { ReactComponent as SectionTitleBg } from "./sectionTitle.svg";
import { GlobalContex } from "../../globalContext";
import useWindowDimensions from "../../services/WindowSize";
import Nav from "../../component/Nav";
import MobileNav from "../../component/MobileLayout/MobileNav";
import FooterContainer from "../../component/NewFooter";

const CaseStudyPageSupernova = () => {
  const navigate = useHistory();
  const [selectedMenu, setSelectedMenu] = useState("About");
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    showStory,
    mobileMenu,
    fullWidthNav,
    portfolioData,
    setPortfolioData,
    selectedProfileData,
    setSelectedProfileData,
  } = useContext(GlobalContex);

  const { width } = useWindowDimensions();

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (selectedProfileData?.design?.length > 0) {
      setSelectedCard(selectedProfileData?.design[0]);
    }
  }, [selectedProfileData]);

  const menuData = [
    {
      id: 0,
      name: "About",
    },
    {
      id: 1,
      name: "Requirements",
    },
    {
      id: 2,
      name: "Products",
    },
    {
      id: 3,
      name: "Results",
    },
    {
      id: 4,
      name: "Testimonials",
    },
  ];

  const handlePrev = (item) => {
    let index = selectedProfileData?.design.indexOf(item);
    if (index === 0) {
      setSelectedCard(
        selectedProfileData?.design[selectedProfileData?.design.length - 1]
      );
    } else {
      setSelectedCard(selectedProfileData?.design[index - 1]);
    }
  };
  const handleNext = (item) => {
    let index = selectedProfileData?.design.indexOf(item);
    if (index === selectedProfileData?.design.length - 1) {
      setSelectedCard(selectedProfileData?.design[0]);
    } else {
      setSelectedCard(selectedProfileData?.design[index + 1]);
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const lastString = url.substring(url.lastIndexOf("/") + 1);
    console.log(lastString, "lastStringkjwgdkwjegfkwjgef");
    axios
      .get("https://counsel.apimachine.com/api/getPortfolio")
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "portfolio result");
        setPortfolioData(result);
        const found = result.find((o) => o.brandName === lastString);
        if (found) {
          setSelectedProfileData(found);
        }
      })
      .catch((error) => {
        console.log(error, "Error in getting portfolio data");
      });

    // const data = localStorage.getItem("selectedPortfolio");
    // console.log(data, "kjwgdkwjegfkwjgef");
    console.log(portfolioData, "lastStringkjwgdkwjegfkwjgef09097098097098");
    // if (data) {
    //   setSelectedProfileData(JSON.parse(data));
    // }

    // get the last string after /
    console.log(lastString, "lastString");

    const found = portfolioData.find((o) => o.brandName === lastString);
    if (found) {
      setSelectedProfileData(found);
    }
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToSection("casestudysupernova");
  }, []);

  return (
    <div
      className="mainAppContainer"
      style={{
        height: fullWidthNav ? "" : "100vh",
        overflow: width > 768 ? "" : "auto",
        // overflowY: fullWidthNav ? "hidden" : "",
      }}
      id="casestudysupernova"
    >
      <div
        style={{
          background: "var(--theme-main)",
          zIndex: 2,
          filter: showStory ? "blur(70px)" : "none",
          // position: !mobileMenu ? "sticky" : "",
          position: "sticky",
          top: !mobileMenu ? "0" : "",
          left: "0",
          right: "0",
        }}
        className="mainAppNavbar"
      >
        {width > 768 ? <Nav /> : !mobileMenu ? <MobileNav /> : ""}
      </div>
      <div className="casestudy">
        <div
          className="casestudy-linearBg"
          style={{ background: `#${selectedProfileData?.colourCode}` }}
        ></div>
        <div className="casestudy-content">
          <div className="casestudy-icon-div">
            <div className="casestudy-icon">
              <img
                src={selectedProfileData?.icon}
                alt={selectedProfileData?.icon}
              />
            </div>
          </div>
          <div className="casestudy-menu">
            {menuData?.length > 0 &&
              menuData?.map((e, i) => {
                return (
                  <div
                    className={`${
                      selectedMenu === e?.name
                        ? "each-cs-menu1"
                        : "each-cs-menu2"
                    }`}
                    key={i}
                    onClick={() => {
                      setSelectedMenu(e?.name);
                    }}
                  >
                    {e.name}
                  </div>
                );
              })}
          </div>
          <div className="casestudy-right-content">
            <div className="casestudy-name-div">
              <div className="casestudy-name-txt">
                {selectedProfileData?.brandName}
              </div>
              <div
                className="web-Btn"
                onClick={(e) =>
                  window.open(
                    `https://${selectedProfileData?.website}`,
                    "_blank"
                  )
                }
              >
                Website
              </div>
            </div>
            <div className="menu-data">
              {selectedMenu === "About" ? (
                <div className="object-data">
                  <div className="obj-top-container">
                    <div className="uline">About The Company</div>
                    <div className="about-txt">
                      {selectedProfileData?.about}
                    </div>
                  </div>
                </div>
              ) : selectedMenu === "Products" ? (
                <div className="approach-data">
                  {selectedProfileData?.approach?.map((e, i) => {
                    return (
                      <div className="each-approach-data">
                        <div
                          className="approach-top-area"
                          style={{
                            background: `#${selectedProfileData?.colourCode}`,
                          }}
                        ></div>
                        <div className="approach-heading">{e?.name}</div>
                        <div className="approach-subhead">{e?.subtitle}</div>
                        <div className="each-approach-text">
                          <div>{e?.description}</div>
                        </div>
                        {/* <div className="each-approach-btn-div">
                        <div className="each-approach-btn">Get Started</div>
                      </div> */}
                      </div>
                    );
                  })}
                </div>
              ) : selectedMenu === "Requirements" ? (
                <div className="req-data">
                  <div className="uline">Initial Requirements</div>
                  <div className="mapping-data">
                    {selectedProfileData?.requirements?.map((e, i) => {
                      return (
                        <>
                          <div className="each-mapping-data" key={i}>
                            <div>
                              <img src={bullet} alt="" />
                            </div>
                            <div>{e?.name}</div>
                          </div>
                          <div className="each-description">
                            {e?.description}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              ) : selectedMenu === "Results" ? (
                <div className="results-data">
                  <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={false}
                    autoPlay={false}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this?.props?.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                  >
                    {selectedProfileData?.design?.map((e, i) => {
                      return (
                        <div className="each-result-data" key={i}>
                          <div className="left-result-data">
                            <div className="left-heading">{e?.name}</div>
                            <div className="left-des">{e?.description}</div>
                          </div>
                          <div className="right-result-data">
                            <img
                              src={e?.link}
                              alt=""
                              // onClick={() => openImageModal(e?.link)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              ) : (
                <div className="soln-data">
                  {selectedProfileData?.testimonial?.map((e, i) => {
                    return (
                      <div className="each-testimonial" key={i}>
                        <div className="quote-area">
                          <div className="quote-img">
                            <img src={quotes} alt="" />
                          </div>
                          <div className="quote-text">{e?.quote}</div>
                        </div>
                        <div className="testimonial-data">
                          <div
                            className="testimonial-name"
                            style={{
                              color: `#${selectedProfileData?.colourCode}`,
                            }}
                          >
                            {e?.name}
                          </div>
                          <div className="testimonial-position">
                            {e?.position}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="mobileContent">
              <div className="sectionContainer" style={{ paddingTop: "2rem" }}>
                {/* <div className="sectionTitle">About</div> */}
                <SectionTitleBg
                  fill={`#${selectedProfileData?.colourCode}`}
                  style={{ marginLeft: "-2rem" }}
                />

                <div className="sectionTitle">About</div>
                <div className="sectionTextStyle">
                  {selectedProfileData?.about}
                </div>
              </div>
              <div className="sectionContainer">
                <SectionTitleBg
                  fill={`#${selectedProfileData?.colourCode}`}
                  style={{ marginLeft: "-2rem" }}
                />
                <div className="sectionTitle">Requirements</div>
                <div className="sectionTextStyle">
                  {selectedProfileData?.requirements?.map((e, i) => {
                    return (
                      <>
                        <div
                          className="each-mapping-data"
                          key={i}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div>
                            <img src={bullet} alt="" />
                          </div>
                          <div
                            style={{
                              paddingLeft: "1.5rem",
                              marginTop: "-5px",
                              fontWeight: 500,
                            }}
                          >
                            {e?.name}
                          </div>
                        </div>
                        <div
                          className="each-description"
                          style={{ paddingLeft: "3rem" }}
                        >
                          {e?.description}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="sectionContainer">
                <SectionTitleBg
                  fill={`#${selectedProfileData?.colourCode}`}
                  style={{ marginLeft: "-2rem" }}
                />
                <div className="sectionTitle">Products</div>
                <div className="sectionTextStyle">
                  {selectedProfileData?.approach?.map((e, i) => {
                    return (
                      <div
                        className="each-approach-data"
                        style={{
                          borderBottom:
                            selectedProfileData?.approach.length > 1
                              ? "2px solid #D2D2D2"
                              : "",
                        }}
                      >
                        <div className="approach-heading">{e?.name}</div>
                        <div className="approach-subhead">{e?.subtitle}</div>
                        <div className="each-approach-text">
                          <div>{e?.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="sectionContainer">
                <SectionTitleBg
                  fill={`#${selectedProfileData?.colourCode}`}
                  style={{ marginLeft: "-2rem" }}
                />
                <div className="sectionTitle">Results</div>
                <div className="sectionTextStyle">
                  {selectedProfileData?.design?.map((e, i) => {
                    if (e.name === selectedCard?.name) {
                      return (
                        <div className="sectionCard" key={i}>
                          <div className="left-result-data">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingBottom: "1.5rem",
                              }}
                            >
                              <div
                                className="left-heading"
                                style={{ padding: "0px" }}
                              >
                                {e?.name}
                              </div>
                              <div style={{ display: "flex", gap: "1rem" }}>
                                <img
                                  src={leftArrow}
                                  alt=""
                                  onClick={() => handlePrev(e)}
                                />
                                <img
                                  src={rightArrow}
                                  alt=""
                                  onClick={() => handleNext(e)}
                                />
                              </div>
                            </div>
                            <div
                              className="left-des"
                              style={{ paddingBottom: "1rem" }}
                            >
                              {e?.description}
                            </div>
                          </div>
                          <div className="right-result-data">
                            <img
                              style={{ width: "100%" }}
                              src={e?.link}
                              alt=""
                              onClick={() => openImageModal(e?.link)}
                            />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="sectionContainer">
                <SectionTitleBg
                  fill={`#${selectedProfileData?.colourCode}`}
                  style={{ marginLeft: "-2rem" }}
                />
                <div className="sectionTitle">Testimonial</div>
                <div className="sectionTextStyle">
                  <div className="soln-data">
                    {selectedProfileData?.testimonial?.map((e, i) => {
                      return (
                        <div className="each-testimonial" key={i}>
                          <div className="quote-area">
                            <div className="quote-img">
                              <img src={quotes} alt="" />
                            </div>
                            <div className="quote-text">{e?.quote}</div>
                          </div>
                          <div
                            className="testimonial-data"
                            style={{ paddingTop: "2rem" }}
                          >
                            <div
                              className="testimonial-name"
                              style={{
                                color: `#${selectedProfileData?.colourCode}`,
                                fontSize: "1.5rem",
                                fontWeight: 500,
                              }}
                            >
                              {e?.name}
                            </div>
                            <div
                              className="testimonial-position"
                              style={{ fontSize: "1.2rem", fontWeight: 500 }}
                            >
                              {e?.position}
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
        </div>

        {selectedImage && (
          <ImageModal imageUrl={selectedImage} closeModal={closeImageModal} />
        )}
      </div>
      {width > 800 ? <FooterContainer /> : ""}
    </div>
  );
};

export default CaseStudyPageSupernova;
