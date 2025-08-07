import { useState, useEffect, createContext,useRef } from "react";

// import MyCrypto from "./static/images/menulogos/myCrypto.svg";

import logo1 from "./static/images/globalSidebarLogos/1.svg";
import logo2 from "./static/images/globalSidebarLogos/2.svg";
import logo3 from "./static/images/globalSidebarLogos/3.svg";
import logo4 from "./static/images/globalSidebarLogos/4.svg";
import logo5 from "./static/images/globalSidebarLogos/5.svg";
import logo6 from "./static/images/globalSidebarLogos/6.svg";
import logo7 from "./static/images/globalSidebarLogos/7.svg";

// import Meta from "./static/images/icons/meta.svg";
// import Banker from "./static/images/menulogos/Banker.svg";
// import Capitalized from "./static/images/menulogos/Capitalized.svg";
// import Create from "./static/images/menulogos/Create.svg";
// import FundManager from "./static/images/menulogos/FundManager.svg";
// import OTCDesks from "./static/images/menulogos/OtcDesks.svg";
// import Terminals from "./static/images/menulogos/Terminals.svg";

import myCrypto_full from "./static/images/logos/myCrypto_full.svg";

// import meta_full from "./static/images/logos/mverse_full.svg";
import banker_full from "./static/images/logos/banker_full.svg";
import cap_full from "./static/images/logos/cap_full.svg";
import create_full from "./static/images/logos/create_full.svg";
import otc_full from "./static/images/logos/otc_full.svg";
import terminals_full from "./static/images/logos/terminals_full.svg";
import funds_full from "./static/images/logos/funds_full.svg";
import cryptomarket_full from "./static/images/logos/cryptomarket_full.svg";

import crm from "./static/images/sidebarIcons/crm.svg";
import dash from "./static/images/sidebarIcons/dash.svg";
// import affiliates from "./static/images/sidebarIcons/affiliates.svg";
// import vaults from "./static/images/sidebarIcons/vaults.svg";
// import terminal from "./static/images/sidebarIcons/terminal.svg";
// import bonds from "./static/images/sidebarIcons/bonds.svg";
// import loans from "./static/images/sidebarIcons/socially.svg";
import Lock from "./static/images/icons/lock.svg";
import defaultImg from "./static/images/icons/app_placeholder.png";
import profile from "./static/images/sidebarIcons/profile.svg";
import content from "./static/images/sidebarIcons/content.svg";
import publication from "./static/images/sidebarIcons/publication.svg";
import rewardsIcon from "./static/images/sidebarIcons/rewards.svg";
import AdminContentIcon from "./static/images/sidebarIcons/AdminContentIco.svg";
import hyfi from "./static/images/templateLogos/hyfi.svg";
import wealth from "./static/images/templateLogos/wealth.svg";
import otcDesks from "./static/images/templateLogos/otcDesks.svg";
import terminals from "./static/images/templateLogos/terminals.svg";
import fundManagement from "./static/images/templateLogos/fundManagement.svg";
import nftMarketplace from "./static/images/templateLogos/nftMarketplace.svg";
import nftReward from "./static/images/templateLogos/nftReward.svg";
import defi from "./static/images/templateLogos/defi.svg";
import signals from "./static/images/templateLogos/signals.svg";
import web3icofull from "./static/images/icons/webfull.svg";
import authorsFull from "./static/images/icons/authorsFull.svg";
import publicationsFull from "./static/images/templateLogos/PublicationsFull.svg";
import web3smallico from "./static/images/icons/web3logo.svg";
import roomIco from "./assets/classroomIcon.svg";

import vaults_full from "./static/images/templateLogos/vaults_full.svg";
import tokenSwap_full from "./static/images/templateLogos/tokenSwap_full.svg";
import moneyMarkets_full from "./static/images/templateLogos/moneyMarkets_full.svg";
import affiliate_full from "./static/images/templateLogos/affiliate_full.svg";
import bondIssuance_full from "./static/images/templateLogos/bondIssuance_full.svg";

import bondMarkets_full from "./static/images/templateLogos/bondMarkets_full.svg";
import portfolioAi_full from "./static/images/templateLogos/portfolioAi_full.svg";
import shareTokenIssuance_full from "./static/images/templateLogos/shareTokenIssuance_full.svg";
import shareTokenMarket_full from "./static/images/templateLogos/shareTokenMarket_full.svg";
import fundsCoinIssuance_full from "./static/images/templateLogos/fundsCoinIssuance_full.svg";
import fundCoinMarketplace_full from "./static/images/templateLogos/fundCoinMarketplace_full.svg";
import indexFundsIssuance_full from "./static/images/templateLogos/indexFundsIssuance_full.svg";
import indexFundsMarketplace_full from "./static/images/templateLogos/indexFundsMarketplace_full.svg";

import { ReactComponent as Collapse_img } from "./static/images/icons/collapse.svg";
import { ReactComponent as Collapse1_img } from "./static/images/icons/collapse1.svg";

import revenue from "./static/images/sidebarIcons/revenue.svg";
import assets from "./static/images/sidebarIcons/assets.svg";
import tokenswapico from "./static/images/sidebarIcons/tokenswapico.svg";
import externalwithdraw from "./static/images/sidebarIcons/externalicon.svg";
import GXTicon from "./static/images/sidebarIcons/GXTicon.svg";
import TokenHashIco from "./static/images/sidebarIcons/TokenHashIco.svg";

import advertiseIco from "./static/images/globaldrawer/web3_advertiseico.svg";
import publishIco from "./static/images/globaldrawer/web3_thenewsico.svg";
import listIco from "./static/images/globaldrawer/wev3_thelistico.svg";
import candidateIco from "./static/images/globaldrawer/web3_candidateico.svg";
import { useLocation } from "react-router-dom";

import axios from "axios";
import pubAdminIcon from "./assets/MainPageImgs/pubAdminIcon.svg";
import AuthorMainImg from "./assets/MainPageImgs/AuthorMainImg.svg";
import AdvertiseMainImg from "./assets/MainPageImgs/AdvertiseMainImg.svg";

export const GlobalContex = createContext();

export const GlobalContexProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(null);
  const [login, setLogin] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [banker, setBanker] = useState(null);
  const [bankerEmail, setBankerEmail] = useState("");
  const [bankerTag, setBankerTag] = useState("");
  const [allBankers, setAllBankers] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [payoutDrawer, setPayoutDrawer] = useState(false);

  const [selectedFilter1, setSelectedFilter1] = useState(null);
  const [selectedFilter2, setSelectedFilter2] = useState("");
  const [selectedFilter21, setSelectedFilter21] = useState("");
  const [filter1, setFilter1] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [customerEmailFilter, setCustomerEmailFilter] = useState(null);
  const [openCoinFilter, setOpenCoinFilter] = useState(false);
  const [refetchPayout, setRefetchPayout] = useState(false);

  const [globalMenuAdd, setGlobalMenuAdd] = useState(true);
  const [refetchAuthors, setRefetchAuthors] = useState(false);
  const [refetchRequest, setRefetchRequest] = useState(false);
  const [selectedFilterRequest, setSelectedFilterRequest] = useState("pending");
  const [slider, setSlider] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [refetchCourses, setRefetchCourses] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  const [showDraw, setShowDraw] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSplashCoin, setSelectedSplashCoin] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTemplateMenu, setSelectedTemplateMenu] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedBrandApp, setSelectedBrandApp] = useState();
  const [allBrands, setAllBrands] = useState([]);
  const [allApps, setAllApps] = useState([]);
  const [mcbAdminLoading, setMcbAdminLoading] = useState(false);
  const [refetchCategory, setRefetchCategory] = useState(false);
  const [refetchNavbar, setRefetchNavbar] = useState(false);
  const [refetchVideos, setRefetchVideos] = useState(false);
  const [updatedSuccessful, setupdatedSuccessful] = useState(false);
  const [titlesData, setTitlesData] = useState([]);

  const [selectedMcbDashboardApp, setSelectedMcbDashboardApp] = useState(null);
  const [showSubDraw, setShowSubDraw] = useState(false);

  const [refetchAppData, setRefetchAppData] = useState(false);
  const [refreshStories, setRefreshStories] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(false);
  const [selectedAssetFilters, setSelectedAssetFilters] = useState([]);
  const [selectedStatusFilters, setSelectedStatusFilters] = useState([]);
  const [selectedLengthFilter, setSelectedLengthFilter] = useState("");
  const [requestsDrawer, setRequestsDrawer] = useState(false);

  const [allAppsForBrand, setAllAppsForBrand] = useState([]);

  const [refetchBrands, setRefetchBrands] = useState(false);
  const [refetchApps, setRefetchApps] = useState(false);

  const [selectedMcbDashboardBrand, setSelectedMcbDashboardBrand] =
    useState(null);
  const [refetchBrandData, setRefetchBrandData] = useState(false);

  const [selectedMcbAssetsCrypto, setSelectedMcbAssetsCrypto] = useState(null);
  const [selectedMcbAssetsForex, setSelectedMcbAssetsForex] = useState(null);

  const [refetchFieldGroupData, setRefetchFieldGroupData] = useState(false);

  const [selectedFieldGroup, setSelectedFieldGroup] = useState(false);
  const [allPublications, setAllPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);

  const [isMobile, setIsMobile] = useState(false);
  const [wideDrawer, setWideDrawer] = useState(false);
  const [theCurrency, setTheCurrency] = useState("");
  const [refreshCall, setRefreshCall] = useState(false);
  const [coinIIRD, setCoinIIRD] = useState("");
  const [tabSelected, setTabSelected] = useState("");
  const [requestText, setRequestText] = useState("");
  const [theAsset, setTheAsset] = useState([]);
  const [crmUser, setCrmUser] = useState("");
  const [crmData, setCrmData] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState("");
  const [licenseCheck, setLicenseCheck] = useState("");
  const [actionsSubDrawer, setActionsSubDrawer] = useState(false);
  const [videoActionsSubDrawer, setVideoActionsSubDrawer] = useState(false);
  const [StorySubDrawer, setStorySubDrawer] = useState(false);
  const [profileSubDrawer, setProfileSubDrawer] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  const [affiliateDrawer, setAffiliateDrawer] = useState(false);
  // const [contentTabSelected, setContentTabSelected] = useState("");
  const [refetchData, setRefetchData] = useState(false);
  const [refechProfile, setRefechProfile] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [coinSelect, setCoinSelect] = useState({
    coinImage:
      "https://apimachine-s3.s3.us-east-2.amazonaws.com/coinImages/dollar.png",
    coinName: "US Dollar",
    coinSymbol: "USD",
    symbol: "$",
    price: { USD: 1 },
  });
  const [coinLoading, setCoinLoading] = useState(false);
  const [coinListObject, setCoinListObject] = useState();
  useEffect(() => {
    axios

      .get("https://comms.globalxchange.io/coin/vault/get/all/coins")
      .then(({ data }) => {
        if (data.status) {
          let obj = {};
          data.coins.forEach((coin) => {
            obj[coin.coinSymbol] = coin;
          });
          setCoinListObject(obj);
        }
      });
  }, []);

  useEffect(() => {
    if (tabSelected !== "Requests") {
      setFilterDrawer(false);
    }
  }, [tabSelected]);

  useEffect(() => {
    setCoinLoading(true);
    axios
      .post("https://comms.globalxchange.io/coin/vault/service/coins/get", {
        app_code: "ice",
      })
      .then((res) => {
        const { data } = res;
        if (data.status) {
          const { coins_data } = data;
          setCoinList(coins_data);
        }
      })
      .finally(() => setCoinLoading(false));
  }, []);

  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || "App Owner"
  );
  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  const [appList, setAppList] = useState([]);
  const [appLoading, setAppLoading] = useState(false);
  useEffect(() => {
    setAppLoading(true);
    axios
      .get("https://comms.globalxchange.io/gxb/apps/get")
      .then((res) => {
        const { data } = res;
        if (data.status) {
          const { apps } = data;
          setAppList(apps);
        }
      })
      .finally(() => setAppLoading(false));
  }, []);
  const [appListFinal, setAppListFinal] = useState([]);

  const [authorDetail, setAuthorDetail] = useState(null);
  const [refetchArticles, setRefetchArticles] = useState(false);
  const [scrollTo, setScrollTo] = useState("");
  const sidebarRef = useRef(null);

  const handleButtonClick = () => {
    // console.log("Scroll position:",sidebarRef.current.viewScrollTop);
    if (sidebarRef.current) {
       setScrollTo(sidebarRef.current.viewScrollTop);
    }
  };

  const globalMenu = [
    {
      appName: "Publishers",
      appLogo: pubAdminIcon,
      appFullLogo: publicationsFull,
      appColor: "#4B9DDC",
      appTextColor: "#212529",
      appData: "Don’t Have A/Publications/Account?",
      DispName: "For Publishers",
    },
    {
      appName: "Authors",
      appLogo: AuthorMainImg,
      appFullLogo: publicationsFull,
      appColor: "#4B9DDC",
      appTextColor: "#212529",
      appData: " Create Your Own/AI Powered Blog/Today",
      DispName: "For Creators",
    },
    // {
    //   appName: "Advertise",
    //   appLogo: AdvertiseMainImg,
    //   appFullLogo: web3icofull,
    //   appTextColor: "#212529",
    //   appColor: "#4B9DDC;",
    //   appData: " Advertise Your/Business On/Publishers",
    // },
    // {
    //   appName:"Classrooms",
    //   appLogo:roomIco,
    //   appFullLogo:roomIco,
    //   appTextColor: "#212529",
    //   appColor:"#186AB4",
    //   appData:"ClassRooms",
    //   DispName: "ClassRooms"
    // }
  ];

  // const { pathname } = useLocation();
  // console.log(pathname + " pathname")

  const mcbMenu = [
    {
      menuName: "",
      menuIcon: "",
      enabled: "",
    },
    // {
    //   menuName: "CRM",
    //   menuIcon: crm,
    //   enabled: true,
    // },
    // {
    //   menuName: "Revenue",
    //   menuIcon: revenue,
    //   enabled: true,
    // },
    // {
    //   menuName: "Assets",
    //   menuIcon: assets,
    //   enabled: true,
    // },
    // {
    //   menuName: "TokenSwap",
    //   menuIcon: tokenswapico,
    //   enabled: true,
    // },
    // {
    //   menuName: `External Withdrawals`,
    //   menuIcon: externalwithdraw,
    //   enabled: true,
    // },
    // {
    //   menuName: `GXT Marketplace`,
    //   menuIcon: GXTicon,
    //   enabled: true,
    // },
    // {
    //   menuName: `TokenHash`,
    //   menuIcon: TokenHashIco,
    //   enabled: true,
    // },
  ];
  const web3Menu = [
    {
      menuName: "Management",
      menuIcon: publication,
      enabled: true,
    },
    {
      menuName: "Rewards",
      menuIcon: rewardsIcon,
      enabled: true,
    },
    {
      menuName: "Content",
      menuIcon: AdminContentIcon,
      enabled: true,
    },
    {
      menuName: "Hire",
      menuIcon: revenue,
      enabled: true,
    },
  ];

  const authorsMenu = [
    {
      menuName: "My Profile",
      menuIcon: profile,
      enabled: true,
    },
    {
      menuName: "My Content",
      menuIcon: content,
      enabled: true,
    },
  ];

  const ClassMenu = [
    {
      menuName: "Content",
      menuIcon: content,
      enabled: true,
    },
    {
      menuName: "CRM",
      menuIcon: crm,
      enabled: true,
    },
  ];

  const templateList = [
    {
      logo: hyfi,
      name: "HyFi",
      desc: "The HyFi (Hybrid Finance) template enables your users to grow their digital asset portfolio through fixed income instruments. Both in the form of a variable daily interest rate and through fixed term bonds.",
      cards: [
        { logo: vaults_full },
        { logo: tokenSwap_full },
        { logo: moneyMarkets_full },
        { logo: affiliate_full },
        { logo: bondIssuance_full },
      ],
    },
    {
      logo: wealth,
      name: "Wealth",
      desc: "The Wealth Management template offers a total portfolio management system to your users which allows them to track their digital net-worth while giving them access to fixed income, equity, and crypto markets.",
      cards: [
        { logo: vaults_full },
        { logo: tokenSwap_full },
        { logo: moneyMarkets_full },
        { logo: affiliate_full },
        { logo: bondIssuance_full },
        { logo: bondMarkets_full },
        { logo: portfolioAi_full },
        { logo: shareTokenIssuance_full },
        { logo: shareTokenMarket_full },
        { logo: fundsCoinIssuance_full },
        { logo: fundCoinMarketplace_full },
        { logo: indexFundsIssuance_full },
        { logo: indexFundsMarketplace_full },
      ],
    },
    {
      logo: otcDesks,
      name: "OTCDesks",
      desc: "The OTCDesk is a standard fiat to cryptocurrency exchange application which empowers your users to fund their accounts with their local currency and swap into digital assets.",
      cards: [],
    },
    {
      logo: terminals,
      name: "Terminals",
      desc: "Terminals is an advanced cryptocurrency exchange platform which allows your users to high frequency trading across hundreds of digital assets. ",
      cards: [],
    },
    {
      logo: fundManagement,
      name: "Fund Management",
      desc: "The Fund Management template is an retail investment platform which allows users to grow their assets by investing and interacting with your specific FundCoin.",
      cards: [],
    },
    {
      logo: nftMarketplace,
      name: "NFT Marketplace",
      desc: "The NFT Marketplace allows enables NFT creators to list their NFT's on your platform as well as providing buyers with a secondary resale market.",
      cards: [],
    },
    {
      logo: nftReward,
      name: "NFTReward",
      desc: "The NFTReward template allows you to create an exclusive application for your NFT whereby users can earn rewards for holding your NFT.",
      cards: [],
    },
    {
      logo: defi,
      name: "Defi Markets",
      desc: "DefiMarkets is a decentralized routing engine that allows your users to manage their DEFI lending operations accross different protocols.",
      cards: [],
    },
    {
      logo: signals,
      name: "Signals",
      desc: "The Signals template allows you to launch your very own financial education platform where you can offer courses, analysis and market signals.",
      cards: [],
    },
  ];

  const [selectedCoinSplash, setSelectedCoinSplash] = useState({
    coinName: "US Dollar",
    coinSymbol: "USD",
    symbol: "$",
    coinImage:
      "https://apimachine-s3.s3.us-east-2.amazonaws.com/coinImages/dollar.png",
    type: "fiat",
  });

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // useEffect(() => {
  //   setSelectedApp(globalMenu[0]);
  // }, []);

  const FormatNumber = (value, prec) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: prec,
      minimumFractionDigits: prec,
    }).format(isNaN(value) ? 0 : value);
  };

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const getDisplayDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const suffix = getOrdinalSuffix(day);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate.replace(/\d+/, `${day}${suffix}`);
  };

  // useEffect(() => {
  //   setSelectedApp(globalMenu[0]);
  // }, []);

  useEffect(() => {
    if (bankerEmail) {
      setLoading(true);

      if (selectedApp) {
        if (selectedApp?.appName === "Authors") {
          axios
            .get(
              `https://publications.apimachine.com/application/publisher/detail/${bankerEmail}`
            )
            .then(({ data }) => {
              if (data?.status) {
                setAllPublications(data?.data);
                setSelectedPublication(
                  data?.data[0]?.PublicationDetails[0]?.PublicationDetail[0]
                );
                localStorage.setItem(
                  "selectedPublication",
                  JSON.stringify(
                    data?.data[0]?.PublicationDetails[0]?.PublicationDetail[0]
                  )
                );
              }
              setLoading(false);
            });
        } else {
          axios
            .get(
              `https://publications.apimachine.com/publication/email/${bankerEmail}`
            )
            .then(({ data }) => {
              setAllPublications(data.data);
              setSelectedPublication(data.data[0]);
              setLoading(false);
            });
        }
      }
    }
  }, [bankerEmail, refetchData, selectedApp]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://publications.apimachine.com/application/publisher/detail/${bankerEmail}`
  //     )
  //     .then(({ data }) => {});
  // }, []);

  useEffect(() => {
    if (bankerEmail) {
      axios
        .get(
          `https://publications.apimachine.com/application/publisher/detail/${bankerEmail}`
          // `https://publications.apimachine.com/publisher?email=${bankerEmail}`
        )
        .then(({ data }) => {
          if (data.status) {
            setAuthorDetail(data.data[0]);
            localStorage.setItem("AuthorData", JSON.stringify(data.data));
          } else {
            setAuthorDetail(null);
            localStorage.setItem("AuthorData", null);
          }
        });
    }
  }, [bankerEmail]);

  useEffect(() => {}, []);

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
    if (localStorage.getItem("bankerEmailNew")) {
      setBankerEmail(localStorage.getItem("bankerEmailNew"));
    } else {
      setBankerEmail(loginData?.user?.email);
    }
    setSelectedApp(JSON.parse(localStorage.getItem("selectedApp")));
  }, []);

  useEffect(() => {
    axios
      .get(`https://comms.globalxchange.io/coin/vault/get/all/coins`)
      .then((res) => {
        if (res.data.status) {
          setAllCoins(res.data.coins);
          setSelectedCoin({
            coinImage:
              "https://apimachine-s3.s3.us-east-2.amazonaws.com/coinImages/dollar.png",
            coinName: "US Dollar",
            coinSymbol: "USD",
            market_cap: 0,
            symbol: "$",
            type: "fiat",
            usd_price: 1,
            volume_24hr: 0,
            _24hrchange: 0,
            _id: "5f21042d0562332558c93180",
          });
        }
      });
  }, []);

  //MyCryptoBrand Admin Modal Functions

  useEffect(() => {
    setMcbAdminLoading(true);
    if (bankerEmail) {
      axios
        .get(
          `https://comms.globalxchange.io/gxb/app/gxlive/user/operator/get?email=${bankerEmail}&show_apps=true`
        )
        .then((res) => {
          if (res.data.operators.length > 0) {
            setAllBrands(res.data.operators);
            setMcbAdminLoading(false);

            if (localStorage.getItem("selectedBrand")) {
              const found = res.data.operators.find(
                (o) =>
                  o._id ===
                  JSON.parse(localStorage.getItem("selectedBrand"))._id
              );

              if (found !== null && found !== undefined) {
                setSelectedBrand(
                  JSON.parse(localStorage.getItem("selectedBrand"))
                );
              } else {
                setSelectedBrand(res.data.operators[0]);
                // localStorage.setItem(
                //   "selectedBrand",
                //   JSON.stringify(res.data.operators[0])
                // );
              }
            } else {
              setSelectedBrand(res.data.operators[0]);
              // localStorage.setItem(
              //   "selectedBrand",
              //   JSON.stringify(res.data.operators[0])
              // );
            }
          }
        });
    }
  }, [bankerEmail]);

  useEffect(() => {
    setMcbAdminLoading(true);
    axios
      .get(
        `https://comms.globalxchange.io/gxb/apps/get?operator_id=${selectedBrand?.operator_id}`
      )
      .then((res1) => {
        setAllAppsForBrand(res1.data.apps);
        setMcbAdminLoading(false);
        if (localStorage.getItem("selectedBrandApp")) {
          const found = res1.data.apps.find(
            (o) =>
              o._id === JSON.parse(localStorage.getItem("selectedBrandApp"))._id
          );
          if (found !== null && found !== undefined) {
            setSelectedBrandApp(
              JSON.parse(localStorage.getItem("selectedBrandApp"))
            );
          } else {
            setSelectedBrandApp(res1.data.apps[0]);
            // localStorage.setItem(
            //   "selectedBrandApp",
            //   JSON.stringify(res1.data.operators[0])
            // );
          }
        } else {
          setSelectedBrandApp(res1.data.apps[0]);
          // localStorage.setItem(
          //   "selectedBrandApp",
          //   JSON.stringify(res1.data.operators[0])
          // );
        }
      });
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedBrand && allAppsForBrand.length > 0) {
      localStorage.setItem("selectedBrand", JSON.stringify(selectedBrand));
    }
  }, [selectedBrand, allAppsForBrand]);

  useEffect(() => {
    if (selectedBrandApp && allBrands.length > 0) {
      localStorage.setItem(
        "selectedBrandApp",
        JSON.stringify(selectedBrandApp)
      );
    }
  }, [selectedBrandApp, allBrands]);

  const handleResize = () => {
    // console.log(window.innerWidth);
    if (window.innerWidth < 720) {
      setIsMobile(true);
      console.log(window.innerWidth);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (userType === "App Owner") {
      setAppListFinal(
        appList.filter(
          (app) =>
            app.created_by === bankerEmail ||
            bankerEmail === "shorupan@gmail.com"
        )
      );
    } else {
      setAppListFinal(appList);
    }
  }, [appList, bankerEmail, userType]);

  //sidebar panels
  const [panelContainer, setPanelContainer] = useState(false);

  const value = {
    globalMenu,
    mcbMenu,
    authorsMenu,
    ClassMenu,
    web3Menu,
    collapse,
    setCollapse,
    selectedApp,
    setSelectedApp,
    modalOpen,
    setModalOpen,
    tabs,
    setTabs,
    selectedTab,
    setSelectedTab,
    loginData,
    setLoginData,
    bankerTag,
    setBankerTag,
    login,
    setLogin,
    Lock,
    Collapse_img,
    Collapse1_img,
    defaultImg,
    allBankers,
    setAllBankers,
    bankerEmail,
    setBankerEmail,
    allCoins,
    setAllCoins,
    selectedCoin,
    setSelectedCoin,
    selectedFilter1,
    setSelectedFilter1,
    selectedFilter2,
    setSelectedFilter2,
    selectedFilter21,
    setSelectedFilter21,
    filter1,
    setFilter1,
    filter2,
    setFilter2,
    customerEmailFilter,
    setCustomerEmailFilter,
    openCoinFilter,
    setOpenCoinFilter,
    globalMenuAdd,
    setGlobalMenuAdd,
    FormatNumber,
    selectedCoinSplash,
    setSelectedCoinSplash,
    showDraw,
    setShowDraw,
    selectedMenu,
    setSelectedMenu,
    selectedSplashCoin,
    setSelectedSplashCoin,
    selectedTemplate,
    setSelectedTemplate,
    templateList,
    selectedTemplateMenu,
    setSelectedTemplateMenu,
    selectedBrand,
    setSelectedBrand,
    selectedBrandApp,
    setSelectedBrandApp,
    mcbAdminLoading,
    setMcbAdminLoading,
    allBrands,
    setAllBrands,
    allApps,
    setAllApps,
    selectedMcbDashboardApp,
    setSelectedMcbDashboardApp,

    showSubDraw,
    setShowSubDraw,
    refetchAppData,
    setRefetchAppData,
    globalFilter,
    setGlobalFilter,
    selectedAssetFilters,
    setSelectedAssetFilters,
    selectedStatusFilters,
    setSelectedStatusFilters,
    selectedLengthFilter,
    setSelectedLengthFilter,
    allAppsForBrand,
    setAllAppsForBrand,
    selectedMcbDashboardBrand,
    setSelectedMcbDashboardBrand,
    refetchBrandData,
    setRefetchBrandData,

    selectedMcbAssetsCrypto,
    setSelectedMcbAssetsCrypto,
    selectedMcbAssetsForex,
    setSelectedMcbAssetsForex,
    showMobileMenu,
    setShowMobileMenu,

    refetchCategory,
    setRefetchCategory,

    refetchFieldGroupData,
    setRefetchFieldGroupData,
    selectedFieldGroup,
    setSelectedFieldGroup,
    isMobile,
    setIsMobile,
    theCurrency,
    setTheCurrency,
    refreshCall,
    setRefreshCall,
    coinIIRD,
    setCoinIIRD,
    tabSelected,
    setTabSelected,
    theAsset,
    setTheAsset,
    crmUser,
    setCrmUser,
    crmData,
    setCrmData,
    selectedSubs,
    coinList,
    appList: appListFinal,
    appLoading,
    setSelectedSubs,
    licenseCheck,
    coinLoading,
    setLicenseCheck,
    userType,
    setUserType,
    coinListObject,
    coinSelect,
    setCoinSelect,
    wideDrawer,
    setWideDrawer,
    refetchData,
    setRefetchData,
    allPublications,
    setAllPublications,
    selectedPublication,
    setSelectedPublication,

    actionsSubDrawer,
    setActionsSubDrawer,
    StorySubDrawer,
    setStorySubDrawer,
    videoActionsSubDrawer,
    setVideoActionsSubDrawer,

    profileSubDrawer,
    setProfileSubDrawer,

    refetchVideos,
    setRefetchVideos,

    refreshStories,
    setRefreshStories,
    authorDetail,
    setAuthorDetail,
    loading,
    setLoading,
    refetchArticles,
    setRefetchArticles,
    refetchNavbar,
    setRefetchNavbar,

    globalSearch,
    setGlobalSearch,
    showSearch,
    setShowSearch,

    selectedLevel,
    setSelectedLevel,
    selectedIndex,
    setSelectedIndex,
    affiliateDrawer,
    setAffiliateDrawer,

    payoutDrawer,
    setPayoutDrawer,

    refetchPayout,
    setRefetchPayout,

    refechProfile,
    setRefechProfile,
    refetchAuthors,
    setRefetchAuthors,

    updatedSuccessful,
    setupdatedSuccessful,

    requestsDrawer,
    setRequestsDrawer,

    refetchRequest,
    setRefetchRequest,

    requestText,
    setRequestText,

    filterDrawer,
    setFilterDrawer,

    selectedFilterRequest,
    setSelectedFilterRequest,

    slider,
    setSlider,

    selectedAuthor,
    setSelectedAuthor,

    refetchCourses,
    setRefetchCourses,

    getDisplayDate,
    cardOpen,
    setCardOpen,
    titlesData,
    setTitlesData,

    //panelContainer
    panelContainer,
    setPanelContainer,
    scrollTo,
    setScrollTo,
    sidebarRef,
    handleButtonClick
  };

  return (
    <GlobalContex.Provider value={value}>{children}</GlobalContex.Provider>
  );
};
