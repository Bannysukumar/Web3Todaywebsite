import axios from "axios";
import { useState, useEffect, createContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

import web3icofull from "./assets/images/icons/webfull.svg";
import authorsFull from "./assets/images/icons/authorsFull.svg";
import web3smallico from "./assets/images/icons/web3logo.svg";

import advertiseIco from "./assets/images/globaldrawer/web3_advertiseico.svg";
import publishIco from "./assets/images/globaldrawer/web3_thenewsico.svg";
import listIco from "./assets/images/globaldrawer/wev3_thelistico.svg";
import candidateIco from "./assets/images/globaldrawer/web3_candidateico.svg";
import roomIco from "./assets/classroomIcon.svg";

import { APP_CODE } from "./config/appConfig";
import { useLoadAppDetails } from "./queryHooks";
import { APP_USER_TOKEN } from "./config";
import Cookies from "js-cookie";

export const GlobalContex = createContext();

export const GlobalContexProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [loginData, setLoginData] = useState(null);
  const [registerUser, setRegisterUser] = useState("loginclosed");
  const [login, setLogin] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedNav, setSelectedNav] = useState("News");
  const [selectedSubNav, setSelectedSubNav] = useState("Articles");
  const [allNavBar, setAllNavBar] = useState(["Articles", "Videos", "WAPPs"]);
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
      websiteTitle: appByCode?.data?.website_title,
      websiteDescription: appByCode?.data?.website_description,
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
  const [selectedMobileMenu, setSelectedMobileMenu] = useState("News");
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

  useEffect(() => {
    if (pathname === "/") {
      setSelectedNav("News");
      setSelectedSubNav("Articles");
    }
    if (pathname === "/news") {
      setSelectedNav("News");
      setSelectedSubNav("Articles");
    }
    if (pathname === "/news/articles") {
      setSelectedNav("News");
      setSelectedSubNav("Articles");
    }
    if (pathname === "/news/videos") {
      setSelectedNav("News");
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
      appName: "Publishers",
      appLogo: web3smallico,
      appFullLogo: web3icofull,
      appColor: "#4B2A91",
      appData: "Don’t Have A/Publishers/Account?",
    },
    {
      appName: "Authors",
      appLogo: publishIco,
      appFullLogo: authorsFull,
      appColor: "#4B2A91",
      appData: " Publish Your/Articles On/Publishers",
    },
    {
      appName: "Advertise",
      appLogo: advertiseIco,
      appFullLogo: web3icofull,
      appColor: "#4B2A91",
      appData: " Advertise Your/Business On/Publishers",
    },
    {
      appName:"Classrooms",
      appLogo:roomIco,
      appFullLogo:roomIco,
      appColor:"#186AB4",
      appData:"ClassRooms",
    }
    // {
    //   appName: "Creating",
    //   appLogo: listIco,
    //   appFullLogo: web3icofull,
    //   appColor: "#4B2A91",
    //   appData: "List Your/Web3 Project/Today",
    // },
    // {
    //   appName: "FundManagers",
    //   appLogo: candidateIco,
    //   appFullLogo: web3icofull,
    //   appColor: "#4B2A91",
    //   appData: " Find The Best/Candidates In/Publishers",
    // },
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
    if (pathname.includes("/news/article/") && loginData) {
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
    if (pathname.includes("/news/article/") && loginData) {
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
    if (pathname.includes("/news/video/") && loginData) {
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
    if (pathname.includes("/news/video/") && loginData) {
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

  const value = {
    loginData,
    setLoginData,
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
  };

  return (
    <GlobalContex.Provider value={value}>{children}</GlobalContex.Provider>
  );
};
