import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GlobalContex } from "../../globalContext";
import "./supernovaambassadors.scss";

//images
import arrowDown from "../../assets/images/Homepage/arrowDown.svg";
import rightArrow from "../../assets/images/Homepage/rightArrow.svg";
import leftArrow from "../../assets/images/Homepage/leftArrow.svg";
import supernovaWhite from "../../assets/images/Homepage/supernovaWhite.svg";
import pointIcon from "../../assets/images/Homepage/point.svg";
import pointIconWhite from "../../assets/images/Homepage/pointWhite.svg";
import logo from "../../assets/images/Homepage/garagelogo.svg";
import logo1 from "../../assets/images/Homepage/starfishlogo2.svg";
import factoryLogo from "../../assets/images/Homepage/factory.svg";
import footerlogo from "../../assets/images/Homepage/footerLogo1.svg";
import dummy1 from "../../assets/images/Homepage/dummy1.svg";
import dummy2 from "../../assets/images/Homepage/dummy2.svg";
import fb from "../../assets/images/Homepage/fb.svg";
import twitter from "../../assets/images/Homepage/twitter.svg";
import insta from "../../assets/images/Homepage/insta.svg";
import linkedin from "../../assets/images/Homepage/linkedin.svg";
import whatsapp from "../../assets/images/Homepage/whatsapp.svg";
import telegram from "../../assets/images/Homepage/telegram.svg";
import utube from "../../assets/images/Homepage/utube.svg";
import one from "../../assets/images/Homepage/one.svg";
import two from "../../assets/images/Homepage/two.svg";
import three from "../../assets/images/Homepage/three.svg";
import four from "../../assets/images/Homepage/four.svg";
import five from "../../assets/images/Homepage/five.svg";
import six from "../../assets/images/Homepage/six.svg";
import footerLogoMob from "../../assets/images/MobileHomepage/footerLogoMob.svg";
import mobHero from "../../assets/images/MobileHomepage/mobHero.svg";
import air from "../../assets/images/Homepage/air.svg";
import naavi from "../../assets/images/Homepage/naavi.svg";
import nirvana from "../../assets/images/Homepage/nirvana.svg";
import ii from "../../assets/images/Homepage/ii.svg";
import garage from "../../assets/images/Homepage/garage.svg";
import web3 from "../../assets/images/Homepage/web3.svg";
import shorupan from "../../assets/images/Homepage/shorupan.svg";
import shorupan1 from "../../assets/images/Homepage/shorupan1.svg";
import shorupan2 from "../../assets/images/Homepage/shorupan.png";
import shorupan3 from "../../assets/images/Homepage/s4.svg";
import bullet from "../../assets/images/Homepage/bullet.png";
import arrWhite from "../../assets/images/MobileHomepage/arrWhite.svg";
import arrBlack from "../../assets/images/MobileHomepage/arrBlack.svg";
import discuss from "../../assets/images/Homepage/discuss.svg";
import marketsverse from "../../assets/images/Homepage/marketsverse.svg";
import marketsverseColor from "../../assets/images/Homepage/marketsverseColor.svg";
import publications from "../../assets/images/Homepage/publications.svg";
import publicationsColor from "../../assets/images/Homepage/publicationsColor.svg";
import malls from "../../assets/images/Homepage/malls.svg";
import mallsColor from "../../assets/images/Homepage/mallsColor.svg";
import firms from "../../assets/images/Homepage/firms.svg";
import firmsColor from "../../assets/images/Homepage/firmsColor.svg";
import classrooms from "../../assets/images/Homepage/classrooms.svg";
import classroomsColor from "../../assets/images/Homepage/classroomsColor.svg";
import vv from "../../assets/images/Homepage/vv.svg";
import vvColor from "../../assets/images/Homepage/vvColor.svg";

import supernova from "../../assets/images/Homepage/popupImg1.svg";
import startupBrokers from "../../assets/images/Homepage/popupImg2.svg";
import onemdStartup from "../../assets/images/Homepage/popupImg3.svg";

import shorupanLink1 from "../../assets/images/Homepage/shorupanLink1.svg";
import shorupanLink2 from "../../assets/images/Homepage/shorupanLink2.svg";
import shorupanLink3 from "../../assets/images/Homepage/shorupanLink3.svg";
import useWindowDimensions from "../../services/WindowSize";
import Spin3DCard from "../../component/3DCard";

import marketVerseLogo from "../../assets/images/ambassadors/marketverse.svg";
import kirdaarLogo from "../../assets/images/ambassadors/kirdaar.svg";

import prasanthImage from "../../assets/images/ventures/prasanth.jpg";
import rajulImage from "../../assets/images/ventures/rajul.jpg";
import rohithImage from "../../assets/images/ventures/rohith.jpg";

const SupernovaAmbassadors = () => {
  const { width, height } = useWindowDimensions();
  const brands = [
    {
      name: "supernova",
      logo: supernova,
      text: "Supernova is the official product development program for the Garage Operating System. We have helped startups across the world get their ideas to the market in record times without record costs. Our team specializes in bringing together all the skills you would otherwise purchase individually.",
      link: "",
    },
    {
      name: "startupBrokers",
      logo: startupBrokers,
      text: "StartupBrokers is an opportunity that allows non-founders to earn from the startup ecosystem. By becoming a certified StartupBroker, you will be able to help companies to find the services they need to grow their business and you get a revenue share of all transactions in your brokerage.",
      link: "https://startupbrokers.com",
    },
    {
      name: "onemdStartup",
      logo: onemdStartup,
      text: "The #1MillionDollarStartup is an online course which teaches you how to convert your passion or idea into a profitable business which has a valuation of 1,000,000.00 USD within 6 months. The program uses the power of the Garage app to launch your product and scale your revenue generation until you hit the 7 figure club.",
      link: "",
    },
  ];

  const history = useHistory();
  const overlayRef = useRef(null);
  const [department, setDepartment] = useState("Research & Development");
  const [wwOption, setWwOption] = useState("Client Web App");
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);

  const {
    portfolioData,
    setPortfolioData,
    selectedProfileData,
    setSelectedProfileData,
  } = useContext(GlobalContex);

  const boxesData = [
    {
      title: "Submit Your Idea",
      subhead:
        "Fill out our simple form Here. Tell us what your startup intends to build and the size of your current operation.",
      icon: one,
    },
    {
      title: "Virtual Pitch (Business)",
      subhead:
        "If we like your vision, you will be requested to perform a 15 minute pitch via Zoom in front of one of our analysts.",
      icon: two,
    },
    {
      title: "Tech Deep Dive",
      subhead:
        "If the pitch goes well, then you will conduct a call with one of our senior technology executives to unpack the software you envision to build.",
      icon: three,
    },
    {
      title: "Starfish Term Sheet",
      subhead:
        "After internal deliberation, Starfish may issue you the standard STA Term Sheet. After which you will have 48 hrs to accept or reject the offer.",
      icon: four,
    },
    {
      title: "We Build Your Product",
      subhead:
        "Over the next 6 months, Marketsverse will build the first version of your product while Starfish gets you ready for your capital raise/product launch.",
      icon: five,
    },
    {
      title: "Share Buy Back Upon Launch",
      subhead:
        "Once your product is ready to launch you can choose to buy back the shares you gave to Starfish or keep us onboard into your launch.",
      icon: six,
    },
  ];

  const qnAndAns = [
    {
      ques: "What are we?",
      answer:
        "Gravitichain is an ecosystem-based intelligence firm, part of the startup studio Starfish. We specialize in providing growth solutions to startups at any stage, offering end-to-end support to help them scale from ideation to market launch.",
    },
    {
      ques: "What we do?",
      answer:
        "At Gravitichain, we establish customized sales and marketing strategies tailored to each client's unique needs, industry, and target audience. Our focus is on propelling startups to achieve rapid and sustainable growth in their respective markets.",
    },
    {
      ques: "How we do?",
      answer:
        "We combine our expertise in branding, marketing, growth strategy, and lead generation to create a comprehensive approach. By leveraging our vast network of investors, industry experts, and in-house tools, we nurture startups into thriving brands with strong brand identities and increased revenues. Through personalized solutions and a dedicated team, we empower startups to defy gravity and amplify their scale in the business cosmos.",
    },
  ];

  const testimonialData = [
    {
      pic: dummy1,
      content:
        "I couldn't be happier with the results Gravitichain delivered. They not only helped us reach our target audience but also provided invaluable insights that helped us optimize our marketing efforts.",
    },
    {
      pic: dummy2,
      content:
        "I couldn't be happier with the results Gravitichain delivered. They not only helped us reach our target audience but also provided invaluable insights that helped us optimize our marketing efforts.",
    },
    {
      pic: dummy1,
      content:
        "I couldn't be happier with the results Gravitichain delivered. They not only helped us reach our target audience but also provided invaluable insights that helped us optimize our marketing efforts.",
    },
    {
      pic: dummy2,
      content:
        "I couldn't be happier with the results Gravitichain delivered. They not only helped us reach our target audience but also provided invaluable insights that helped us optimize our marketing efforts.",
    },
    {
      pic: dummy1,
      content:
        "I couldn't be happier with the results Gravitichain delivered. They not only helped us reach our target audience but also provided invaluable insights that helped us optimize our marketing efforts.",
    },
  ];

  const appsLogo = [
    {
      id: 1,
      logo: marketsverse,
      colorLogo: marketsverseColor,
      link: "https://marketsverse.com",
    },
    {
      id: 2,
      logo: publications,
      colorLogo: publicationsColor,
      link: "https://publications.app",
    },
    {
      id: 3,
      logo: malls,
      colorLogo: mallsColor,
      link: "https://malls.app",
    },
    {
      id: 4,
      logo: firms,
      colorLogo: firmsColor,
      link: "https://firms.app",
    },
    {
      id: 5,
      logo: classrooms,
      colorLogo: classroomsColor,
      link: "https://classrooms.app",
    },
    {
      id: 6,
      logo: vv,
      colorLogo: vvColor,
      link: "https://viral.group",
    },
  ];

  const allTeam = [
    {
      name: "Prasshant S",
      role: "CEO Of Web3Today",
      insta: "https://www.instagram.com/bitcoinmanindia/",
      linkedin: "https://www.linkedin.com/in/bitcoinmanindia/",
      pic: prasanthImage,
      about: "About Prasshant S",
      desc: "Founder of Web3Today , Co-founder at Snapper Future Tech, #1 Super Young Achiever under 30 2019 by Prestigious Hindustan Times, Winner of Forbes Digital and Marquee ICONS of 2021, Investor/Techie at Soul, Entrepreneur at heart. Excited about Web3 and Emerging Tech. Prashant Started his entrepreneur journey in 2012 by co-founding an AI image analytics company, Post exit Prashant discovered excited world of blockchain and cryptocurrencies in 2016. ",
      bookingLink:
        "https://cal.com/rohithprince/product-development-discussion",
    },
    {
      name: "Rajul S",
      role: "CCO Of Web3Today",
      insta: "https://instagram.com/rajultholia",
      linkedin: "https://www.linkedin.com/in/rajuljainsurana",
      pic: rajulImage,
      about: "About Rajul",
      desc: "CCO and Co-founder of Web3Today-Most Rewarding and Innovative Learn to Earn Media platform | Broadcasting creative and educative content | Project Management I am a tech admirer and Web3 enthusiast with a strong background in commerce. My core interest and knowledge lie in the world of finance, and I am now exploring the world of crypto with a focus on Web3. Throughout my career, I have collaborated with leading crypto brands, helping them establish a solid presence. Read More",
      bookingLink:
        "https://cal.com/rohithprince/product-development-discussion",
    },
    {
      name: "Shorupan P",
      role: "CTO Of Web3Today",
      insta: "https://www.instagram.com/shorupan/",
      linkedin: "https://www.linkedin.com/in/shorupan/",
      portfolio: "https://shorupan.com/",
      pic: shorupan,
      about: "About Shorupan",
      desc: "Shorupan entered the cryptocurrency space in 2017 with the formation of the Nvest Group, a Canadian fin-tech holdings company with the stated aim of incubating fin-tech startups. In 2019 the Nvest Group gave birth to Global X Change. Since then, Shorupan has served as CEO of the company overseeing the development of the world’s first brokerage system for fin-tech businesses and initiating the transition of GX into Garage as the world's leading operating system for startups.",
      bookingLink:
        "https://cal.com/rohithprince/product-development-discussion",
    },
    {
      name: "Rohith G",
      role: "CMO Of Web3Today",
      insta: "https://www.instagram.com/mr.rohithprince/",
      linkedin: "www.linkedin.com/in/rohithgullipalli",
      pic: rohithImage,
      about: "About Rohith G",
      desc: "As a Growth Marketer, I specialize in data-driven strategies, optimizing conversions, and creating compelling user acquisition campaigns for startups and Web3.0 projects. I'm dedicated to driving sustainable growth in the tech industry. My passion for Web3.0 fuels my support for decentralized technologies, fostering innovation and trust. In the crypto world, I'm both a trader and investor, making informed financial decisions by closely following market trends and conducting thorough research",
      bookingLink:
        "https://cal.com/rohithprince/product-development-discussion",
    },
  ];

  const playerConfig = {
    youtube: {
      playerVars: {
        // Disable controls and showinfo (the video title and player actions).
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
      },
    },
  };

  const specialityData = [
    {
      id: 0,
      heading: "Digital </br> Transformation",
      points: [
        "Technology & Ecosystem Audit",
        "Digital Strategy",
        "Digital Marketing",
        "Digital Analytics",
      ],
    },
    {
      id: 1,
      heading: "UI/UX & Design </br> Thinking",
      points: ["Branding", "UX Strategy", "Mobile & Web Design"],
    },
    {
      id: 2,
      heading: "Web </br> Development",
      points: [
        "Custom Web Applications",
        "E-Commerce Platforms",
        "Content Management Systems",
        "Dashboard Development",
      ],
    },
    {
      id: 3,
      heading: "Mobile </br> Engineering",
      points: [
        "Android & IOS Development",
        "React Native Development",
        "Wearable Development",
        "Hybrid Development",
      ],
    },
  ];

  const handlePrev = (item) => {
    let index = brands.indexOf(item);
    if (index === 0) {
      setSelectedBrand(brands[brands.length - 1]);
    } else {
      setSelectedBrand(brands[index - 1]);
    }
  };
  const handleNext = (item) => {
    let index = brands.indexOf(item);
    if (index === brands.length - 1) {
      setSelectedBrand(brands[0]);
    } else {
      setSelectedBrand(brands[index + 1]);
    }
  };

  useEffect(() => {
    axios
      .get("https://counsel.apimachine.com/api/getPortfolio")
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "portfolio result");
        setPortfolioData(result);
      })
      .catch((error) => {
        console.log(error, "Error in getting portfolio data");
      });
  }, []);

  const scrollToTop = () => {
    const parentDiv = document.querySelector("#parent-div");
    if (parentDiv) {
      parentDiv.scrollTop = 0;
    }
  };

  return (
    <div
      className="homepage-container"
      style={{ height: width < 800 ? "100vh" : "" }}
    >
      <div className="scrollable-container" id="parent-div">
        <div className="bgImg-container">
          <div className="bg-img">
            <div className="overlay-effect"></div>
            <ReactPlayer
              // style={{ display: window.innerWidth > 768 ? "block" : "none" }}
              className="react-player"
              url="./videoplayback.mp4"
              controls={false} // Set to false to hide the default player controls
              // config={playerConfig}
              width="100vw"
              height="100vh"
              playing
              muted
              loop
            />
          </div>

          <div className="hero-container">
            <div className="hero-text-div">
              <div className="intro-text">
                <span>
                  <img src={factoryLogo} alt="" />
                </span>{" "}
                WEB3 VENTURES
              </div>
              <div className="mob-intro-text">
                <span>
                  <img src={factoryLogo} alt="" />
                </span>{" "}
                WEB3 VENTURES
              </div>
              <div className="hero-text">
                We Will Build Your Web3 Startup For You In Less Than 6 Months
              </div>
              {/* <div className="hero-text-mob">
                Build You’re Startup Within Six Months
              </div> */}
              {/* <div className="hero-sub-text">
                Worried About the Time and Effort Needed to Turn Your Idea into
                a Reality?
              </div> */}
              <div
                className="hero-mob-img"
                onClick={(e) => {
                  window.open("https://calendly.com/iamrakesh/30min", "_blank");
                }}
                style={{ fontWeight: 600 }}
              >
                Book Meeting
                {/* <img
                  src={mobHero}
                  alt=""
                  onClick={(e) => {
                    window.open(
                      "https://calendly.com/iamrakesh/30min",
                      "_blank"
                    );
                  }}
                /> */}
              </div>
              <div className="hero-btn-mob">Get Started Now</div>
            </div>
          </div>
          <div className="hero-img">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img
                src={discuss}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  window.open("https://calendly.com/iamrakesh/30min", "_blank");
                }}
              />
            </div>
          </div>
        </div>

        <div className="ventureCards">
          <Spin3DCard
            front="FACTORY"
            back="For companies looking to build a custom Web3 platform from scratch. We take you from the ideation stage to the product release date within six months."
          />
          <Spin3DCard
            front="MARKETSVERSE"
            back="Use one of our pre-built fully brand-able application templates to launch, manage and grow you’re Web3 app today."
            image={marketVerseLogo}
          />
          <Spin3DCard
            front="KIRDAAR"
            back="Once your product is ready, automate your entire growth operations by using Kirdaar - our proprietary marketing suite for Web3 companies."
            image={kirdaarLogo}
          />
        </div>

        <div className="apps-container">
          {appsLogo.map((item, i) => {
            return (
              <div
                key={i}
                onMouseEnter={(e) => setHoveredLogo(item)}
                onMouseLeave={(e) => setHoveredLogo(null)}
              >
                <img
                  onClick={() => window.open(item.link, "_blank")}
                  src={hoveredLogo?.id === item.id ? item.colorLogo : item.logo}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        <div className="choose-container">
          <div className="choose-text-container">
            <div className="choose-text1">Why</div>
            <div className="choose-text2">Choose Us?</div>
          </div>
          <div className="mob-choose-container">
            <div className="why-text">Why</div>
            <div className="chooseus-text">Choose Us?</div>
            <div className="mob-supernova-txt">
              Web3 Factory is the official product development launch pad for
              the Web3Today ecosystem. We have helped Web3 startups across the
              world get their ideas to the market in record times without record
              costs.
            </div>
            <div
              className="mob-get-btn"
              onClick={(e) => {
                window.open("https://calendly.com/iamrakesh/30min", "_blank");
              }}
            >
              Book Meeting
            </div>
          </div>
          <div className="choose-div">
            <div className="gc-text">
              <div className="starfish-text">
                Web3 Factory is the official product development launch pad for
                the Web3Today ecosystem. We have helped Web3 startups across the
                world get their ideas to the market in record times without
                record costs.
              </div>
              <div
                className="gs-btn"
                onClick={(e) => {
                  window.open("https://calendly.com/iamrakesh/30min", "_blank");
                }}
              >
                Book Meeting
              </div>
            </div>
            <div className="choose-right-scroll-div">
              <div className="each-choose-div">
                <div className="linear-bg"></div>
                <div className="no-div">30</div>
                <div className="text-div">
                  Happy founders who have been able <br /> to bring their
                  products to life
                </div>
              </div>
              <div className="each-choose-div">
                <div className="linear-bg"></div>
                <div className="no-div">90</div>
                <div className="text-div">
                  Apps developed for our clients across <br /> web, mobile and
                  other platforms
                </div>
              </div>
              <div className="each-choose-div">
                <div className="linear-bg"></div>
                <div className="no-div">$1.5M+</div>
                <div className="text-div">
                  Money saved by our clients during their <br /> product
                  development process
                </div>
              </div>
              <div className="each-choose-div">
                <div className="linear-bg"></div>
                <div className="no-div">∞ Hrs</div>
                <div className="text-div">
                  The amount of time saved by our clients <br /> in bringing
                  their product to life
                </div>
              </div>
            </div>
          </div>
        </div>
        {allTeam?.length > 0 &&
          allTeam?.map((eachItem, index) => {
            return (
              <div className="team-container" key={eachItem?.name + index}>
                <div className="team-bg">
                  <div
                    className="image-div"
                    style={{
                      background:
                        eachItem?.name == "Prasshant S" ||
                        eachItem?.name == "Rajul S"
                          ? ""
                          : "white",
                      // borderRadius: "25px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "90%",
                        height: "20px",
                        background:
                          eachItem?.name == "Prasshant S" ||
                          eachItem?.name == "Rajul S"
                            ? ""
                            : "white",
                        marginTop: "0px",
                        borderRadius: "25px",
                        left: "5%",
                        top: "2%",
                      }}
                    >
                      &nbsp;
                    </div>
                    <img src={eachItem?.pic} alt={eachItem?.name} />
                    <div className="shorupan-text-div">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div className="shorupan-text">{eachItem?.name}</div>
                        <div className="shorupanLinks">
                          <img
                            onClick={(e) => {
                              if (eachItem?.portfolio) {
                                window.open(eachItem?.portfolio, "_blank");
                              }
                            }}
                            src={shorupanLink1}
                            alt=""
                            style={{ width: "19px", height: "21px" }}
                          />
                          <img
                            onClick={(e) =>
                              window.open(eachItem?.insta, "_blank")
                            }
                            src={shorupanLink2}
                            alt=""
                            style={{ width: "23px", height: "23px" }}
                          />
                          <img
                            onClick={(e) =>
                              window.open(eachItem?.linkedin, "_blank")
                            }
                            src={shorupanLink3}
                            alt=""
                            style={{ width: "25px", height: "24px" }}
                          />
                        </div>
                      </div>
                      <div className="des-text">{eachItem?.role}</div>
                      <div
                        className="get-btn"
                        // onClick={() => {
                        //   navigate("/payment");
                        // }}
                        onClick={(e) => {
                          window.open(eachItem?.bookingLink, "_blank");
                        }}
                      >
                        Book Meeting
                      </div>
                    </div>
                  </div>
                  <div className="team-div">
                    <div className="team-top-div">
                      <div className="book-text">
                        Book A 1:1 Consultation On Your
                      </div>
                      <div className="book-text-mob">
                        Book A 1:1 Consultation On Your Startup's
                      </div>
                      <div className="product-text">
                        Product Development Strategy
                      </div>
                    </div>
                    <div className="mob-image-div">
                      {/* <div
                        style={{
                          position: "absolute",
                          width: "90%",
                          height: "20px",
                          background: "white",
                          marginTop: "0px",
                          borderRadius: "25px",
                          left: "5%",
                          top: "2%",
                        }}
                      >
                        &nbsp;
                      </div> */}
                      <img src={eachItem?.pic} alt="" />
                      <div className="mob-shorupan-text-div">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div className="mob-shorupan-text">
                            {eachItem?.name}
                          </div>
                          <div className="shorupanLinks">
                            <img
                              onClick={(e) => {
                                if (eachItem?.portfolio) {
                                  window.open(eachItem?.portfolio, "_blank");
                                }
                              }}
                              src={shorupanLink1}
                              alt=""
                              style={{ width: "19px", height: "21px" }}
                            />
                            <img
                              onClick={(e) =>
                                window.open(eachItem?.insta, "_blank")
                              }
                              src={shorupanLink2}
                              alt=""
                              style={{ width: "23px", height: "23px" }}
                            />
                            <img
                              onClick={(e) =>
                                window.open(eachItem?.linkedin, "_blank")
                              }
                              src={shorupanLink3}
                              alt=""
                              style={{ width: "25px", height: "24px" }}
                            />
                          </div>
                        </div>
                        <div className="mob-des-text">{eachItem?.role}</div>
                        <div
                          className="get-btn"
                          // onClick={() => {
                          //   navigate("/payment");
                          // }}
                          onClick={(e) => {
                            window.open(eachItem?.bookingLink, "_blank");
                          }}
                        >
                          Book Meeting
                        </div>
                      </div>
                    </div>
                    <div className="team-bottom-div">
                      <div className="about-text">{eachItem?.about}</div>
                      <div className="about-text1">{eachItem?.desc}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="case-study-container">
          <div className="case-text">Our Work</div>
          <div className="fin-text">Speaks For Itself</div>
          <div className="case-div">
            {portfolioData?.map((e, i) => {
              return (
                <div className="each-case-div" key={i}>
                  <div
                    className="case-img-div"
                    onClick={() => {
                      // console.log(e, "portfolio data");
                      setSelectedProfileData(e);
                      localStorage.setItem(
                        "selectedPortfolio",
                        JSON.stringify(e)
                      );
                      history.push(`/casestudies/${e?.brandName}`);
                    }}
                  >
                    <img src={e?.logo} alt={e?.logo} />
                  </div>
                  <div className="case-text-div1">{e?.brandName}</div>
                  <div className="case-text-div2">{e?.about}</div>
                  <div className="countries-div">
                    <div className="each-country1">
                      <span>
                        <img src={e?.countryIcon} alt="" />
                      </span>
                      <span>{e?.countryName}</span>
                    </div>
                    <div className="each-country">#{e?.industry}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="industries-container">
          <div
            className="background-section"
            style={{
              paddingLeft: width < 800 ? "" : width <= 1400 ? "100px" : "",
            }}
          >
            <div className="industries-text">
              Our Specialty - Bringing It All Together
            </div>
            <div className="industries-text-mob-container">
              <div className="industries-text-mob1">Our Specialty</div>
              <div className="industries-text-mob2">
                Bringing It All Together
              </div>
            </div>
            <div className="industries-div">
              <div className="gc-text">
                <div className="speciality-text">
                  Our team specializes in bringing together all the skills you
                  would otherwise purchase individually. We employ all our
                  resources and experience on your six month development cycle
                  as opposed to billing you for each service.{" "}
                </div>
                <div
                  className="gs-btn"
                  onClick={(e) => {
                    window.open(
                      "https://calendly.com/iamrakesh/30min",
                      "_blank"
                    );
                  }}
                  // style={{ background: "#00000075" }}
                >
                  Book Meeting
                </div>
              </div>
              <div className="right-scroll-div">
                {specialityData.map((speciality) => {
                  return (
                    <div className="each-div" key={speciality.id}>
                      <div className="each-div-top-area">
                        <div
                          className="heading"
                          dangerouslySetInnerHTML={{
                            __html: speciality.heading,
                          }}
                        ></div>
                      </div>
                      <div className="each-div-bottom-area">
                        {speciality.points.map((point, index) => (
                          <div className="each-point" key={index}>
                            <div className="bullet-img">
                              <img src={bullet} alt="" />
                            </div>
                            <div>{point}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="work-with-container">
          <div
            className="work-with-div"
            style={{
              paddingLeft: width < 800 ? "" : width <= 1400 ? "100px" : "",
            }}
          >
            <div className="work-with-text-container">
              <div className="work-with-text1">Your App</div>
              <div className="work-with-text2">What Will You Get?</div>
            </div>
            <div
              className={`${
                wwOption === "Client Web App" ? "ww-text1" : "ww-text2"
              } colorChanger`}
              onClick={() => {
                setWwOption("Client Web App");
              }}
            >
              Client Web App
            </div>

            <div
              className={`${
                wwOption === "Client Mobile Apps" ? "ww-text1" : "ww-text2"
              } colorChanger`}
              onClick={() => {
                setWwOption("Client Mobile Apps");
              }}
            >
              Client Mobile Apps
            </div>

            <div
              className={`${
                wwOption === "Robust Backend" ? "ww-text1" : "ww-text2"
              } colorChanger`}
              onClick={() => {
                setWwOption("Robust Backend");
              }}
            >
              Robust Backend
            </div>

            <div
              className={`${
                wwOption === "Admin Dashboards" ? "ww-text1" : "ww-text2"
              } colorChanger`}
              onClick={() => {
                setWwOption("Admin Dashboards");
              }}
            >
              Admin Dashboards
            </div>

            <div
              className={`${
                wwOption === "DevOps & Security" ? "ww-text1" : "ww-text2"
              } colorChanger`}
              onClick={() => {
                setWwOption("DevOps & Security");
              }}
            >
              DevOps & Security
            </div>

            <div
              className={`${
                wwOption === "3rd Party Integrations" ? "ww-text1" : "ww-text2"
              } colorChanger`}
              onClick={() => {
                setWwOption("3rd Party Integrations");
              }}
            >
              3rd Party Integrations
            </div>

            <div className="ww-option-container-mob">
              <div
                onClick={() => {
                  setWwOption("Client Web App");
                }}
                className={`${
                  wwOption === "Client Web App"
                    ? "ww-mob-selected"
                    : "ww-mob-default"
                }`}
              >
                Client Web App
              </div>

              <div
                onClick={() => {
                  setWwOption("Client Mobile Apps");
                }}
                className={`${
                  wwOption === "Client Mobile Apps"
                    ? "ww-mob-selected"
                    : "ww-mob-default"
                }`}
              >
                Client Mobile Apps
              </div>

              <div
                onClick={() => {
                  setWwOption("Robust Backend");
                }}
                className={`${
                  wwOption === "Robust Backend"
                    ? "ww-mob-selected"
                    : "ww-mob-default"
                }`}
              >
                Robust Backend
              </div>

              <div
                onClick={() => {
                  setWwOption("Admin Dashboards");
                }}
                className={`${
                  wwOption === "Admin Dashboards"
                    ? "ww-mob-selected"
                    : "ww-mob-default"
                }`}
              >
                Admin Dashboards
              </div>

              <div
                onClick={() => {
                  setWwOption("DevOps & Security");
                }}
                className={`${
                  wwOption === "DevOps & Security"
                    ? "ww-mob-selected"
                    : "ww-mob-default"
                }`}
              >
                DevOps & Security
              </div>

              <div
                onClick={() => {
                  setWwOption("3rd Party Integrations");
                }}
              >
                3rd Party Integrations
              </div>
            </div>
          </div>
          <div
            className="ww-right-div"
            style={{ paddingRight: width <= 1400 ? "100px" : "" }}
          >
            {/* <div className="right-top">
              <div className="right-top-title">Delivered</div>
              <div className="right-top-subtitle">Without Record Costs</div>
            </div> */}
            <div className="marginleft">
              <div className="cardContainer">
                <div className="card" style={{ alignItems: "flex-start" }}>
                  <div className="cardTitle">Monthly Instalments</div>
                  <div className="cardAmount">$1,999.00</div>
                  <div className="cardDuration">
                    Per Month For <span>6 MONTHS</span>
                  </div>
                  <div className="listStyle">
                    <img src={pointIcon} alt="" />
                    <div>Cancel at any time</div>
                  </div>
                  <div className="listStyle">
                    <img src={pointIcon} alt="" />
                    <div>Get 6 extra monthls of AMC for free after release</div>
                  </div>
                  <div
                    className="cardButton"
                    onClick={(e) => {
                      window.open(
                        "https://calendly.com/iamrakesh/30min",
                        "_blank"
                      );
                    }}
                  >
                    Book Meeting
                  </div>
                </div>
                <div
                  className="card"
                  style={{
                    color: "white",
                    background: "#ffffff40",
                    alignItems: "flex-start",
                  }}
                >
                  <div className="cardTitle" style={{ color: "white" }}>
                    Express
                  </div>
                  <div className="cardAmount" style={{ color: "white" }}>
                    $9,999.00
                  </div>
                  <div className="cardDuration" style={{ color: "white" }}>
                    Made In 2 Payments
                  </div>
                  <div className="listStyle">
                    <img src={pointIconWhite} alt="" />
                    <div>$4,999.00 due upon initiation</div>
                  </div>
                  <div className="listStyle">
                    <img src={pointIconWhite} alt="" />
                    <div>$4,999.00 due upon completion of the project</div>
                  </div>
                  <div
                    onClick={(e) => {
                      window.open(
                        "https://calendly.com/iamrakesh/30min",
                        "_blank"
                      );
                    }}
                    className="cardButton"
                    style={{
                      color: "white",
                      // border: "1px solid white",
                      // background: "#00000075",
                    }}
                  >
                    Book Meeting
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="ww-right-div">
            <div className="ww-right-top">
              <div className="departments">
                <div
                  className={
                    department === "Research & Development"
                      ? "each-dep1"
                      : "each-dep"
                  }
                  onClick={() => {
                    setDepartment("Research & Development");
                  }}
                >
                  Research & Development
                  <div className="arr-div">
                    <img
                      src={
                        department === "Research & Development"
                          ? arrWhite
                          : arrBlack
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className={
                    department === "Scoping & Design" ? "each-dep1" : "each-dep"
                  }
                  onClick={() => {
                    setDepartment("Scoping & Design");
                  }}
                >
                  Scoping & Design
                  <div className="arr-div">
                    <img
                      src={
                        department === "Scoping & Design" ? arrWhite : arrBlack
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className={
                    department === "Architecture" ? "each-dep1" : "each-dep"
                  }
                  onClick={() => {
                    setDepartment("Architecture");
                  }}
                >
                  Architecture
                  <div className="arr-div">
                    <img
                      src={department === "Architecture" ? arrWhite : arrBlack}
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className={
                    department === "UI Design" ? "each-dep1" : "each-dep"
                  }
                  onClick={() => {
                    setDepartment("UI Design");
                  }}
                >
                  UI Design
                  <div className="arr-div">
                    <img
                      src={department === "UI Design" ? arrWhite : arrBlack}
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className={
                    department === "Frontend Development"
                      ? "each-dep1"
                      : "each-dep"
                  }
                  onClick={() => {
                    setDepartment("Frontend Development");
                  }}
                >
                  Frontend Development
                  <div className="arr-div">
                    <img
                      src={
                        department === "Frontend Development"
                          ? arrWhite
                          : arrBlack
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className={
                    department === "Backend Development"
                      ? "each-dep1"
                      : "each-dep"
                  }
                  onClick={() => {
                    setDepartment("Backend Development");
                  }}
                >
                  Backend Development
                  <div className="arr-div">
                    <img
                      src={
                        department === "Backend Development"
                          ? arrWhite
                          : arrBlack
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="description">
                Experimenting with ideas and technologies which may not be a
                product. Software Development- Working on a specific product
                desired by any client or based on market demand.
              </div>
            </div>
            <div className="ww-right-bottom">
              <div className="data-box">
                <iframe
                  title="YouTube Video"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/_QMGJAd6mHU"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="background-div"></div>
            </div>
          </div> */}
        </div>

        {/* <div className="wat-u-get-container">
          <div className="wat-u-get-div">
            <div className="wat-u-get-text">The Supernova Process</div>
          </div>
          <div className="boxes-container">
            {boxesData.map((e, i) => {
              const modifiedSubhead = e.subhead
                .split("Here")
                .join(
                  '<span style="background: linear-gradient(90deg, #59A2DD 0%, #B580F2 100%); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Here</span>'
                )
                .split("STA Term Sheet")
                .join(
                  '<span style="background: linear-gradient(90deg, #59A2DD 0%, #B580F2 100%); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">STA Term Sheet</span>'
                );
              return (
                <div className="each-box" key={i}>
                  <div className="each-box-img">
                    <img src={e.icon} alt="" />
                  </div>
                  <div className="box-head">{e.title}</div>
                  <div
                    className="box-sub-head"
                    dangerouslySetInnerHTML={{ __html: modifiedSubhead }}
                  />
                </div>
              );
            })}
          </div>
        </div> */}

        {/* <div className="about-company-container">
          <div className="about-company-div">
            <div className="about-company-text">About our company</div>
            <div>
              <img src={star1} alt="" />
            </div>
          </div>
          <div className="about-company-box">
            <div className="about-image">
              <img src={about} alt="" />
            </div>
            <div className="ac-right-div">
              <div className="ac-right-box"></div>
              <div className="ac-right-text-div">
                {qnAndAns.map((e, i) => {
                  return (
                    <div className="each-qn" key={i}>
                      <div className="qn">{e.ques}</div>
                      <div className="ans">{e.answer}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="testimonial-section">
          <div className="testimonial-div">
            <div className="testimonial-text">
              Businesses of all sizes succeed with Supernova
            </div>
            <div className="testimonial-mob-txt">
              Hear From Supernova Entrepreneurs
            </div>
            <div className="testimonial-star">
              <img src={star} alt="" />
            </div>
          </div>
          <div className="testimonial-container">
            {testimonialData.map((e, i) => {
              return (
                <div className="each-testimonial" key={i}>
                  <div className="testimonial-img">
                    <img src={e.pic} alt="" />
                  </div>
                  <div className="testimonial-img-mob">
                    <img src={mobdummy} alt="" />
                  </div>
                  <div className="testimonial-data">
                    <div className="quotee">
                      <img src={quote} alt="" />
                    </div>
                    <div className="review">{e.content}</div>
                    <div className="name">Name</div>
                    <div className="des">Designation</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}

        {/* <div className="max-section">
          <div className="max-container">
            <div className="max-text-div">
              <div className="text">
                <div className="left-star">
                  <img src={star} alt="" />
                </div>
                <div>Maximize ROI, Maximize Results</div>
              </div>
              <div className="text">
                <div className="right-star">
                  <img src={star} alt="" />
                </div>
                <div>Let your spends justify your returns</div>
              </div>
            </div>
            <div className="max-text-div-mob">
              <div className="text">
                <div className="right-star">
                  <img src={star} alt="" />
                </div>
                <div>Maximize ROI,</div>
              </div>
              <div className="text">
                <div>Maximize Results</div>
              </div>
              <div className="text">
                <div>Let your spends </div>
              </div>
              <div className="text">
                <div>justify your returns</div>
              </div>
            </div>
            <div className="book-btn">Get Started Now</div>
          </div>
        </div> */}
      </div>
      {showPopup && window.innerWidth > 800 ? (
        <div className="overlay" onClick={(e) => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="imgRow">
              {/* {brands.map((item, index) => (
                <div className="imgCol">
                  <img
                    onClick={(e) => setSelectedBrand(item)}
                    src={item?.logo}
                    alt=""
                    style={{
                      opacity: selectedBrand?.name === item?.name ? 1 : 0.3,
                    }}
                  />
                  <div className="verticalDiv">&nbsp;</div>
                </div>
              ))} */}
              <div className="imgCol">
                <img
                  onClick={(e) => setSelectedBrand(brands[0])}
                  src={brands[0]?.logo}
                  alt=""
                  style={{
                    opacity: selectedBrand?.name === brands[0]?.name ? 1 : 0.3,
                  }}
                />
              </div>
              <div className="verticalDiv">&nbsp;</div>
              <div className="imgCol">
                <img
                  onClick={(e) => setSelectedBrand(brands[1])}
                  src={brands[1]?.logo}
                  alt=""
                  style={{
                    opacity: selectedBrand?.name === brands[1]?.name ? 1 : 0.3,
                  }}
                />
              </div>
              <div className="verticalDiv">&nbsp;</div>
              <div className="imgCol">
                <img
                  onClick={(e) => setSelectedBrand(brands[2])}
                  src={brands[2]?.logo}
                  alt=""
                  style={{
                    opacity: selectedBrand?.name === brands[2]?.name ? 1 : 0.3,
                  }}
                />
              </div>
            </div>
            <div className="brandDesc">{selectedBrand?.text}</div>
            {selectedBrand?.name === "supernova" ? (
              <div className="popupButton">Currently Selected</div>
            ) : selectedBrand?.name === "startupBrokers" ? (
              <div
                className="popupButton"
                onClick={(e) => {
                  window.open("https://startupbrokers.com/", "_blank");
                }}
              >
                Learn More
              </div>
            ) : (
              <div className="popupButton">Coming Soon</div>
            )}
          </div>
        </div>
      ) : showPopup && window.innerWidth < 800 ? (
        <div className="overlayMobile" onClick={(e) => setShowPopup(false)}>
          <div className="popupMobile" onClick={(e) => e.stopPropagation()}>
            <div>
              {brands.map((item) => {
                if (item.name === selectedBrand.name) {
                  return (
                    <div className="brandnav">
                      <img
                        src={leftArrow}
                        alt=""
                        onClick={(e) => handlePrev(item)}
                      />
                      <img
                        src={selectedBrand?.logo}
                        alt=""
                        style={{ width: "14rem", height: "3rem" }}
                      />
                      <img
                        src={rightArrow}
                        alt=""
                        onClick={(e) => handleNext(item)}
                      />
                    </div>
                  );
                }
              })}

              <div className="brandDesc">{selectedBrand?.text}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {selectedBrand?.name === "supernova" ? (
                <div className="popupButton">Currently Selected</div>
              ) : selectedBrand?.name === "startupBrokers" ? (
                <div
                  className="popupButton"
                  onClick={(e) => {
                    window.open("https://startupbrokers.com/", "_blank");
                  }}
                >
                  Learn More
                </div>
              ) : (
                <div className="popupButton">Coming Soon</div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SupernovaAmbassadors;
