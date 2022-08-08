import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
//import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom";
import { Container, Header } from "./styles";
import { YappyButton } from "./yappy";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { IconOption } from "../sidebar/IconOption";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedIcon from "@mui/icons-material/Verified";
import { UserContext } from "../../context/UserContext";
import Loader from "../../Loader";

export const Yappy = () => {
  const [url, setUrl] = useState("");
  const [activeOption, setActiveOption] = useState("inicio");
  const [userContext, setUserContext] = useContext(UserContext);
  const URI = "http://localhost:4000/";

  const fetchUserDetails = useCallback(() => {
    fetch(URI + "auth/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload();
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  const activaOption = (text, e) => {
    setActiveOption(text);
  };

  const onFindUrl = async () => {
    console.log(userContext.details._id);
    const { data } = await axios.post(`${URI}api/pagosbg`, { id: userContext.details._id});
    setUrl(data.url);
    fetchUserDetails();
  };

  return !userContext.details ? (
    <Loader />
  ) : (
    <Container>
      <Header>
        <img
          class="yappy-logo"
          width={200}
          height={50}
          src={require(".//img/yappy-logo.png")}
        />
      </Header>
      <section>
        <form id="bird-form" action="">
          <h1>{userContext.details.premiun ? "Ya eres premiun!" : "Haste Premium!"}</h1>
          <br />
          <IconOption
            active={false}
            text="Tendras una marca de verificación"
            Icon={WorkspacePremiumIcon}
          />{" "}
          <br />
          <IconOption
            active={false}
            text="Podrás borrar y editar mensajes"
            Icon={EditIcon}
          />
          <br />
          <IconOption
            active={false}
            text="Por solo 0.07 centavos"
            Icon={AttachMoneyIcon}
          />
          <br />
          <div onClick={onFindUrl}>
            <IconOption
              active={true}
              primary
              text="Cambiar a Premium!"
              Icon={VerifiedIcon}
            />
          </div>
          {url !== "" ? 
            <YappyButton urlYappy={url} /> 
          : false}
        </form>
      </section>
    </Container>
  );
};
