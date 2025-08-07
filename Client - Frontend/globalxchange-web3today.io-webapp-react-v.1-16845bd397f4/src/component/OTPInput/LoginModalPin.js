import React from "react";
import OtpInput from "react-otp-input";
import styles from "./loginModal.module.scss";

import web3todayLogo from "../../assets/images/logos/minilogo.svg";

const otpRegex = new RegExp(/^\d*$/);

function LoginModalPin({ pin, setPin, func }) {
  const pinValidator = (pinStr) => {
    if (otpRegex.test(pinStr)) setPin(pinStr);
  };
  return (
    <div className={styles.otpWrapper}>
      <div className={styles.header}>
        <img src={web3todayLogo} alt="web3todayLogo" />
      </div>
      <OtpInput
        containerStyle={styles.otpInputWrapper}
        value={pin}
        onChange={(otp) => pinValidator(otp)}
        numInputs={4}
        separator={<span> </span>}
        inputStyle={styles.otpInput}
        shouldAutoFocus
      />
      <div
        className={styles.btn}
        onClick={() => {
          func();
        }}
      >
        Submit
      </div>
    </div>
  );
}

export default LoginModalPin;
