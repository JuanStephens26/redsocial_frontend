import React from "react";
import { Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Widget, Header, DivIcon, DivContent } from "./styles";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";

export const Widgets = () => {
  return (
    <Widget>
      <Header>
        <DivIcon>
          <SearchIcon className="searchIcon" />
          <input placeholder="Buscar en twitter clone" />
        </DivIcon>
      </Header>
      <DivContent>
        <h2>¿Qué esta pasando?</h2>
      </DivContent>
      <TwitterTweetEmbed tweetId={"1540877687945822209"} />
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="Juan74976908"
        options={{ height: 400 }}
      />
      <TwitterShareButton
        url={"https://facebook.com/saurabhnemade"}
        options={{ text: "#reactjs is awesome", via: "saurabhnemade" }}
      />
    </Widget>
  );
};
