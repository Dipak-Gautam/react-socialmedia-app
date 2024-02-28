import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  postlist: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostlist, action) => {
  let newpostlist = currPostlist;
  if (action.type === "DELETE_POST") {
    newpostlist = currPostlist.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newpostlist = [action.payload, ...currPostlist];
  } else if (action.type === "ADD_POSTSWEB") {
    newpostlist = action.payload.posts;
  }
  return newpostlist;
};

const PostListProvider = ({ children }) => {
  const [postlist, dispatchPostlist] = useReducer(postListReducer, []);

  const addPost = (post) => {
    dispatchPostlist({
      type: "ADD_POST",
      payload: post,
    });
  };

  const deletePost = (postId) => {
    dispatchPostlist({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };
  const addPostsweb = (posts) => {
    dispatchPostlist({
      type: "ADD_POSTSWEB",
      payload: {
        posts,
      },
    });
  };
  const [fetching, setfetching] = useState(false);

  useEffect(() => {
    setfetching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addPostsweb(data.posts);
        setfetching(false);
      });
  }, []);

  return (
    <PostList.Provider value={{ postlist, addPost, deletePost, fetching }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
