import React, { useEffect, useState } from "react";
import "./App.css";
import CustomTable from "./Components/CustomTable";
import Toolbar from "./Components/ToolBar";
import axios from "./axios";
import { CircularProgress } from "@material-ui/core";

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [initialResLoaded, setInitialResLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const storeUpvoteToLocalStorage = (post) => {
    const upvotesObjStr = localStorage.getItem("upvotesObj");
    let upvotesObj = {};
    if (upvotesObjStr) {
      upvotesObj = JSON.parse(upvotesObjStr);
    }

    upvotesObj[post.objectID] = post.upvotes;
    localStorage.setItem("upvotesObj", JSON.stringify(upvotesObj));
  };

  const getUpvoteFromLocalStorage = (post) => {
    const upvotesObjStr = localStorage.getItem("upvotesObj");
    let upvotesObj = {};
    if (upvotesObjStr) {
      upvotesObj = JSON.parse(upvotesObjStr);
    }

    if (upvotesObj[post.objectID]) {
      return upvotesObj[post.objectID];
    }

    return 0;
  };

  const processPosts = (posts) => {
    const processedPostsArr = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].title) {
        posts[i]["upvotes"] = getUpvoteFromLocalStorage(posts[i]);
        processedPostsArr.push(posts[i]);
      }
    }

    return processedPostsArr;
  };

  useEffect(() => {
    axios
      .get(`/search`)
      .then((res) => {
        const processedPostsArr = processPosts(res.data.hits);
        console.log(processedPostsArr);
        setPosts(processedPostsArr);
        setInitialResLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/search?page=${page}`)
      .then((res) => {
        const processedPostsArr = processPosts(res.data.hits);
        const newPosts = [...posts, ...processedPostsArr];
        setPosts(newPosts);
        setLoadingMore(false);
      })
      .catch((err) => {
        setLoadingMore(false);
        console.log(err);
      });
  }, [page]);

  const onLoadMoreHandler = () => {
    const newPage = page + 1;
    setLoadingMore(true);
    setPage(newPage);
  };

  const onUpvotePostHandler = (index) => {
    const newPosts = [...posts];
    newPosts[index]["upvotes"]++;
    storeUpvoteToLocalStorage(newPosts[index]);
    setPosts(newPosts);
  };

  const onDownvotePostHandler = (index) => {
    console.log("upvote:", index);
    const newPosts = [...posts];
    newPosts[index]["upvotes"]--;
    storeUpvoteToLocalStorage(newPosts[index]);
    setPosts(newPosts);
  };

  const onHidePostHandler = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  return (
    <div className="app">
      <Toolbar></Toolbar>
      <div className="app__body">
        {posts.length > 0 ? (
          <CustomTable
            posts={posts}
            onHidePost={onHidePostHandler}
            onUpvotePost={onUpvotePostHandler}
            onDownvotePost={onDownvotePostHandler}
            onLoadMore={onLoadMoreHandler}
            loadingMore={loadingMore}
          ></CustomTable>
        ) : (
          <CircularProgress className="app__body__progressBar" />
        )}
      </div>
      {initialResLoaded ? (
        <div className="app__footer">
          <div className="app__footer__links">
            <div>Guidelines</div>
            <div>
              <span className="app__footer__links__seprator">|</span>
              FAQ
            </div>
            <div>
              <span className="app__footer__links__seprator">|</span>
              Support
            </div>
            <div>
              <span className="app__footer__links__seprator">|</span>
              API
            </div>
            <div>
              <span className="app__footer__links__seprator">|</span>
              Security
            </div>
            <div>
              <span className="app__footer__links__seprator">|</span>
              Lists
            </div>
            <div>
              <span className="app__footer__links__seprator">|</span>
              Bookmarklet
            </div>
            <div>
              <span className="app__footer__links__seprator">|</span>
              Legal
            </div>
            <div>
              <span className="app__footer__links__seprator">|</span>
              Apply to YC
            </div>
            <div>
              <span className="app__footer__links__seprator">|</span>
              Contact
            </div>
          </div>
          <div className="app__footer__searchbar">
            <label>Search:</label>
            <input></input>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
