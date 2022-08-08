import React, { useState, useEffect, useContext } from "react";
import { Container, File, Div } from "./styles";
import {
  Avatar,
  PostBody,
  PostDescription,
} from "./styles";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import User from "../../img/usuario.png";
import axios from "axios";
import Loader from "../../Loader";
import { UserContext } from "../../context/UserContext";
const URI = process.env.URI || "http://localhost:4000/";
const URIIMAGE_POST =
  process.env.URIIMAGE_POST || "http://localhost:4000/img/imgpost";
const URIIMAGE_PROFILE =
  process.env.URIIMAGE_PROFILE || "http://localhost:4000/img/imgprofile";

export const ProfileBio = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [images, setImages] = useState("");
  const [descriptionProfile, setDescriptionProfile] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");

  const changeProfileImage = async (image) => {
    const { data } = await axios.post(`${URI}api/user`,
        {
          username,
          "imageProfile": image
       }
    )
    .catch((error) => {
      console.log(error.toJSON());
    });
  }

  const fetchUserDetails = () => {
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
  };

  const handleSubir = async (e) => {
    const file = e.target.files[0];
    let InstFormData = new FormData();
    InstFormData.append("file", file);
    InstFormData.append("_id", file);
    const { data } = await axios
      .post(`${URI}api/imgprofile`, InstFormData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });

    await changeProfileImage(`${URIIMAGE_PROFILE}/${data.name}`)
    setImages(`${URIIMAGE_PROFILE}/${data.name}`);
    fetchUserDetails();
  };

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  useEffect(() => {
    setImages(userContext.details.profileImage ? userContext.details.profileImage : "");
    setDescriptionProfile(userContext.details.descriptionProfile ? userContext.details.descriptionProfile: "");
    setName(userContext.details.firstName);
    setLastName(userContext.details.lastName);
    setUserName(userContext.details.username);
  }, []);

  return !userContext.details ? (
    <Loader />
  ) : (
    <Container>
      <div className="post-avatar">
      <Div>
        <Avatar src={images ? images : User} />
        <File type="file" onChange={handleSubir} />
        </Div>
        <PostBody>
          <div>
            <h3>
              {name}
              <span>
                <VerifiedUserIcon className="post_icon" />
                {username}
              </span>
            </h3>
          </div>
          <>
            <h1>Sobre Mi</h1>
            <PostDescription>
              <p>
                 {descriptionProfile}
              </p>
            </PostDescription>
          </>
        </PostBody>
      </div>
    </Container>
  );
};
