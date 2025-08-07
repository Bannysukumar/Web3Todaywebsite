import React from "react";
import LoadingAnimationCS from "../../../../lotties-cs/LoadingAnimationCS";
import {
  requestForgotPasswordCS,
  passwordResetCS,
} from "../../../../services/csPostAPIs";
import "./forget-password.style.scss";
import FPStepOne from "./FPStepOne";
import FPStepThree from "./FPStepThree";
import FPStepTwo from "./FPStepTwo";
export default function ForgetPassword({ setForgotPassword }) {
  const [steps, setSteps] = React.useState(0);
  const [OTP, setOTP] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const stepSelector = () => {
    switch (steps) {
      case 0:
        return (
          <FPStepOne
            email={email}
            setEmail={setEmail}
            setSteps={setSteps}
            setForgotPassword={setForgotPassword}
            submitEmail={submitEmail}
          />
        );
      case 1:
        return <FPStepTwo OTP={OTP} setOTP={setOTP} setSteps={setSteps} />;
      case 2:
        return (
          <FPStepThree
            updatePassword={updatePassword}
            password={password}
            setPassword={setPassword}
          />
        );
    }
  };
  const updatePassword = async () => {
    setLoading(true);
    let temp = {
      email: email,
      newPassword: password,
      code: OTP,
    };
    let res = await passwordResetCS(temp);
    if (res.data.status) {
      setLoading(false);
      alert("Password Changed Successfully");
      setForgotPassword(false);
    } else {
      setLoading(false);
      setSteps(0);
      alert("Failed To Update Password. Please Try Again");
    }
  };
  const submitEmail = async () => {
    setLoading(true);
    let res = await requestForgotPasswordCS(email);
    if (res.data.status) {
      setSteps(1);
    } else {
      alert("Please Try Again");
      setEmail("");
    }
    setLoading(false);
  };
  return loading ? (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <LoadingAnimationCS />
    </div>
  ) : (
    <div className="forget-password">
      <div className="steps-wrapper">{stepSelector()}</div>
    </div>
  );
}
