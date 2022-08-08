import React, { useEffect, useState, useContext } from "react";
import { Contenedor } from "./styles";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { IconOption } from "./IconOption";
import { Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext"

export const Sidebar = () => {
  const [activeOption, setActiveOption] = useState("Inicio");
  const [userContext, setUserContext] = useContext(UserContext);

  const URI = process.env.URI || "http://localhost:4000/";

  const activaOption = (text, e) => {
    setActiveOption(text);
  };

  const logoutHandler = () => {
    fetch(URI + "auth/logout", {
      credentials: "include",
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      setUserContext(oldValues => {
        return { ...oldValues, details: undefined, token: null }
      }) 
      window.localStorage.setItem("logout", Date.now())
    })
  }

  return (
    <Contenedor>
      <TwitterIcon className="mediasocial-logo" />

      <NavLink onClick={(e) => activaOption("Inicio", e)} className="mediasocial-option" to="/">
        <IconOption
          active={activeOption === "Inicio" ? true : false}
          text="Inicio"
          link="/"
          Icon={HomeIcon}
        />
      </NavLink>
      
      <NavLink onClick={(e) => activaOption("Perfil", e)} className="mediasocial-option" to="/profile">
        <IconOption
          active={activeOption === "Perfil" ? true : false}
          text="Perfil"
          link="/profile"
          Icon={PermIdentityOutlinedIcon}
        />
      </NavLink>

      <NavLink onClick={(e) => activaOption("Premium", e)} className="mediasocial-option" to="/yappy">
        <IconOption
          active={activeOption === "Premium" ? true : false}
          text="Premium"
          link="/yappy"
          Icon={WorkspacePremiumIcon}
        />
      </NavLink>

         <div onClick={(e) => logoutHandler()}>
        <IconOption
          active={false}
          text="Cerrar Sesión"
          Icon={LogoutIcon}
          />
          </div>

      <Button variant="outlined" fullWidth>
        Tweet
      </Button>
    </Contenedor>
  );
};
