// Package Imports
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// CSS Imports
import "./App.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

// Context Imports

import { GlobalContex } from "./globalContex";

// Image Imports

//cPage/Component Imports
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import GlobalSidebar from "./globalComponents/GlobalSidebar";
// import Elements from "./pages/Elements";
import SplashPage from "./pages/SplashPage";
import axios from "axios";
import Templates from "./pages/SplashPage/Templates";
import RegistrationContextProvider from "./RegistrationContext";
// import Sample from "./Apps/sample";
import RegisterHomePage from "./pages/Registration/pages/HomePage";
import FirstPage from "./pages/Registration/pages/FirstPage";
import InfoPage from "./pages/TheInfoPage";

function App() {
  const { loginData, selectedApp, setSelectedApp, globalMenu } =
    useContext(GlobalContex);
  // const location = useLocation();
  // const parts = location.pathname.split("/");
  // const lastPart = parts[parts.length - 1];
  // console.log(lastPart, "location");

  //get the last part of the url
  const lastPart = window.location.pathname.split("/").pop();
  // console.log(lastPart, "location");

  useEffect(() => {
    if (localStorage.getItem("selectedApp") && selectedApp === null) {
      setSelectedApp(JSON.parse(localStorage.getItem("selectedApp")));
    } else if (localStorage.getItem("selectedApp")) {
      localStorage.setItem("selectedApp", JSON.stringify(selectedApp));
    } else {
      localStorage.setItem("selectedApp", JSON.stringify(globalMenu[0]));
      setSelectedApp(globalMenu[0]);
    }
  }, [selectedApp]);

  return (
    <div style={{ height: "100%", width: "100vw", overflow: "hidden" }}>
      <RegistrationContextProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<SplashPage />} /> */}
            <Route
              path="/example"
              element={
                loginData !== null ? (
                  <Navigate to={`/${selectedApp?.appName}`} />
                ) : (
                  <SignInPage />
                )
              }
            />
            <Route
              path="/login"
              element={
                loginData !== null ? (
                  <Navigate to={`/${selectedApp?.appName}`} />
                ) : (
                  <SignInPage />
                )
              }
            />
            <Route
              path="/login/admin"
              element={
                loginData !== null ? (
                  <Navigate to={`/${selectedApp?.appName}`} />
                ) : (
                  <SignInPage />
                )
              }
            />

            <Route
              path="/login/authors"
              element={
                loginData !== null ? (
                  <Navigate to={`/${selectedApp?.appName}`} />
                ) : (
                  <SignInPage />
                )
              }
            />

            <Route exact path="/register" element={<RegisterHomePage />} />
            <Route exact path="/register/affiliate" element={<FirstPage />} />
            <Route
              exact
              path="/register/affiliate/:id"
              element={<FirstPage />}
            />
            <Route
              exact
              path="/register/pre-registered"
              element={<FirstPage />}
            />
            <Route
              exact
              path="/register/pre-registered/:id"
              element={<FirstPage />}
            />
            <Route exact path="/register/by-myself" element={<FirstPage />} />
            <Route
              exact
              path="/register/by-myself/:id"
              element={<FirstPage />}
            />

            {/* <Route path="/templates" element={<Templates />} />
            <Route
              path="/*"
              element={loginData !== null ? <HomePage /> : <SplashPage />}
            /> */}
            <Route
              path="/*"
              element={
                loginData !== null ? <HomePage /> : <Navigate to="/login" />
              }
            />
            {/* <Route path = "/sample" element={<Sample/>}/> */}
            {/* <Route
              path="*"
              element={loginData !== null ? <HomePage /> : <SignInPage />}
            /> */}
          </Routes>
        </BrowserRouter>
      </RegistrationContextProvider>
    </div>
  );
}

export default App;
