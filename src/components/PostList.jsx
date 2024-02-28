import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as postlistdata } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingScreen from "./LoadingScreen";

export default function PostList() {
  const { postlist, fetching } = useContext(postlistdata);

  return (
    <>
      {fetching && <LoadingScreen />}
      {!fetching & (postlist.length === 0) && <WelcomeMessage />}
      {postlist.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
