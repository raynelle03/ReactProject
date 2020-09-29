import React, { Component } from "react";

function CommentBody(props) {
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
}

function Comment(props) {
  const { characterData } = props;

  return <CommentBody characterData={characterData} />;
}

export default Comment;
