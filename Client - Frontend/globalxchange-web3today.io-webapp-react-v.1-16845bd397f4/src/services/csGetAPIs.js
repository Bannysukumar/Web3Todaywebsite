import Axios from "axios";

export const getCountryList = () => {
  return Axios(
    `https://storeapi.apimachine.com/dynamic/InstaCryptoPurchase/Countrydem?key=b6459026-2535-434e-bc4c-893fae5fc87d`
  );
};

export const getAllAppPresentCS = () => {
  return Axios(`https://comms.globalxchange.io/gxb/apps/get`);
};
export const getUserDetailsCS = (email) => {
  return Axios.get(
    `https://comms.globalxchange.io/user/details/get?email=${email}`
  );
};
export const getVideoInfo = (id) => {
  return Axios(`https://fxagency.apimachine.com/video/video_id/${id}`);
};
export const fetchArticleIdId = (id) => {
  return Axios(`https://fxagency.apimachine.com/article/${id}`);
};
