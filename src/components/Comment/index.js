import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import "./comment.scss";

const Comment = ({comment = null, handleDeleteComment = () => {}}) => {

    return (
        <>
            {
                comment && (
                    <div className="comment">
                        <strong className="comment__name">{comment.name}</strong>
                        <p className="comment__parag">{comment.body}</p>
                        <span className="comment__email">{comment.email}</span>
                        <div className="comment__delete" onClick={() => handleDeleteComment(comment?.id)}>
                            <FaRegTrashCan />
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Comment