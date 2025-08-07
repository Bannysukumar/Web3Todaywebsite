import React from "react";
import { useNavigate } from "react-router-dom";
import ConstantCS from "../../../Constant";
import LoadingAnimationCS from "../../../lotties-cs/LoadingAnimationCS";
import { getUserDetailsCS } from "../../../services/csGetAPIs";
import { authenticateCS, loginCS } from "../../../services/csPostAPIs";
import { CStartup } from "../cs-context/CSContext";
import ForgetPassword from "./forgetPassword/ForgetPassword";
import "./login.style.scss";
import LoginForm from "./LoginForm";
import Register from "./register/Register";
export default function LoginComponent() {
  const navigate = useNavigate();
  const cstartup = React.useContext(CStartup);
  const { setLoginStatus, setSelectedTab, setLoggedIn } = cstartup;
  const [loading, setLoading] = React.useState(false);
  const [forgotPassword, setForgotPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({ email: false, password: false });
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    let res = await loginCS(credentials.email, credentials.password);
    if (res.data.status) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("userEmailPermanent", credentials.email);
      localStorage.setItem("deviceKey", res.data.device_key);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("idToken", res.data.idToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      let resTwo = await getUserDetailsCS(credentials.email);
      if (resTwo.data.status) {
        setLoggedIn({ status: true, details: resTwo.data.user });
      }

      setSelectedTab({ count: 0, type: ConstantCS.csSidebarList[0] });
      navigate(`/${localStorage.getItem("country")}/trending`);
      setLoginStatus(false);
    } else {
      setLoading(false);
      setErrors({ email: true, password: true });
    }
  };

  return (
    <div className="login-component">
      <div className="l-c-left">
        {loading ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <LoadingAnimationCS />
          </div>
        ) : (
          <>
            {forgotPassword ? (
              <ForgetPassword setForgotPassword={setForgotPassword} />
            ) : (
              <LoginForm
                errors={errors}
                setErrors={setErrors}
                setCredentials={setCredentials}
                handleSubmit={handleSubmit}
                credentials={credentials}
              />
            )}
            <p
              onClick={() => setForgotPassword(true)}
              className={forgotPassword ? "d-none" : "forgot-password"}
            >
              I Can't Seem To Access My Account
            </p>
          </>
        )}
      </div>
      <div className="l-c-right">
        <Register />
      </div>
    </div>
  );
}
