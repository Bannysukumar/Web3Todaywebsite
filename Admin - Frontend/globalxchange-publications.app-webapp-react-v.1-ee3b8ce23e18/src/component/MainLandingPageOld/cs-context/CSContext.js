import React, { Component, createContext } from "react";
import ConstantCS from "../../../Constant";

export const CStartup = createContext();

export class CStartupProvider extends Component {
  state = {
    first: "hye",
    fullSizeSidebar: false,
    mainSearch: false,
    mainSearchTerm: "",
    selectedTab: { count: 0, type: ConstantCS.csSidebarList[0] },
    selectedCountry: null,
    sidebarDifference: 0,
    loginStatus: false,
    //V.V.I.P
    loggedIn: {
      status: false,
      details: null,
    },
  };
  handleLogout = () => {
    this.setLoginStatus(true);
    this.setSelectedTab({
      count: 100,
      type: { leyId: "xx10", name: "Login", id: "login" },
    });
    this.setLoggedIn({ status: false, details: null });
    localStorage.setItem("userEmail", "");
    localStorage.setItem("userEmailPermanent", "");
    localStorage.setItem("deviceKey", "");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("idToken", "");
    localStorage.setItem("refreshToken", "");
  };
  setLoggedIn = (obj) => {
    this.setState({ loggedIn: obj });
  };
  setLoginStatus = (val) => {
    this.setState({ loginStatus: val });
  };
  setSidebarDifference = (num) => {
    this.setState({ sidebarDifference: num });
  };
  setSelectedCountry = (obj) => {
    this.setState({ selectedCountry: obj });
  };
  setSelectedTab = (obj) => {
    this.setState({ selectedTab: obj });
  };
  setMainSearch = (val) => {
    this.setState({ mainSearch: val });
  };
  setMainSearchTerm = (val) => {
    this.setState({ mainSearchTerm: val });
  };
  setFullSizeSidebar = (val) => {
    this.setState({ fullSizeSidebar: val });
  };
  changeFirst = () => {
    this.setState({ first: "Bye" });
  };

  render() {
    return (
      <CStartup.Provider
        value={{
          ...this.state,
          changeFirst: this.changeFirst,
          setFullSizeSidebar: this.setFullSizeSidebar,
          setMainSearch: this.setMainSearch,
          setMainSearchTerm: this.setMainSearchTerm,
          setSelectedTab: this.setSelectedTab,
          setSelectedCountry: this.setSelectedCountry,
          setSidebarDifference: this.setSidebarDifference,
          setLoginStatus: this.setLoginStatus,
          setLoggedIn: this.setLoggedIn,
          handleLogout: this.handleLogout,
        }}
      >
        {this.props.children}
      </CStartup.Provider>
    );
  }
}
