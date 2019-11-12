import React, { Fragment } from "react";
import Comment from "./Comment";

const CommentList = props => {
  return (
    <Fragment>
      <div className="comment-list">
        {props.data &&
          props.data.comments &&
          props.data.comments.map(function(item, i) {
            return <Comment key={i} item={item} />;
          })}
      </div>
    </Fragment>
  );
};

export default CommentList;
