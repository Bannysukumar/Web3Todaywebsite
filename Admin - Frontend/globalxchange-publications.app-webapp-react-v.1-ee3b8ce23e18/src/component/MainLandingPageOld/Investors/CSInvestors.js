import React from "react";
import { ImagesCS } from "../../../assets/0a-exporter";
import LoadingAnimationCS from "../../../lotties-cs/LoadingAnimationCS";
import { getAllAppPresentCS } from "../../../services/csGetAPIs";
import "./c-s-investors.style.scss";
export default function CSInvestors() {
  const [selectedCount, setSelectedCount] = React.useState(3);
  const [loading, setLoading] = React.useState(true);
  const [appList, setAppList] = React.useState([]);

  const getInputClassName = (id) => {
    if (id === selectedCount) {
      return "centered";
    } else if (
      (selectedCount === 0 || selectedCount === 1) &&
      (id === appList.length - 1 || id === appList.length - 2)
    ) {
      if (selectedCount === 1 && id === appList.length - 1) {
        return "left-two";
      } else if (selectedCount === 0 && id === appList.length - 1) {
        return "left-one";
      } else if (selectedCount === 0 && id === appList.length - 2) {
        return "left-two";
      } else {
        return "others";
      }
    } else if (
      (selectedCount === appList.length - 1 ||
        selectedCount === appList.length - 2) &&
      (id === 0 || id === 1)
    ) {
      // console.log("xxxxxxxxxx", id);
      if (id === 0 && selectedCount === appList.length - 2) {
        return "right-two";
      } else if (id === 0 && selectedCount === appList.length - 1) {
        return "right-one";
      } else if (id === 1 && selectedCount === appList.length - 1) {
        return "right-two";
      } else {
        return "others";
      }
    } else if (id === selectedCount + 1) {
      return "right-one";
    } else if (id === selectedCount - 1) {
      return "left-one";
    } else if (id === selectedCount + 2) {
      return "right-two";
    } else if (id === selectedCount - 2) {
      return "left-two";
    } else {
      return "others";
    }
  };

  const handleClick = (num) => {
    if (num > selectedCount) {
      if (num === appList.length - 1 && selectedCount === 0) {
        setSelectedCount(appList.length - 1);
      } else {
        setSelectedCount(selectedCount + 1);
      }
    } else if (num < selectedCount) {
      if (selectedCount === appList.length - 1 && num === 0) {
        setSelectedCount(num);
      } else {
        setSelectedCount(selectedCount - 1);
      }
    }
  };
  const setUpAppList = async () => {
    let res = await getAllAppPresentCS();
    if (res.data.status) {
      setAppList([...res.data.apps]);
    } else {
      setAppList([]);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    setUpAppList();
  }, []);
  return (
    <div className="c-s-investors">
      <div className="c-s-i-header">
        <h5>Invest In The Top Crypto Startups</h5>
        <h1>With ZERO Risk</h1>
      </div>
      <div className="c-s-i-mid">
        {loading ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <LoadingAnimationCS />
          </div>
        ) : (
          appList.map((obj, num) => (
            <div
              onClick={() => handleClick(num)}
              className={"moving-card" + " " + getInputClassName(num)}
            >
              <h4>
                <img
                  height="20px"
                  src={
                    !obj.app_icon ? ImagesCS.cryptoStartupShort : obj.app_icon
                  }
                />
                {obj.app_name}
              </h4>
              <div>
                <p>{obj.long_description}</p>
              </div>
              <h6>
                <button>Profile</button>
                <button>App</button>
              </h6>
            </div>
          ))
        )}
      </div>
      <div className="c-s-i-bottom">
        <div className="c-s-i-para">
          <p>
            We Created A Ecosystem Of Whitelabel & Management Applications That
            Can Be Leveraged By New And Existing WAPPs In The Cryptocurrency
            Industry. Now We Are Enabling Investors Of Any Size To Own A Piece
            Of These Incredible Platforms Without Assuming Of The Risk. Don’t
            Belive Us? Click Below To Learn More
          </p>
        </div>
        <div className="c-s-i-buttons">
          <button>How Does It Work?</button>
          <button>See All Investors</button>
        </div>
      </div>
    </div>
  );
}
