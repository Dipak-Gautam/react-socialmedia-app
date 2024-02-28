import React, { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { PostList } from "../store/post-list-store";

export default function Post({ post }) {
  const { deletePost } = useContext(PostList);

  return (
    <div
      className="card  post-card"
      style={{
        width: "38rem",
        backgroundColor: "#f9e7e7",
        borderRadius: "20px",
      }}
    >
      <div className="card-body">
        <h3 className="card-title fw-bold">{post.title}</h3>
        <p className="card-text">{post.body}</p>

        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          onClick={() => deletePost(post.id)}
        >
          <MdDeleteForever />
          <span className="visually-hidden">unread messages</span>
        </span>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-light my-2 mx-1">
            #{tag}
          </span>
        ))}
        <div>
          <button type="button" className="btn btn-primary my-2 ">
            reactions{" "}
            <span className="badge text-bg-secondary">{post.reactions}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
