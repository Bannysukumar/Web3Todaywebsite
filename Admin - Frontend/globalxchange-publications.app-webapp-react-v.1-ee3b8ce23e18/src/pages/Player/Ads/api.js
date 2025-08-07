


import axios from 'axios';


export const getadds = async (email) => {
  try {
    const data = await axios.get(
      `https://comms.globalxchange.io/coin/promo/farm/users/get?advertiser=true`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};



export const getNews = async (email) => {
    try {
      const data = await axios.get(
        `https://comms.globalxchange.io/coin/promo/farm/video/campaign/get?email=${email}&status=active`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  export const getVideo = async (email) => {
    try {
      const data = await axios.get(
        `https://comms.globalxchange.io/coin/promo/farm/video/campaign/get?email=${email}&status=active`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  

  export const clainRewards = async (obj) => {
    try {
      const data = await axios.post(
        `https://comms.globalxchange.io/coin/promo/farm/video/campaign/claim`,
          obj
        );
      return data;
    } catch (err) {
      console.error(err);
    }
  };
