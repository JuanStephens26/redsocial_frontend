import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Post,
  Avatar,
  PostBody,
  PostDescription,
  Images,
  PostFooter,
} from "./styles";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import {
  Navigate,
  useNavigate,
} from "react-router-dom";
//import { deletePost } from "../../../../birdtrol_backend/src/controllers/posts.controllers";
const URI = "http://localhost:4000/";
export const Posts = ({
  key,
  id,
  name,
  userName,
  verified,
  text,
  timestamp,
  avatar,
  imagePost,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(true);
  const [textPost, settextPost] = useState(text);
  const [userContext, setUserContext] = useContext(UserContext);
  const Navigate = useNavigate();

  const optionTogle = (isBool) => {
    if (!userContext.details.premiun) {
      alert("¡Para obtener esta funcionalidad debe hacerte premiun!");
      return false;
    }
    const optionActive = isBool ? setIsOpen(false) : setIsOpen(true);
  };

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

  const deletePost = async (id) => {
    try {
      const posts = [];
      const { data } = await axios.delete(`${URI}api/posts/${id}`);
      setShow(false);
      //Navigate("/");
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };

  const savePost = async (id) => {
    try {
      const posts = [];
      const { data } = await axios.put(`${URI}api/posts`,
      {
        id: id,
        text: textPost
      });
      setIsEdit(false);
      setIsOpen(false);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };

  return show ? (
    <Post>
      <div className="post-avatar">
        <div className="post-more">
          {" "}
          <br />
          <MoreHorizIcon fontSize="small" onClick={() => optionTogle(isOpen)} />
          {isOpen ? (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEdit(true)}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deletePost(id)}
              >
                Borrar
              </Button>
            </Stack>
          ) : (
            ""
          )}
        </div>
        <div className="post-more">
          {isEdit ? (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => savePost(id)}
                color="primary"
              >
                Guardar
              </Button>
            </Stack>
          ) : (
            ""
          )}
        </div>
        <Avatar src={avatar} />
        <PostBody>
          <div>
            <div>
              <h3>
                {name}
                <span>
                  <VerifiedUserIcon className="post_icon" />
                  {userName}
                </span>
              </h3>
              <PostDescription>
                <p>
                  {isEdit ? (
                    <div className="columns">
                      <input
                        type="text"
                        placeholder="¿Qué está pensando?"
                        value={textPost}
                        onChange={(e) => settextPost(e.target.value)}
                      />
                    </div>
                  ) : (
                    textPost
                  )}
                </p>
              </PostDescription>
            </div>
            <Images src={imagePost} />
            <PostFooter>
              <ChatBubbleOutlineIcon fontSize="small" />
              <RepeatIcon fontSize="small" />
              <FavoriteBorderIcon fontSize="small" />
              <PublishIcon fontSize="small" />
            </PostFooter>
          </div>
        </PostBody>
      </div>
    </Post>
  ) : (
    false
  );
};
