import React, { useState, useEffect, useCallback, useContext } from "react";
import { Tweetbox, Form, Div, Avatar, DivBox, File } from "./styles";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Button } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import Loader from "../../Loader";
import axios from "axios";
import User from "../../img/usuario.png";

export const TweetBox = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [images, setImages] = useState("");
  const [tweetImg, setTweetimg] = useState("");
  const [usuario, setUsuario] = useState("");
  const [tweetMsg, settweetMsg] = useState("");

  const URI = process.env.URI || "http://localhost:4000/";
  const URIIMAGE_POST =
    process.env.URIIMAGE_POST || "http://localhost:4000/img/imgpost";
  const URIIMAGE_PROFILE =
    process.env.URIIMAGE_PROFILE || "http://localhost:4000/img/imgprofile";

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

  const refetchHandler = () => {
    // set details to undefined so that spinner will be displayed and
    //  fetchUserDetails will be invoked from useEffect
    setUserContext((oldValues) => {
      return { ...oldValues, details: undefined };
    });
  };

  const sendTweet = async (e) => {
    e.preventDefault();
    /*if (usuario.length < 1) {
      return alert("Debes ingresar un nombre de usuario");
    }*/
    if (images.length < 1) {
      return alert("Debes ingresar una foto de usuario");
    }
    if (tweetMsg < 5) {
      return alert("tu Tweet debe ser mayor a 5 caracteres");
    }
    if (tweetMsg > 300) {
      return alert("tu Tweet debe ser mayor a 300 caracteres");
    } else {
      try {
        const { data } = await axios.post(`${URI}api/posts`, {
          name: userContext.details.username,
          userName: userContext.details.username,
          verified: true,
          text: tweetMsg,
          timestamp: Date.now(),
          avatar: images,
          imagePost: tweetImg,
        });
        console.log("Document written with ID: ", data);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      setTweetimg("");
      settweetMsg("");
      setUsuario("");
      window.location.reload();
    }
  };

  const handleSubir = async (e) => {
    const file = e.target.files[0];
    let InstFormData = new FormData();
    InstFormData.append("file", file);
    const { data } = await axios
      .post(`${URI}api/imgprofile`, InstFormData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    setImages(`${data.name}`);
  };

  const handlePost = async (e) => {
    const file = e.target.files[0];
    let InstFormData = new FormData();
    InstFormData.append("file", file);
    const { data } = await axios
      .post(`${URI}api/imgpost`, InstFormData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    setTweetimg(`${URIIMAGE_POST}/${data.name}`);
  };

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  return !userContext.details ? (
    <Loader />
  ) : (
    <Tweetbox>
      <Form>
        <Div>
          <Avatar src={userContext.details.profileImage ? userContext.details.profileImage : User} />

          <File type="file" onChange={handleSubir} />
          <div className="columns">
            <input
              type="text"
              placeholder="¿Qué está pensando?"
              value={tweetMsg}
              onChange={(e) => settweetMsg(e.target.value)}
            />
          </div>
        </Div>
        <Div>
          <DivBox>
            <File type="file" primary onChange={handlePost} />
            <InsertPhotoOutlinedIcon />
            <GifBoxOutlinedIcon />
            <SentimentSatisfiedOutlinedIcon />
          </DivBox>
          <File type="file" onChange={handlePost} />
          <input
            type="text"
            placeholder="Opcional: Url de la imagen/gif"
            value={tweetImg}
            onChange={(e) => setTweetimg(e.target.value)}
          />
          <Button onClick={sendTweet}>Tweet</Button>
        </Div>
      </Form>
    </Tweetbox>
  );
};
