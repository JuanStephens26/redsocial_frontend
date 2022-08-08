import React, { useEffect, useState, useContext, useCallback  } from "react";
import { Container, Header } from "./styles";
import { TweetBox } from "./TweetBox";
import { UserContext } from "../../context/UserContext";
import { Posts } from "./Posts";
import Loader from "../../Loader";
import axios from "axios";

export const Home = () => {
  const [post, setPost] = useState([]);
  const [userContext, setUserContext] = useContext(UserContext);

  const URI = "http://localhost:4000/";

  const getPost = async () => {
    try {
      const posts = [];
      const { data } = await axios.get(`${URI}api/posts`);
      data.map((doc) => posts.push({ ...doc }));
      setPost(posts);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
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
    getPost();
  }, []);

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  return !userContext.details ? (
    <Loader />
  ) : (
    <Container>
      {/* header */}
      <Header>
        <h2>Inicio</h2>
      </Header>
      <TweetBox />

      {post.map((pos) => (
        <Posts
          key={pos._id}
          id={pos._id}
          name={pos.name}
          userName={pos.userName}
          verified={pos.verified}
          text={pos.text}
          timestamp={pos.timestamp}
          avatar={userContext.details.profileImage}
          imagePost={pos.imagePost}
        />
      ))}
    </Container>
  );
};
