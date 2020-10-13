import React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import "./CustomTable.css";
import { getProcessedTIme } from "../utils";
import { Button, CircularProgress, withStyles } from "@material-ui/core";

function CustomTable({
  posts,
  onHidePost,
  onUpvotePost,
  onDownvotePost,
  onLoadMore,
  loadingMore,
  darkMode,
}) {
  const timestamp = getProcessedTIme(posts);

  const StyledButton = withStyles({
    root: {
      background: "rgb(255, 102, 0);",
      color: darkMode ? "white" : "black",
    },
    label: {
      textTransform: "capitalize",
    },
  })(Button);

  return (
    <div className="customTable">
      {posts.map((post, i) => (
        <div key={post.objectID} className="customTable__row">
          <span>{i + 1}.</span>
          <div className="customTable__row__upvote">
            <ArrowDropUpIcon
              className="customTable__row__icon"
              onClick={() => onUpvotePost(i)}
            ></ArrowDropUpIcon>
          </div>
          <div>
            <div className="customTable__row__primary">
              <a href={post.url} rel="noopener noreferrer" target="_blank">
                {post.title}
              </a>
            </div>
            <div className="customTable__row__secondary">
              <div>
                {post.points} points by {post.author} {timestamp[i]}
              </div>
              <div
                className="customTable__row__secondary__hide"
                onClick={() => onHidePost(i)}
              >
                <span className="customTable__row__secondary__seprator">|</span>
                hide
              </div>
              <div>
                <span className="customTable__row__secondary__seprator">|</span>
                {post.num_comments} comments
              </div>
              <div>
                <span className="customTable__row__secondary__seprator">|</span>
                {post.upvotes} upvotes
              </div>
              {post.upvotes > 0 ? (
                <div>
                  <span className="customTable__row__secondary__seprator">
                    |
                  </span>
                  <span
                    className="customTable__row__secondary__downvote"
                    onClick={() => onDownvotePost(i)}
                  >
                    downvote
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      {loadingMore ? (
        <div className="customTable__progressBar">
          <CircularProgress />
        </div>
      ) : (
        <StyledButton onClick={onLoadMore}>MORE</StyledButton>
      )}
    </div>
  );
}

export default CustomTable;
