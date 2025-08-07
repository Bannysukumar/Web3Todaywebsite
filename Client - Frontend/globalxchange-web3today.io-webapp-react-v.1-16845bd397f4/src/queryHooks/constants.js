import bondIcon from "../static/images/login/bond.svg";
import fundsCoinIcon from "../static/images/login/fundscoin.svg";
import indexfundIcon from "../static/images/login/indexfund.svg";
import portfolioIcon from "../static/images/login/portfolioai.svg";
import sharesTokenIcon from "../static/images/login/sharestoken.svg";
import stakingIcon from "../static/images/login/staking.svg";
import bondFullIcon from "../static/images/login/fullicon/bond.svg";
import fundsCoinFullIcon from "../static/images/login/fullicon/fundscoin.svg";
import indexfundFullIcon from "../static/images/login/fullicon/indexfund.svg";
import portfolioFullIcon from "../static/images/login/fullicon/portfolioai.svg";
import sharesTokenFullIcon from "../static/images/login/fullicon/sharestoken.svg";
import stakingFullIcon from "../static/images/login/fullicon/staking.svg";

export const globalMenu = (appName) => [
  {
    _id: 1,
    appName: "PortFolio.io",
    appLogo: portfolioIcon,
    appFullLogo: portfolioFullIcon,
    appColor: "#3B4859",
    content: `Access Portfolio.ai On ${appName}`,
  },
  {
    _id: 2,
    appName: "SharesToken",
    appLogo: sharesTokenIcon,
    appFullLogo: sharesTokenFullIcon,
    appColor: "#F47217",
    content: `Access SharesToken On ${appName}`,
  },
  {
    _id: 3,
    appName: "Bonds",
    appLogo: bondIcon,
    appFullLogo: bondFullIcon,
    appColor: "#50C7AD",
    content: `Access Bonds On ${appName}`,
  },
  {
    _id: 4,
    appName: "Funds",
    appLogo: fundsCoinIcon,
    appFullLogo: fundsCoinFullIcon,
    appColor: "#186AB3",
    content: `Access FundCoins On ${appName}`,
  },
  {
    _id: 5,
    appName: "IndexFunds",
    appLogo: indexfundIcon,
    appFullLogo: indexfundFullIcon,
    appColor: "#464B4E",
    content: `Access IndexFunds On ${appName}`,
  },
  {
    _id: 6,
    appName: "Staking",
    appLogo: stakingIcon,
    appFullLogo: stakingFullIcon,
    appColor: "#2E85E4",
    content: `Access Staking On ${appName}`,
  },
];
