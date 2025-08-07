import axios from "axios";
import { useMutation } from "react-query";

export async function loginFunc(paramData) {
  const { data } = await axios.post(
    "https://gxauth.apimachine.com/gx/user/auth/login",
    paramData
  );
  return data;
}

export async function registerOnApp({ email, app_code }) {
  const { data } = await axios.post(
    "https://comms.globalxchange.io/gxb/apps/register/user",
    {
      email,
      app_code,
      fromAppCreation: true,
    }
  );
  return data;
}

const requestLoginChallenge = async (body) => {
  try {
    const data = await axios.post(
      `https://gxauth.apimachine.com/gx/user/auth/login/challenge`,
      body
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const useRequestLoginChallenge = () =>
  useMutation(requestLoginChallenge);

export const initiateForgotPassword = (object) => {
  try {
    const response = axios.post(
      `https://gxauth.apimachine.com/gx/user/password/forgot/request`,
      object
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const completeForgotPassword = (object) => {
  try {
    const response = axios.post(
      `https://gxauth.apimachine.com/gx/user/password/forgot/confirm`,
      object
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
