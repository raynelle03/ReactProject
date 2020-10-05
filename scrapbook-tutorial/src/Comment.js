import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default (props) => {
  const comments = props.characterData.map((commentItem, index) => {
    return <CommentList index={index} commentItem={commentItem} />;
  });

  return (
    <Droppable droppableId="allcomments">
      {(provided) => (
        <div
          className="comments"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {comments}
        </div>
      )}
    </Droppable>
  );
};

const CommentList = (props) => {
  const testid = `item-${props.index}`;
  return (
    <Draggable draggableId={testid} index={props.index} key={props.index}>
      {(provided) => (
        <div
          className="comment"
          key={props.index}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ul className="commentItem" key={props.index}>
            <li className="commentItem-name">
              <label>{props.commentItem.name}</label>
            </li>
            <li className="commentItem-message">
              <label>{props.commentItem.comment}</label>
            </li>
          </ul>
        </div>
      )}
    </Draggable>
  );
};

const CommentItem = (props) => {
  console.log(props);
  return (
    <ul className="commentItem" key={props.index}>
      <li className="commentItem-name">
        <label>{props.commentItem.name}</label>
      </li>
      <li className="commentItem-message">
        <label>{props.commentItem.comment}</label>
      </li>
    </ul>
  );
};
