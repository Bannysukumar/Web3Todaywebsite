import axios from "axios";
import { useState, useEffect, createContext, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";

import web3icofull from "./assets/images/icons/webfull.svg";
import authorsFull from "./assets/images/icons/authorsFull.svg";
import web3smallico from "./assets/images/icons/web3logo.svg";

import advertiseIco from "./assets/images/globaldrawer/web3_advertiseico.svg";
import publishIco from "./assets/images/globaldrawer/web3_thenewsico.svg";
import listIco from "./assets/images/globaldrawer/wev3_thelistico.svg";
import candidateIco from "./assets/images/globaldrawer/web3_candidateico.svg";

import { APP_CODE } from "./config/appConfig";
import { useLoadAppDetails } from "./queryHooks";
import { APP_USER_TOKEN } from "./config";
import Cookies from "js-cookie";

export const GlobalContex = createContext();

export const GlobalContexProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [loginData, setLoginData] = useState(null);
  const [statsOpened, setStatsOpened] = useState(false);
  const [fullWidthNav, setFullWidthNav] = useState(false);
  const [registerUser, setRegisterUser] = useState("loginclosed");
  const [login, setLogin] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedNav, setSelectedNav] = useState("Consulting");
  const [selectedSubNav, setSelectedSubNav] = useState("Articles");
  const [allNavBar, setAllNavBar] = useState([
    "Articles",
    "Videos",
    "Case Studies",
    // "Web3 TV",
    // "Web3 Apps",
    // "AirDrops",
    "Markets",
    // "Academy",
  ]);
  const [allArticlesOfNav, setAllArticlesOfNav] = useState([]);

  const [selectedStory, setSelectedStory] = useState(null);

  //login states
  const { appByCode, appByCodeLoading } = useLoadAppDetails(APP_CODE);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [UserIdWeb3TodayAccount, setUserIdWeb3TodayAccount] = useState(false);

  const [email, setEmail] = useState(
    localStorage.getItem("nvestBankLoginAccount") || ""
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("nvestBankAccessToken") || ""
  );
  const [idToken, setIdToken] = useState(
    localStorage.getItem("nvestBankIdToken") || ""
  );
  //web3today
  const [web3UserId, setWeb3UserId] = useState(
    localStorage.getItem("web3UserId") || ""
  );

  const userLoginHandler = (paramEmail, paramAccessToken, paramIdToken) => {
    if (paramEmail && paramAccessToken && paramIdToken) {
      setEmail(paramEmail);
      setAccessToken(paramAccessToken);
      setIdToken(paramIdToken);
    }
    if (!paramEmail || !paramAccessToken || !paramIdToken) {
      Cookies.remove(APP_USER_TOKEN);
    }
  };

  const [categoryId, setCategoryId] = useState("");
  const [authorDetails, setAuthorDetails] = useState(
    { _id: localStorage.getItem("selectedauthor") } || ""
  );

  const appData = useMemo(
    () => ({
      appName: appByCode?.app_name,
      appCode: APP_CODE,
      appLogo: appByCode?.app_icon,
      appFullLogo: appByCode?.data?.color_logo,
      appColorCode: `#${appByCode?.color_codes?.[0]?.primarycolourcode}`,
      appCurrencyName: appByCode?.data?.currencyname
        ? appByCode?.data?.currencyname
        : "USD",
      appCurrencySymbol: appByCode?.data?.currencyname,
      websiteTitle: "Join The Web3 Revolution Today | Web3Today.io",
      websiteDescription:
        "Web3Today is the worlds leading community platform for all things crypto, blockchain, defi, and of course Web3",
      // websiteTitle: appByCode?.data?.website_title,
      // websiteDescription: appByCode?.data?.website_description,
      ownerEmail: appByCode?.operatorData?.email,
      registrationLink: appByCode?.registration_link,
      token: appByCode?.shareTokenData?.token,
    }),
    [appByCode]
  );

  const {
    appName,
    appCode,
    appLogo,
    appFullLogo,
    appColorCode,
    appCurrencyName,
    appCurrencySymbol,
    websiteTitle,
    websiteDescription,
    ownerEmail,
    registrationLink,
    token,
  } = appData;

  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedMobileMenu, setSelectedMobileMenu] = useState("Feed");
  const [selectedMobileSubMenu, setSelectedMobileSubMenu] =
    useState("Articles");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedSearchItem, setSelectedSearchItem] = useState();
  const [allArticles, setAllArticles] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);

  const [showArticle, setShowArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState();
  const [allStoryTemplate, setAllStoryTemplate] = useState([]);
  const [allStoryOriginal, setAllStoryOriginal] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [bankerEmail, setBankerEmail] = useState("");
  const [hideArrow, setHideArrow] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const history = useHistory();

  useEffect(() => {
    console.log(
      window.location.href.split("?")[1]?.includes("code"),
      "lastpartt"
    );
    let theurlpart = window.location.href.split("?")[1]?.includes("code");
    if (theurlpart) {
      setRegisterUser("");
    }
    // setTimeout(() => {
    //   history.push("/")
    // }, 2000)
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      setSelectedNav("Feed");
      setSelectedSubNav("Articles");
    }
    if (pathname === "/feed") {
      setSelectedNav("Feed");
      setSelectedSubNav("Articles");
    }
    if (pathname === "/feed/articles") {
      setSelectedNav("Feed");
      setSelectedSubNav("Articles");
    }
    if (pathname === "/feed/videos") {
      setSelectedNav("Feed");
      setSelectedSubNav("Videos");
    } else if (pathname === "/markets/crypto") {
      setSelectedNav("Markets");
      setSelectedSubNav("Crypto");
    } else if (pathname === "/markets/forex") {
      setSelectedNav("Markets");
      setSelectedSubNav("Forex");
    } else if (pathname === "/markets/defi") {
      setSelectedNav("Markets");
      setSelectedSubNav("Defi");
    } else if (pathname === "/markets/tokens") {
      setSelectedNav("Markets");
      setSelectedSubNav("Tokens");
    } else if (pathname === "/markets/nfts") {
      setSelectedNav("Markets");
      setSelectedSubNav("NFTs");
    } else if (pathname === "/markets/exchange") {
      setSelectedNav("Markets");
      setSelectedSubNav("Exchange");
    } else if (pathname === "/earn/ads") {
      setSelectedNav("Earn");
      setSelectedSubNav("");
    }
  }, [pathname]);

  const globalMenu = [
    {
      appName: "Web3Today",
      appLogo: web3smallico,
      appFullLogo: web3icofull,
      appColor: "#4B2A91",
      appData: "Don’t Have A/Web3Today/Account?",
    },
    {
      appName: "Authors",
      appLogo: publishIco,
      appFullLogo: authorsFull,
      appColor: "#4B2A91",
      appData: " Publish Your/Articles On/Web3Today",
    },
    {
      appName: "Advertise",
      appLogo: advertiseIco,
      appFullLogo: web3icofull,
      appColor: "#4B2A91",
      appData: " Advertise Your/Business On/Web3Today",
    },
    {
      appName: "Creating",
      appLogo: listIco,
      appFullLogo: web3icofull,
      appColor: "#4B2A91",
      appData: "List Your/Web3 Project/Today",
    },
    {
      appName: "FundManagers",
      appLogo: candidateIco,
      appFullLogo: web3icofull,
      appColor: "#4B2A91",
      appData: " Find The Best/Candidates In/Web3Today",
    },
    // {
    //   appName: "OTCDesks",
    //   appLogo: logo6,
    //   appFullLogo: otc_full,
    //   appColor: "#1F4271",
    // },
    // {
    //   appName: "Terminals",
    //   appLogo: logo7,
    //   appFullLogo: terminals_full,
    //   appColor: "#292929",
    // },
  ];

  useEffect(() => {
    if (localStorage.getItem("selectedApp") && selectedApp === null) {
      setSelectedApp(JSON.parse(localStorage.getItem("selectedApp")));
    } else if (localStorage.getItem("selectedApp")) {
      localStorage.setItem("selectedApp", JSON.stringify(selectedApp));
    } else {
      localStorage.setItem("selectedApp", JSON.stringify(globalMenu[0]));
      setSelectedApp(globalMenu[0]);
    }
  }, [selectedApp]);

  useEffect(() => {
    if (localStorage.getItem("loginData")) {
      setLoginData(JSON.parse(localStorage.getItem("loginData")));
    }
  }, [localStorage.getItem("loginData")]);

  useEffect(() => {
    const parsedValue = JSON.parse(localStorage.getItem("userProfile"));
    if (parsedValue !== undefined) {
      setUserProfile(parsedValue);
    }
  }, [localStorage.getItem("userProfile")]);

  useEffect(() => {
    if (localStorage.getItem("bankerEmailNew")) {
      setBankerEmail(localStorage.getItem("bankerEmailNew"));
    } else {
      setBankerEmail(loginData?.user?.email);
    }
    setSelectedApp(JSON.parse(localStorage.getItem("selectedApp")));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://publications.apimachine.com/article/publication/638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        console.log("all articles", data);
        setAllArticles(data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        setAllCategories(data.data);
        setSelectedSearchItem(data.data[0].title);
      });
  }, []);

  const calculateTimeDifference = (timestamp) => {
    var currentTime = new Date();

    var timestampDate = new Date(timestamp);

    var timeDifference = currentTime - timestampDate;

    var timeDifferenceInHours = timeDifference / 1000 / 60 / 60;

    return Math.floor(timeDifferenceInHours);
  };

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://publications.apimachine.com/navbar/publication/638dd769b257b3715a8fbe07`
  //     )
  //     .then(({ data }) => {
  //       setAllNavBar(data.data);
  //       const tempNav = data.data.find((item) => item.navTitle === "Articles");
  //       setSelectedSubNav(tempNav);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(
        `https://publications.apimachine.com/webstory?publication_id=638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        setAllStoryTemplate(data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://publications.apimachine.com/article/navbar/638dd8a8b257b3715a8fbe08`
      )
      .then(({ data }) => {
        // console.log("jhdjwhjfhwef", data);
        setAllArticlesOfNav(data.data);
      });
  }, [selectedSubNav]);

  const startCounter = () => {
    // console.log(articleId, "counterrrrstart")
    if (pathname.includes("/feed/article/") && loginData) {
      const parts = pathname.split("/");
      const articleUrl = parts[parts.length - 1];
      // console.log(articleId, loginData?.user?._id, "counterrrrstart");
      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      axios
        .get(`https://publications.apimachine.com/article/${articleUrl}`)
        .then(({ data }) => {
          axios
            .post(`https://publications.apimachine.com/action/create`, {
              user_id: userProfile?._id,
              publication_id: "638dd769b257b3715a8fbe07",
              service_id: data.data.article[0]._id,
            })
            .then((res) => {
              // console.log(res, "res");
            });
        });
    }
  };

  const stopCounter = () => {
    if (pathname.includes("/feed/article/") && loginData) {
      const parts = pathname.split("/");
      const articleUrl = parts[parts.length - 1];
      // console.log(articleId, loginData?.user?._id, "counterrrrstop");
      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      axios
        .get(`https://publications.apimachine.com/article/${articleUrl}`)
        .then(({ data }) => {
          //  console.log(data.data.article[0]._id, "counterrrrstop");
          axios
            .post(`https://publications.apimachine.com/action/stop`, {
              user_id: userProfile?._id,
              publication_id: "638dd769b257b3715a8fbe07",
              service_id: data.data.article[0]._id,
            })
            .then((res) => {
              // console.log(res, "res");
            });
        });
    }
  };

  const startVideoCounter = () => {
    // console.log(articleId, "counterrrrstart")
    if (pathname.includes("/feed/video/") && loginData) {
      const parts = pathname.split("/");
      const videoUrl = parts[parts.length - 1];
      // console.log(articleId, loginData?.user?._id, "counterrrrstart");
      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      axios
        .get(`https://publications.apimachine.com/video/${videoUrl}`)
        .then(({ data }) => {
          axios
            .post(`https://publications.apimachine.com/videoaction/create`, {
              user_id: userProfile?._id,
              publication_id: "638dd769b257b3715a8fbe07",
              video_id: data.data.video[0]._id,
            })
            .then((res) => {
              // console.log(res, "res");
            });
        });
    }
  };

  const stopVideoCounter = () => {
    if (pathname.includes("/feed/video/") && loginData) {
      const parts = pathname.split("/");
      const videoUrl = parts[parts.length - 1];
      // console.log(articleId, loginData?.user?._id, "counterrrrstop");
      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      axios
        .get(`https://publications.apimachine.com/video/${videoUrl}`)
        .then(({ data }) => {
          //  console.log(data.data.article[0]._id, "counterrrrstop");
          axios
            .post(`https://publications.apimachine.com/videoaction/stop`, {
              user_id: userProfile?._id,
              publication_id: "638dd769b257b3715a8fbe07",
              video_id: data.data.video[0]._id,
            })
            .then((res) => {
              // console.log(res, "res");
            });
        });
    }
  };

  //category page
  const [selectedFormat, setSelectedFormat] = useState("Articles");

  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    if (themeMode == "light") {
      setGlobalColors(
        "212529",
        "4b2a91",
        "Montserrat",
        "",
        convertHexToRGBA("4b2a91", 0.8),
        "ededed5e",
        "ffffff",
        "ffffff",
        "e7e7e7"
      );
    } else {
      setGlobalColors(
        "ffffff",
        "4b2a91",
        "Montserrat",
        "",
        "ffffff",
        "181A20",
        "0b0e11",
        "181A20",
        "999999"
      );
    }
  }, [themeMode]);

  function setGlobalColors(
    textColor,
    primaryColor,
    font,
    profile_pic,
    selectedFontColor,
    highlightColor,
    themeMain,
    themeInside,
    borderColor
  ) {
    textColor = textColor.replace("#", "");
    primaryColor = primaryColor.replace("#", "");

    // console.log("global color set", textColor, primaryColor, font, profile_pic);

    document.documentElement.style.setProperty("--font-color", "#" + textColor);
    document.documentElement.style.setProperty(
      "--background-color",
      "#" + primaryColor
    );
    document.documentElement.style.setProperty(
      "--font-color-selected",
      "#" + selectedFontColor
    );
    document.documentElement.style.setProperty(
      "--font-color-opacity",
      convertHexToRGBA(primaryColor, 0.1)
    );
    document.documentElement.style.setProperty(
      "--highlight-color",
      "#" + highlightColor
    );
    document.documentElement.style.setProperty("--theme-main", "#" + themeMain);
    document.documentElement.style.setProperty(
      "--theme-inside",
      "#" + themeInside
    );
    document.documentElement.style.setProperty(
      "--bordercolor-main",
      "#" + borderColor
    );
    document.documentElement.style.setProperty("--font-fam", font);

    localStorage.setItem("textColorPublication", textColor);
    localStorage.setItem("fontColorSelected", selectedFontColor);
    localStorage.setItem("primaryColorPublication", primaryColor);
    localStorage.setItem("fontPublication", font);
    localStorage.setItem("globalNavImgPublication", profile_pic);
    localStorage.setItem("highlightColor", highlightColor);
    localStorage.setItem("themeMain", themeMain);
    localStorage.setItem("themeInside", themeInside);
    localStorage.setItem("borderColor", borderColor);
  }

  const convertHexToRGBA = (hex, opacity) => {
    // Remove the "#" symbol from the hex color
    const hexValue = hex.replace("#", "");

    // Convert the hex value to RGB values
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    // Construct the RGBA value with the desired opacity
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const [portfolioData, setPortfolioData] = useState([]);
  const [selectedProfileData, setSelectedProfileData] = useState([]);

  const value = {
    loginData,
    setLoginData,
    statsOpened,
    setStatsOpened,
    fullWidthNav,
    setFullWidthNav,
    allArticlesOfNav,
    setAllArticlesOfNav,
    allNavBar,
    setAllNavBar,
    selectedNav,
    setSelectedNav,
    selectedSubNav,
    setSelectedSubNav,
    mobileMenu,
    setMobileMenu,
    selectedMobileMenu,
    setSelectedMobileMenu,
    selectedMobileSubMenu,
    setSelectedMobileSubMenu,
    calculateTimeDifference,

    allCategories,
    setAllCategories,
    selectedSearchItem,
    setSelectedSearchItem,
    allArticles,
    setAllArticles,

    selectedStory,
    setSelectedStory,
    allStoryTemplate,
    setAllStoryTemplate,
    allStoryOriginal,
    setAllStoryOriginal,
    login,
    setLogin,
    collapse,
    setCollapse,
    selectedApp,
    setSelectedApp,
    globalMenu,
    showPopup,
    setShowPopup,
    bankerEmail,
    setBankerEmail,
    startCounter,
    stopCounter,
    startVideoCounter,
    stopVideoCounter,
    hideArrow,
    setHideArrow,
    userProfile,
    setUserProfile,
    trendingVideos,
    setTrendingVideos,

    //login
    appName,
    appCode,
    appLogo,
    appFullLogo,
    appColorCode,
    appCurrencyName,
    appCurrencySymbol,
    websiteTitle,
    websiteDescription,
    ownerEmail,
    registrationLink,
    token,
    appDetailsLoading: appByCodeLoading,
    showMoreInfo,
    setShowMoreInfo,
    UserIdWeb3TodayAccount,
    setUserIdWeb3TodayAccount,
    userLoginHandler,
    web3UserId,
    setWeb3UserId,
    registerUser,
    setRegisterUser,
    categoryId,
    setCategoryId,
    authorDetails,
    setAuthorDetails,
    selectedFormat,
    setSelectedFormat,

    themeMode,
    setThemeMode,
    setGlobalColors,

    //supernova
    portfolioData,
    setPortfolioData,
    selectedProfileData,
    setSelectedProfileData,
  };

  return (
    <GlobalContex.Provider value={value}>{children}</GlobalContex.Provider>
  );
};
