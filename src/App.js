import React from 'react'
import GlobalStyles from './styles/GlobalStyles'
import { Home } from "./componentes/home";
import { useContext, useState, useCallback, useEffect } from "react"
import { UserContext } from "./context/UserContext"
import { Sidebar } from "./componentes/sidebar";
import { Widgets } from "./componentes/widgets";
import { Login } from "./componentes/login";
import { Register } from "./componentes/register";
import {Profile} from "./componentes/profile";
import {Yappy} from "./componentes/yappy";
import Loader from "./Loader"
import {
  Routes,
  Route,
  Navigate,
  Switch,
  Redirect
} from "react-router-dom";


function App() {
  const [userContext, setUserContext] = useContext(UserContext)
  const URI = process.env.URI || "http://localhost:4000/";

  const verifyUser = useCallback(() => {
    fetch(URI + "auth/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  return userContext.token === null ? (
    <div>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    <GlobalStyles /> 
    </div>
    ) : userContext.token ? (
      <div className="App">
    <Sidebar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/yappy" element={<Yappy />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Widgets />
    <GlobalStyles /> 
    </div>
    ) : (
      <Loader />
    )
}

export default App;
