import React, { useState } from "react";
import { useEffect } from "react";
import PostData from "./PostsData";

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isEditClicked, setEditClicked] = useState(false);
  const [selectedId, setSelectdId] = useState(null);

  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  const fetchPostsData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data?.length > 0) {
        setPosts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editPost = (item) => {
    window.scrollTo(0, 0)
    const { id, title, body } = item;
    setBody(body);
    setTitle(title);
    setSelectdId(id);
    setEditClicked(true);
  };
  const editContent = (selectedId) => {
    fetch(`${apiUrl}/${selectedId}`, {
      method: "PUT",
      body: JSON.stringify({
        id: selectedId,
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      const postIndex = posts.findIndex((post) => post.id === selectedId);
      if (postIndex !== -1) {
        posts[postIndex].title = title;
        posts[postIndex].body = body;
        setPosts([...posts]);
      }
      setEditClicked(false);
      setSelectdId(null);
    });
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value);
  
    if (name === "title") {
      setTitle(value);
    }
    if (name === "body") {
      setBody(value);
    }
  };
  console.log(title);
  console.log(body);
  const addNewPost = () => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
        setAddPost(!addPost);
        setBody("");
        setTitle("");
      });
  };
  useEffect(() => {
    fetchPostsData();
  }, []);
  useEffect(() => {
    if (addPost) {
      document.body.classList.add("stopOverflow");
    } else {
      document.body.classList.remove("stopOverflow");
    }
  }, [addPost]);
  console.log(hello);
  return (
    <>
    
      <h1>Posts Table</h1>
      <button className="addBtn" onClick={() => {
        setAddPost(true)
        setBody("")
        setTitle("")
        }}>
        Add a new post
        
      </button>
     
      <table>
        <thead>
          <th>ID</th>
          <th>TITLE</th>
          <th>BODY</th>
          <th>OPTIONS</th>
        </thead>
        <tbody>
          <PostData
            posts={posts}
            setPosts={setPosts}
            isEditClicked={isEditClicked}
            editPost={editPost}
          />
        </tbody>
      </table>
      {addPost || isEditClicked ? (
        <div className="popup">
          <div className="popup-content">
            <h1>
              {" "}
              {isEditClicked
                ? "Edit your data !!"
                : "Enter your data for new post !!"}
            </h1>
            <div className="heading">Title</div>
            <textarea
              placeholder="Enter title"
              type="text"
              onChange={handleChange}
              value={title}
              name="title"
              rows={2}
              cols={"30"}
            />
            <div className="heading">Body</div>
            <textarea
              placeholder="Enter body content"
              type="text"
              onChange={handleChange}
              value={body}
              name="body"
              rows={4}
              cols={"40"}
            />
            <button
              className="addBtn"
              onClick={() => {
                isEditClicked ? editContent(selectedId) : addNewPost();
              }}
            >
              {isEditClicked ? "Edit post" : "Add a new Post"}
            </button>
            <button
              className="close"
              onClick={() => {
                setAddPost(false);
                setEditClicked(false);
                setTitle(isEditClicked ? title : "");
                setBody(isEditClicked ? body : "");
              }}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ShowPosts;
