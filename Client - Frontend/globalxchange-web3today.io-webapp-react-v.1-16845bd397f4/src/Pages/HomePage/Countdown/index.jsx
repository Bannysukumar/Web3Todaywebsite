import React, { useState } from "react";
import classNames from "./countdown.module.scss";

import Countdown from "react-countdown";

import fullLogo from "../../../static/images/logos/fullLogo.svg";
import LoginModalPin from "../../../component/OTPInput/LoginModalPin";

const CountDown = ({ setCountdownDiv }) => {
  const [pin, setPin] = useState("");
  const [openPin, setOpenPin] = useState(false);
  const deadlineTimestamp = new Date("2023-09-15T00:00:00").getTime();

  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (days < 10) {
      setDays("0" + days);
    } else {
      setDays(days);
    }

    if (hours < 10) {
      setHours("0" + hours);
    } else {
      setHours(hours);
    }

    if (minutes < 10) {
      setMinutes("0" + minutes);
    } else {
      setMinutes(minutes);
    }

    if (seconds < 10) {
      setSeconds("0" + seconds);
    } else {
      setSeconds(seconds);
    }

    if (completed) {
      // Render a completed state
      return "";
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  function pinEnter() {
    if (pin == "4444") {
      setOpenPin((prev) => !prev);
      setCountdownDiv((prev) => !prev);
    } else {
    }
  }

  return (
    <div className={classNames.contentDiv}>
      <div className={classNames.logoDiv}>
        <img src={fullLogo} alt="fullLogo" />
      </div>
      <p className={classNames.para}>
        Will Be Launching On September 15th 2023
      </p>
      <div className={classNames.countdown}>
        <div className={classNames.eachContainer}>
          <div className={classNames.countValue}>
            <div className={classNames.countValue}>{days}</div>
          </div>
          <div className={classNames.countName}>Days</div>
        </div>
        <div className={classNames.eachContainer}>
          <div className={classNames.countValue}>{hours}</div>
          <div className={classNames.countName}>Hours</div>
        </div>
        <div className={classNames.eachContainer}>
          <div className={classNames.countValue}>{minutes}</div>
          <div className={classNames.countName}>Minutes</div>
        </div>
        <div className={classNames.eachContainer}>
          <div className={classNames.countValue}>{seconds}</div>
          <div className={classNames.countName}>Seconds</div>
        </div>
        <div>
          {renderer && (
            <Countdown date={deadlineTimestamp} renderer={renderer} />
          )}
        </div>
      </div>
      <div className={classNames.btnDiv}>
        <div>Join Waiting List</div>
        <div
          onClick={() => {
            setOpenPin(true);
          }}
        >
          Developer Access
        </div>
      </div>
      {openPin && <LoginModalPin pin={pin} setPin={setPin} func={pinEnter} />}
    </div>
  );
};

export default CountDown;
