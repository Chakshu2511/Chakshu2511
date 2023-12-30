import React, { useEffect } from "react";

const PostData = ({ posts, setPosts, isEditClicked, editPost }) => {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  const deletePosts = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      }).then(() => {
        posts = posts.filter((post) => post.id !== id);
        setPosts(posts);
      });
    }
  };

  useEffect(() => {
    if (isEditClicked) {
      document.body.classList.add("stopOverflow");
    } else {
      document.body.classList.remove("stopOverflow");
    }
  }, [isEditClicked]);
  return (
    <>
      {posts?.map((item) => {
        const { id, title, body } = item;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{title}</td>
            <td>{body}</td>
            <td>
              <button onClick={() => editPost(item)}>Edit</button>
              <button onClick={() => deletePosts(id)}>Delete</button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
export default PostData;
