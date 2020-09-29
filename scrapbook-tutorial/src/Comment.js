import React, { Component } from "react";

const CommentBody = (props) => {
  const rows = props.characterData.map((row, index) => {
    return (
      <div className="comment" key={index}>
        <ul class="commentwrapper">
          <li class="comment-name">
            <label>{row.name}</label>
          </li>
          <li class="comment-mesage">
            <label>{row.comment}</label>
          </li>
        </ul>
      </div>
    );
  });

  return <div className="comments">{rows}</div>;
};

const Comment = (props) => {
  const { characterData } = props;

  return <CommentBody characterData={characterData} />;
};

export default Comment;
