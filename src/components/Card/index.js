import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import "./card.scss";
import { useNavigate } from "react-router-dom";

const Card = ({ cardItem = null, handleDeletePost = () => {} }) => {
    const navigate = useNavigate();

  return (
    <>
      {cardItem && (
        <div className="card">
          <div className="card__info" onClick={() => navigate(`/post-detail/${cardItem.id}`)}>
            <h3>{cardItem.title}</h3>
            <p>{cardItem.body}</p>
          </div>
          <div className="card__icons" onClick={() => handleDeletePost(cardItem?.id)}>
            <div>
                <FaRegTrashCan />
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default Card;
