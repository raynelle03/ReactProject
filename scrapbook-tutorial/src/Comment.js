import React, { Component } from "react";

export default (props) => {
  const comments = props.characterData.map((commentItem, index) => {
    return <CommentList index={index} commentItem={commentItem} />;
  });
  return <div className="comments">{comments}</div>;
};

const CommentList = (props) => {
  return (
    <div className="comment" key={props.index}>
      <CommentItem commentItem={props.commentItem} />
    </div>
  );
};

const CommentItem = (props) => {
  console.log(props);
  return (
    <ul class="commentItem">
      <li class="commentItem-name">
        <label>{props.commentItem.name}</label>
      </li>
      <li class="commentItem-message">
        <label>{props.commentItem.comment}</label>
      </li>
    </ul>
  );
};
