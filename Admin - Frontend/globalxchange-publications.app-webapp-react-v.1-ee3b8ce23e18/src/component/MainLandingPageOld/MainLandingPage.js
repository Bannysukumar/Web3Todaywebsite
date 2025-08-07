import React from "react";
import {
  Switch,
  Route,
  useNavigate,
  useParams,
  Redirect,
} from "react-router-dom";
import "./main-landing.style.scss";
import CryptoStartupHeader from "./cryptoStartupHeader/CryptoStartupHeader";
import CryptoStartupSidebar from "./crypto-startup-sidebar/CryptoStartupSidebar";
import nextId from "react-id-generator";
import { ImagesCS } from "../../assets/0a-exporter";
import SearchCurrency from "./SearchCurrency/SearchCurrency";
import CryptoStartUpNews from "./cryptoStartUpNews/CryptoStartUpNews";
import { getCountryList, getUserDetailsCS } from "../../services/csGetAPIs";
import LoadingAnimationCS from "../../lotties-cs/LoadingAnimationCS";
import SearchTemplate from "./searchTemplate/SearchTemplate";
import WAPPs from "./companies/Companies";
import CSInvestors from "./Investors/CSInvestors";
import ConstantCS from "../../Constant";
import { CStartup } from "./cs-context/CSContext";
import LoginComponent from "./Login/LoginComponent";
import { authenticateCS } from "../../services/csPostAPIs";
import Article from "./Article/Article";
import VideoPage from "./VideoPage/VideoPage";
import ComingSoon from "./ComingSoon/CommingSoon";
export default function MainLandingPage() {
  const cstartup = React.useContext(CStartup);
  const animRef = React.useRef(false);
  const {
    fullSizeSidebar,
    mainSearch,
    mainSearchTerm,
    setFullSizeSidebar,
    setLoggedIn,
    sidebarDifference,
    selectedTab,
    setSelectedCountry,
    loginStatus,
  } = cstartup;
  const navigate = useNavigate();
  let { content } = useParams();
  const [dropdown, setDropdown] = React.useState(false);
  const [countryList, setCountryList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [aLoading, setALoading] = React.useState(true);
  const [animClassName, setAnimClassName] = React.useState("");

  const setUpCountryList = async () => {
    let res = await getCountryList();
    let temp = {
      formData: {
        Name: "Worldwide",
        Flag: ImagesCS.worldWide,
      },
    };
    setCountryList([temp, ...res.data.data]);
    setSelectedCountry(temp);
    setLoading(false);
  };

  const handleClick = (id) => {
    switch (id) {
      case "bos":
        window.open(`http://bos.store/`, "_blank");
        break;
      case "tf":
        window.open(`http://teamforce.io/`, "_blank");
      case "il":
        window.open(`http://instalegal.com/`, "_blank");
      case "ms":
        window.open(`http://meetings.stream/`, "_blank");
    }
  };
  const getContentClassName = () => {
    if (sidebarDifference > 0) {
      if (animRef.current) {
        animRef.current = false;
        setAnimClassName("above-boundary-two");
      } else {
        animRef.current = true;
        setAnimClassName("above-boundary");
      }
    } else if (sidebarDifference < 0) {
      if (animRef.current) {
        animRef.current = false;
        setAnimClassName("below-boundary-two");
      } else {
        animRef.current = true;
        setAnimClassName("below-boundary");
      }
    }
  };
  const authenticateFirst = async () => {
    let res = await authenticateCS();
    if (res.data.status) {
      let resTwo = await getUserDetailsCS(localStorage.getItem("userEmail"));
      if (resTwo.data.status) {
        setLoggedIn({ status: true, details: resTwo.data.user });
      }
    }
    setALoading(false);
  };

  React.useEffect(() => {
    getContentClassName();
  }, [sidebarDifference]);

  React.useEffect(() => {
    setUpCountryList();
  }, []);
  React.useEffect(() => {
    authenticateFirst();
  }, []);

  return loading || aLoading ? (
    <div
      style={{ backgroundColor: "#182542" }}
      className="w-100 h-100 d-flex justify-content-center align-items-center"
    >
      <LoadingAnimationCS size={{ height: 500, width: 500 }} type="world" />
    </div>
  ) : (
    <div className="main-landing-page">
      <div
        className={`m-l-p-d-sidebar ${fullSizeSidebar ? "max-sb" : "min-sd"}`}
      >
        <button
          onClick={() => setFullSizeSidebar(!fullSizeSidebar)}
          className={`close-button ${fullSizeSidebar ? "" : "small"}`}
        >
          <img src={ImagesCS.thickArrow} />
        </button>

        {content}
        <CryptoStartupSidebar setFullSizeSidebar={setFullSizeSidebar} />
      </div>

      <div className="main-landing-page-body">
        <div className="main-landing-page-header">
          <CryptoStartupHeader setDropdown={setDropdown} dropdown={dropdown} />
          <div
            onClick={() => setDropdown(false)}
            className={`m-l-p-h-dropdown ${
              dropdown ? "full-height" : "no-height"
            }`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="other-app-wrappers"
            >
              {appList.map((obj) => (
                <button onClick={() => handleClick(obj.id)}>
                  <img src={obj.img} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`m-l-p-d-body ${fullSizeSidebar ? "min-b" : "max-b"}`}>
          <SearchTemplate />
          <div
            className={`tab-content-wrapper ${
              mainSearch && !mainSearchTerm ? "t-b-w-shrink" : ""
            }`}
          >
            <div className={`individual-tab-wrapper ${animClassName}`}>
              <Switch>
                <Route path="/:country/video/:videoId" component={VideoPage} />
                <Route
                  path="/:country/article/:articleId"
                  component={Article}
                />
                <Route
                  path="/:country/trending"
                  component={CryptoStartUpNews}
                />
                <Route path="/:country/WAPPs" component={WAPPs} />
                <Route path="/:country/investors" component={CSInvestors} />
                <Route
                  path="/:country/get-started"
                  component={LoginComponent}
                />
                <Route path="/:country/comingSoon" component={ComingSoon} />
                <Redirect
                  to={`/${localStorage.getItem("country")}/comingSoon`}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const appList = [
  { keyId: nextId(), img: ImagesCS.bosLogo, id: "bos" },
  { keyId: nextId(), img: ImagesCS.teamForce, id: "tf" },
  { keyId: nextId(), img: ImagesCS.instaLegal, id: "il" },
  { keyId: nextId(), img: ImagesCS.meetingStream, id: "ms" },
];
