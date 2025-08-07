import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Switch } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { RegistrationContext } from "../../RegistrationContext";

import FirstPage from "./pages/FirstPage";
import HomePage from "./pages/HomePage";
import "./App.scss";

const Registration = () => {
  const { setInitialPath, setAppData, appData, setLoading, loading } =
    useContext(RegistrationContext);

  return !loading ? <HomePage /> : "";
};

export default Registration;
