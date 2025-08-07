import axios from "axios";
import Axios from "axios";

export const loginCS = (email, password) => {
  return axios.post(`https://gxauth.apimachine.com/gx/user/login`, {
    email: email,
    password: password,
  });
};

export const authenticateCS = () => {
  let email = localStorage.getItem("userEmail");
  let token = localStorage.getItem("idToken");

  return axios.post(`https://comms.globalxchange.io/coin/verifyToken`, {
    email: email,
    token: token,
  });
};
export const requestForgotPasswordCS = (email) => {
  return Axios.post(
    `https://gxauth.apimachine.com/gx/user/password/forgot/request`,
    {
      email: email,
    }
  );
};
export const passwordResetCS = (obj) => {
  return Axios.post(
    `https://gxauth.apimachine.com/gx/user/password/forgot/confirm`,
    {
      ...obj,
    }
  );
};
export const fetchBrainVideoLink = (id) => {
  return Axios.post(
    "https://vod-backend.globalxchange.io/get_user_profiled_video_stream_link",
    {
      video_id: id,
    }
  );
};
