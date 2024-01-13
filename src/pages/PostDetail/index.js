import React, { useEffect } from "react";

import "./postDetail.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetail } from "../../store/postDetail";
import { getComments, deleteComment } from "../../store/comments";
import Comment from "../../components/Comment";
import { IoMdAddCircle } from "react-icons/io";


const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { postDetail, postDetailLoading, postDetailError } = useSelector(
    (state) => state.postDetail
  );
  const { comments, commentsLoading, commentsError } = useSelector(state => state.comments);

  useEffect(() => {
    dispatch(getPostDetail({ id: postId }));
    dispatch(getComments({ id: postId }));
  }, [postId]);

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id))
  }
  return (
    <>
      {!postDetailLoading && !!postDetail && (
        <div className="postDetail">
          <h1>{postDetail.title}</h1>
          <p>{postDetail.body}</p>
          <div className="postsPage__addNew" >
            <span>Yeni Yorum Ekle</span>
            <IoMdAddCircle />
          </div>
          {!commentsLoading && comments?.length > 0 && (
            <div className="postDetail__comments">
                {comments?.map((item) => (
                    <Comment key={item?.id} comment={item} handleDeleteComment={handleDeleteComment} />
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostDetail;
