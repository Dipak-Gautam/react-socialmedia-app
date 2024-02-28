import React, { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

export default function Creatpost() {
  const navigate = useNavigate();
  const { addPost } = useContext(PostList);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");
    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => addPost(post));
    navigate("/");
  };
  return (
    <form className="creatpost my-5" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="user-id" className="form-label">
          <h5>Enter your user id here</h5>
        </label>
        <input
          type="text"
          ref={userIdElement}
          className="form-control"
          id="user-id"
          placeholder="user-id"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          <h3>Post Title</h3>
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How are you feelong today...."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          <h5>Post content</h5>
        </label>
        <textarea
          rows="4"
          ref={postBodyElement}
          type="text"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          <h5>Number of reactioins</h5>
        </label>
        <input
          type="number"
          ref={reactionsElement}
          className="form-control"
          id="reactions"
          placeholder="user reaction"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          <h5>Enter your tags here</h5>
        </label>
        <input
          type="tags"
          ref={tagsElement}
          className="form-control"
          id="user"
          placeholder="please enter tags using space"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
}
