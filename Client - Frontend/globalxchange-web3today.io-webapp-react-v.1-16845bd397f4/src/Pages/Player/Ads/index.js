import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./ads.scss";
import { getadds, getNews, getVideo, clainRewards } from "./api";
import ReactPlayer from "react-player";
import { GlobalContex } from "../../../globalContext";
import searchButton from "../../../assets/searchButton.svg";
import OtpInput from "react-otp-input";
import { useParams } from "react-router-dom";
export default function Index() {
  const [cardInfo, setcardInfo] = useState([]);
  const [tab, settab] = useState("main");
  const [info, setinfo] = useState([]);
  const [newdata, setnewdata] = useState([]);
  const [code, setcode] = useState("");
  const [videodata, setvideodata] = useState({});
  const [storeVideo, setstoreVideo] = useState({});
  const [rewards, setrewards] = useState([]);
  const [alreadyClamined, setalreadyClamined] = useState(false);
  const [UserFound, setUserFound] = useState(false);
  const [otp, setOtp] = useState("");
  const [videoCompain, setvideoCompain] = useState(false);
  const history = useHistory();
  const {
    setShowPopup,
    loginData,
    collapse,
    setCollapse,
    selectedApp,
    mobileMenu,
    hideArrow,
    userProfile,
    setRegisterUser,
    setUserProfile,
  } = useContext(GlobalContex);
  useEffect(() => {
    getaddsFunction();
    return () => {};
  }, []);
  const [stickyClass, setStickyClass] = useState(false);
  const [loading, setloading] = useState(false);
  const [model, setmodel] = useState(false);

  const { name, video } = useParams();
  console.log("name", name);

  //
  useEffect(() => {
    if (name && !video) {
      settab("inner");
      getNewsFunction(name);
      // getVideoFunction(name);
    } else if (name && video) {
      settab("videopage");
      getNewsFunction(name);
      getVideoFunction(video);
    }
    return () => {};
  }, []);
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      if (size.x > 700) {
        if (windowHeight < 200) {
          setStickyClass(false);
        } else {
          setStickyClass(true);
        }
      }
    }
  };
  window.addEventListener("scroll", stickNavbar);
  const getaddsFunction = async () => {
    await getadds().then((response) => {
      let result = response?.data?.users;
      setcardInfo(result);
      console.log("zxc", result);
    });
  };
  const handle = async (e) => {
    await history.push(`/earn/ads/${e?.email}`);
    await settab("inner");

    setinfo(e);
    // settab("inner");
    getNewsFunction(e?.email);
  };

  const videhandle = (e) => {};

  console.log("zczxc", tab);
  const getVideoFunction = async (e) => {
    await getVideo(e).then((response) => {
      let result = response?.data?.videoCampaigns?.[0];
      setvideodata(result);
      console.log("zxczxcw", result);
    });
  };

  const rewardsloader = async () => {
    setloading(true);
    let token = localStorage.getItem("idToken");

    let obj = {
      token: localStorage.getItem("TokenId"),
      email: loginData?.user?.email,
      app_code: "web3today",
      videoCode: otp,
    };
    if (loginData) {
      await clainRewards(obj).then((response) => {
        let result = response?.data;
        //   setcardInfo(result);
        if (result?.status) {
          setmodel(true);
        }
        if (
          result?.message ==
          "the User has already claimed for this Advertisement!"
        ) {
          setalreadyClamined(true);
        }
        if (result?.message == "User not found with this app Code") {
          setUserFound(true);
        }

        if (result?.message == "The video Campaign is not found!") {
          setvideoCompain(true);
        }

        // {
        //   "status": false,
        //   "message": ""
        //   }
        // "status": false,
        // "message": "the User has already claimed for this Advertisement!"
        // }

        setloading(false);
        setrewards(result);
        console.log("123231231231232", result);
      });
    } else {
      setRegisterUser("");
      setloading(false);
    }
  };
  const toCardinal = (num) => {
    var ones = num % 10;
    var tens = num % 100;

    if (tens < 11 || tens > 13) {
      switch (ones) {
        case 1:
          return num + "st";
        case 2:
          return num + "nd";
        case 3:
          return num + "rd";
      }
    }

    return num + "th";
  };
  const getNewsFunction = async (e) => {
    await getNews(e).then((response) => {
      let result = response?.data?.videoCampaigns;
      //   setcardInfo(result);
      setnewdata(result);
      console.log("1231e23d", result);
    });
  };
  console.log(videodata, "eeee");

  const functionMove = (e) => {
    window.scrollTo(0, 0);
    getVideoFunction(e?.video_nickname);
    setstoreVideo(e);
    console.log("czxczx", e);
    history.push(`/earn/ads/${e?.email}/${e?.video_nickname}`);
    settab("videopage");
  };
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  useEffect(() => (window.onresize = updateSize), []);

  const swtchtabfunction = () => {
    switch (tab) {
      case "videopage":
        return (
          <>
            <div className="videopageSection">
              <div
                className="leftsideSectiom"
                onClick={() => {
                  settab("inner");

                  history.push(`/earn/ads/${name}`);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M0.283333 5.43599L9.17222 9.93598C9.34444 10.023 9.55444 10.021 9.72444 9.93198C9.89556 9.84198 10 9.67798 10 9.49998L10 0.499999C10 0.321999 9.89556 0.158 9.72444 0.0679997C9.63778 0.0229998 9.54111 0 9.44444 0C9.35111 0 9.25667 0.0210001 9.17222 0.064L0.283333 4.56399C0.108889 4.65299 -4.76837e-07 4.81899 -4.76837e-07 4.99999C-4.76837e-07 5.18099 0.108889 5.34699 0.283333 5.43599Z"
                    fill="#4B2A91"
                  />
                </svg>
                Advertisers Profile
              </div>
              <div className="playSection">
                <h1>{videodata?.video_title}</h1>
                <p>{videodata?.video_description}</p>
                <div className="videoCard">
                  <ReactPlayer
                    playing={true}
                    loop={true}
                    controls={false}
                    className="react-player"
                    url={videodata?.video_link}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>

              <div className="topHeaderPlayOut">
                <h2>Payout Details</h2>
                <div className="deatilPlayput">
                  <h3>Payout:</h3>
                  <h3>{videodata?.payout_amount}</h3>
                </div>
                <div className="deatilPlayput">
                  <h3>Payout Currency:</h3>
                  <h3>{videodata?.payOutCoin}</h3>
                </div>
                <div className="deatilPlayput">
                  <h3>Slots:</h3>
                  <h3>{videodata?.max_redeem_count}</h3>
                </div>
                <div className="deatilPlayput">
                  <h3>Slots Taken:</h3>
                  <h3>{videodata?.current_redeem_count}</h3>
                </div>
                <div className="deatilPlayput">
                  <h3>Slots Left:</h3>
                  <h3>{videodata?.left_redeem_count}</h3>
                </div>
                <div className="SeachSectionFlied">
                  {/* <input
                    placeholder="Enter Redemption Code"
                    value={code}
                    onChange={(e) => setcode(e.target.value)}
                  />
                  <div className="buttonClick">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="16"
                      viewBox="0 0 26 16"
                      fill="none"
                    >
                      <path
                        d="M24.9275 7.54612L18.1128 0.212942C17.9867 0.0774335 17.8098 0 17.6246 0H14.6963C14.1139 0 13.8115 0.694287 14.2081 1.1207L20.6058 7.99974L14.2081 14.8788C13.8115 15.3052 14.1139 15.9995 14.6963 15.9995H17.6246C17.8098 15.9995 17.9867 15.9226 18.1128 15.7865L24.9275 8.45335C25.165 8.19751 25.165 7.80197 24.9275 7.54612Z"
                        fill="white"
                      />
                      <path
                        d="M17.7423 7.54613L10.9276 0.213476C10.8015 0.0774443 10.6246 0.000534058 10.4394 0.000534058H7.51107C6.92875 0.000534058 6.62633 0.694821 7.02292 1.12123L10.6707 5.04366H1.0464C0.468788 5.04366 0 5.51245 0 6.09007V9.911C0 10.4886 0.468788 10.9574 1.0464 10.9574H10.6702L7.0224 14.8793C6.62581 15.3057 6.92822 16 7.51054 16H10.4389C10.6241 16 10.801 15.9231 10.927 15.7871L17.7417 8.45389C17.9798 8.19804 17.9798 7.80198 17.7423 7.54613V7.54613Z"
                        fill="white"
                      />
                    </svg>
                  </div> */}
                </div>

                <div>
                  <h2
                    style={{
                      marginBottom: "0rem",
                      marginTop: "2.4rem",
                    }}
                  >
                    Enter Redemption Code
                  </h2>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <label
                  // style={{
                  //   background: info?.advertiser_profile?.color_code,
                  // }}
                  onClick={rewardsloader}
                >
                  {loading ? "Loading..." : "Submit"}
                </label>
              </div>
            </div>
          </>
        );

      case "main":
        return (
          <div className="ads">
            {cardInfo?.map((item) => {
              if (item?.advertiser_profile)
                return (
                  <div class="flip" onClick={() => handle(item)}>
                    <div class="front">
                      <img src={item?.advertiser_profile?.profile_img} />
                    </div>
                    <div class="back">
                      <img src={item?.advertiser_profile?.profile_img} />
                      <p>{item?.advertiser_profile?.name}</p>
                    </div>
                  </div>
                );
            })}
            <>
              {Array(25)
                .fill(" ")
                .map((item, index) => {
                  return (
                    <div class="flip">
                      <div class="front"></div>
                      <div class="back">
                        <p></p>
                      </div>
                    </div>
                  );
                })}
            </>
          </div>
        );
        break;
      case "inner":
        return (
          <div className="innerAdsDash">
            <div
              className="imageSectionadds"
              style={{
                background: `#${info?.advertiser_profile?.color_code?.[0]}`,
              }}
            >
              <img src={info?.advertiser_profile?.whiteinvrersedlogo} />
              <div
                className="allbrands"
                onClick={() => {
                  settab("main");
                  history.push(`/earn/ads`);
                }}
              >
                {/* <img src={usersinfo}/> */}
                All Brands
              </div>
            </div>

            <div className="headerDash">
              {stickyClass ? (
                <div className="sticky">
                  <div
                    className="cardAdds"
                    style={{
                      // background: `#${info?.advertiser_profile?.color_code?.[0]}`,
                      height: "100%",
                      width: "11rem",
                    }}
                  >
                    <img src={info?.advertiser_profile?.whiteinvrersedlogo} />
                  </div>

                  <div className="cardAdds">
                    <h1>0</h1>
                    <h2>Total Ads</h2>
                  </div>
                  <div className="cardAdds">
                    <h1>0.00</h1>
                    <h2>Total Payout</h2>
                  </div>
                  <div className="cardAdds">
                    <h1>0</h1>
                    <h2>Live Ads</h2>
                  </div>
                  <div className="cardAdds">
                    <h1>0.00</h1>
                    <h2>Avl Payout</h2>
                  </div>
                  <div className="cardAdds">
                    <label
                      className="signup"
                      style={{
                        background: `#${info?.advertiser_profile?.color_code?.[0]}`,
                      }}
                      onClick={() =>
                        window.open(
                          `http://${info?.advertiser_profile?.call_action_link}`,
                          "_blank"
                        )
                      }
                    >
                      Signup
                    </label>
                    <label
                      className="website"
                      onClick={() =>
                        window.open(
                          `http://${info?.advertiser_profile?.website_link}`,
                          "_blank"
                        )
                      }
                    >
                      Website
                    </label>
                  </div>
                </div>
              ) : (
                <div className="topheaderadd">
                  {/* <div
                  className="cardAdds"
                  style={{
                    background: info?.advertiser_profile?.color_code,
                    height: "100%",
                    width: "11rem",
                  }}
                >
                  <img src={info?.advertiser_profile?.whiteinvrersedlogo} />
                </div>
               */}

                  <div className="cardAdds">
                    <h1>0</h1>
                    <h2>Total Ads</h2>
                  </div>
                  <div className="cardAdds">
                    <h1>0.00</h1>
                    <h2>Total Payout</h2>
                  </div>
                  <div className="cardAdds">
                    <h1>0</h1>
                    <h2>Live Ads</h2>
                  </div>
                  <div className="cardAdds">
                    <h1>0.00</h1>
                    <h2>Avl Payout</h2>
                  </div>
                  <div className="cardAdds">
                    <label
                      className="signup"
                      style={{
                        background: `#${info?.advertiser_profile?.color_code?.[0]}`,
                      }}
                      onClick={() =>
                        window.open(
                          `http://${info?.advertiser_profile?.call_action_link}`,
                          "_blank"
                        )
                      }
                    >
                      Signup
                    </label>
                    <label
                      className="website"
                      onClick={() =>
                        window.open(
                          `http://${info?.advertiser_profile?.website_link}`,
                          "_blank"
                        )
                      }
                    >
                      Website
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="contnetaddtop">
              <div className="cardDash">
                {newdata?.map((item) => {
                  return (
                    <div
                      className="lefsiteadd"
                      onClick={() => functionMove(item)}
                    >
                      <div
                        className="borderCard"
                        style={{
                          backgroundImage: `url(${item?.video_thumbnail})`,
                        }}
                      >
                        <div className="blacktinit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="58"
                            height="42"
                            viewBox="0 0 58 42"
                            fill="none"
                          >
                            <path
                              d="M57.6926 11.4411C57.5309 9.6608 57.2987 8.07018 56.9967 6.6668C56.6518 5.09245 55.9015 3.7649 54.7474 2.68651C53.5927 1.60812 52.2495 0.982615 50.7176 0.809074C45.9277 0.269316 38.688 0 28.9997 0C19.3109 0 12.0717 0.269316 7.28167 0.809074C5.74927 0.982513 4.41169 1.60812 3.26822 2.68651C2.12414 3.7649 1.37953 5.09245 1.03511 6.6668C0.711355 8.07018 0.46895 9.6608 0.306767 11.4411C0.145197 13.2215 0.0531061 14.6943 0.0318227 15.8598C0.0100277 17.0239 0 18.6427 0 20.7148C0 22.7857 0.0106417 24.4039 0.031925 25.57C0.0532084 26.7341 0.145197 28.2076 0.306869 29.9873C0.469052 31.7675 0.7001 33.3596 1.00257 34.7615C1.3476 36.3384 2.09784 37.6648 3.25195 38.7432C4.40606 39.8228 5.74937 40.4489 7.28167 40.6206C12.0717 41.1604 19.3108 41.4296 28.9997 41.4296C38.688 41.4296 45.9272 41.1604 50.7176 40.6206C52.2495 40.4483 53.5871 39.8228 54.7313 38.7432C55.8746 37.6648 56.6192 36.3384 56.9642 34.7615C57.2879 33.3596 57.5303 31.7675 57.6926 29.9873C57.8541 28.2071 57.9463 26.7341 57.9675 25.57C57.9888 24.4044 58 22.7857 58 20.7148C58 18.6427 57.9888 17.0245 57.9675 15.8598C57.9463 14.6937 57.8541 13.2208 57.6926 11.4411ZM40.4577 22.4619L23.8861 32.819C23.5836 33.035 23.2172 33.1428 22.7858 33.1428C22.462 33.1428 22.1276 33.057 21.7826 32.8836C21.0706 32.4953 20.7142 31.8923 20.7142 31.072V10.3571C20.7142 9.53801 21.0699 8.93246 21.7826 8.54424C22.5159 8.15602 23.2173 8.17915 23.8861 8.60871L40.4577 18.9658C41.1052 19.3341 41.429 19.9164 41.429 20.7142C41.4284 21.5139 41.1046 22.0962 40.4577 22.4619Z"
                              fill="white"
                            />
                          </svg>
                          Watch Video & Earn
                        </div>
                        {/* <ReactPlayer
                          light={`${item?.video_thumbnail}`}
                          alt="Thumbnail"
                          className="react-player"
                          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                          width="100%"
                          height="100%"
                        /> */}
                      </div>

                      <h1
                        style={{
                          display: "block",
                          textAlign: "start",
                        }}
                      >
                        {item?.video_title}
                      </h1>
                      <p>{item?.video_description}</p>
                      <div className="labelSection">
                        <label className="payout">
                          {item?.payout_amount} {item?.payOutCoin} Payout
                        </label>
                        <label
                          className="payoutLeft"
                          style={{
                            background: `#${info?.advertiser_profile?.color_code?.[0]}`,
                          }}
                        >
                          {item?.left_redeem_count} Payouts Left
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <>
      {videoCompain && (
        <div className="modelOpensucess">
          <div className="innerModel">
            <div className="textcenter">
              <h1>Incorrect Code</h1>
              <p>
                The redemption code you entered is not invalid for this
                campaign. Please try watching the video again.
              </p>
            </div>
            <label
              className="playerApp"
              onClick={() => {
                setvideoCompain(false);
              }}
            >
              Close
            </label>
          </div>
        </div>
      )}

      {UserFound && (
        <div className="modelOpensucess">
          <div className="innerModel">
            <div className="textcenter">
              <h1>Registration Required</h1>
              <p>
                You have to register for Web3Today. Register by clicking the
                link below and then come back and claim your reward
              </p>
            </div>

            <label
              className="playerApp"
              onClick={() => window.open("https://app.web3today.io/", "_blank")}
            >
              Register
            </label>
          </div>
        </div>
      )}

      {alreadyClamined && (
        <div className="modelOpensucess">
          <div className="innerModel">
            <div className="textcenter">
              <h1>Nice Try</h1>
              <p>
                But you have already claimed a reward for this campaign. We only
                allow each user to claim once per campaign.
              </p>
            </div>
            <label
              className="playerApp"
              onClick={() => {
                setalreadyClamined(false);
              }}
            >
              Close
            </label>
          </div>
        </div>
      )}
      {model && (
        <div className="modelOpensucess">
          <div className="innerModel">
            <div className="textcenter">
              <h1>Congratulations</h1>
              <p>
                You have entered the correct code and you have{" "}
                {rewards?.[0]?.message} the{" "}
                {toCardinal(storeVideo?.current_redeem_count + 1)} payout for
                this campaign
              </p>
            </div>
            <div className="textcenter">
              <div className="price">
                Previous Balance{" "}
                <div>
                  {rewards?.[0]?.userData?.current_balance}{" "}
                  {rewards?.[0]?.userData?.coin}
                </div>
              </div>
              <div className="price">
                Updated Balance{" "}
                <div>
                  {rewards?.[0]?.userData?.updated_balance}{" "}
                  {rewards?.[0]?.userData?.coin}
                </div>
              </div>
            </div>

            <div className="textcenter">
              <label
                className="playerApp"
                onClick={() =>
                  window.open("https://app.web3today.io/", "_blank")
                }
              >
                Watch to earn
              </label>
              <label
                className="Earnings"
                onClick={() => {
                  settab("main");
                  setmodel(false);
                  history.push("/earn/ads");
                }}
              >
                Read Next Article
              </label>
            </div>
          </div>
        </div>
      )}

      {swtchtabfunction()}
    </>
  );
}
