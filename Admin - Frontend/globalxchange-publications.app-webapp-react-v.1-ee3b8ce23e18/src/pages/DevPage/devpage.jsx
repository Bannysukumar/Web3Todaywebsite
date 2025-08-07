import React, { useEffect, useState } from "react";
import "./devpage.scss";
import Web3ICON from "../../assets/web3todayico.svg";
import MainIco from "../../assets/mainico1.svg";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import web3mobico from "../../assets/web3mobico.svg";

function DevPage() {
  const navigate = useNavigate();
  const [Disp, setDisp] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    localStorage.removeItem("otpcode");
  }, []);

  const thetabotp = (e) => {
    localStorage.setItem("otpcode", "4444");
    setOtp(e);
    console.log("otp...", e);
    if (e === "4444") {
      setOtp("");
      navigate("/page2");
    } else {
      if (e.length === 4 && e !== "4444") {
        toast.error("Invalid pin");
      }
    }
  };

  return (
    <>
      <div className="bggm" onClick={() => (setDisp(false), setOtp(""))}>
        <img src={Web3ICON} alt="web-icon" className="theweb3img" />
        <div className="mobweb3img">
          <img src={web3mobico} alt="web-icon" />
          <p className="mobtext">Publishers</p>
        </div>
      </div>
      <div className="bottomtext" onClick={() => setDisp(true)}>
        <p className="devtext">
          <span className="theweb3img">Click Here For</span> Developer Access
        </p>
      </div>
      <div onClick={() => (setDisp(!Disp), setOtp(""))}>
        <div className="theshadow" style={{ display: Disp ? "" : "none" }}>
          <div className="thetab" onClick={(e) => e.stopPropagation()}>
            <div className="tabimg">
              <img src={MainIco} alt="mainico" />
            </div>
            <div className="dispotp">
              <OtpInput
                value={otp}
                onChange={thetabotp}
                numInputs={4}
                separator={<span> </span>}
                shouldAutoFocus
                containerStyle="otpInputWrapper"
                inputStyle="otpInput"
              />
              <div
                className="btmtabbtn"
                onClick={() => (setDisp(false), setOtp(""))}
              >
                <p className="clstxt">Close</p>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default DevPage;
