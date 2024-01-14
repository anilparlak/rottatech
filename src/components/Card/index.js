import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

import "./card.scss";
import { useNavigate } from "react-router-dom";

const Card = ({ cardItem = null, handleDeletePost = () => {}, handleUpdatePostOpen = () => {} }) => {
    const navigate = useNavigate();

  return (
    <>
      {cardItem && (
        <div className="card">
          <div className="card__info" onClick={() => navigate(`/post-detail/${cardItem.id}`)}>
            <h3>{cardItem.title}</h3>
            <p>{cardItem.body}</p>
          </div>
          <div className="card__icons">
            <div onClick={() => handleUpdatePostOpen(cardItem?.id)}>
                <VscGitPullRequestNewChanges />
            </div>
            <div onClick={() => handleDeletePost(cardItem?.id)}>
                <FaRegTrashCan />
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default Card;
