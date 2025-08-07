import React from "react";
import OtpInput from "react-otp-input";

export default function FPStepTwo({ setOTP,OTP, setSteps }) {
  const [value, setValue] = React.useState("");
  const handleChange = (e) => {
    setOTP(e);
    setValue(e);
  };
  return (
    <div className="f-p-step-two">
      <h1>Forget Password</h1>
      <div className="otp-wrapper">
        <p>Enter The Six Digit Code That Was Just Sent To *Enter Email*</p>
        <div>
          <OtpInput value={value} onChange={handleChange} numInputs={6} />
        </div>
      </div>
      <button disabled={OTP.toString().length !== 6} onClick={() => setSteps(2)}>Next</button>
    </div>
  );
}
