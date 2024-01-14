import React, { useEffect, useState } from "react";
import CustomFormModal from "../../components/CustomFormModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearPostDetail, getPostDetail } from "../../store/postDetail";
import {
  getComments,
  deleteComment,
  createComment,
} from "../../store/comments";
import Comment from "../../components/Comment";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import "./postDetail.scss";
import Loading from "../../components/Loading";

const PostDetail = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    body: "",
  });
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { postDetail, postDetailError, postDetailLoading} = useSelector(
    (state) => state.postDetail
  );
  const { comments, commentsLoading } = useSelector((state) => state.comments);

  const formFields = [
    {
      name: "name",
      label: "İsim",
      type: "text",
      placeholder: "İsim",
    },
    {
      name: "email",
      label: "E-mail",
      type: "email",
      placeholder: "E-mail",
    },
    {
      name: "body",
      label: "Mesaj",
      type: "textarea",
      placeholder: "Mesaj",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (addForm.title === "" || addForm.body === "") {
      toast.error("Formu lütfen eksiksiz doldurun.", {
        closeButton: false,
      });
      return null;
    }
    dispatch(
      createComment({
        name: addForm?.name,
        email: addForm?.email,
        body: addForm?.body,
        userId: +comments?.length + 1,
      })
    )
      .then(() => {
        toast.success("Post başarılı bir şekilde eklendi.", {
          closeButton: true,
        });
        setAddForm({
          title: "",
          body: "",
        });
        setIsOpenModal(false);
      })
      .catch(() => {
        toast.error("Post eklenemedi.", {
          closeButton: false,
        });
      });
  };

  useEffect(() => {
    dispatch(getPostDetail({ id: postId }));
    dispatch(getComments({ id: postId }));

    return () => {
      dispatch(clearPostDetail());
    }
  }, [postId]);

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };
  return (
    <>
      {
        postDetailLoading ? (
          <Loading />
        ) : postDetailError ? (
            <span className="notFound">
            Sayfa Bulunamadı, Lütfen Daha Sonra Tekrar Deneyiniz
          </span>
        ) : (
          <div className="postDetail">
          <h1>{postDetail?.title}</h1>
          <p>{postDetail?.body}</p>
          <div className="postDetail__container">
            <div
              className="postDetail__addNew"
              onClick={() => setIsOpenModal(true)}
            >
              <span>Yeni Yorum Ekle</span>
              <IoMdAddCircle />
            </div>
            {!commentsLoading && comments?.length > 0 && (
              <div className="postDetail__comments">
                {comments?.map((item) => (
                  <Comment
                    key={item?.id}
                    comment={item}
                    handleDeleteComment={handleDeleteComment}
                  />
                ))}
              </div>
            )}
          </div>
          <CustomFormModal
            isOpen={isOpenModal}
            setOpen={setIsOpenModal}
            title="Yeni Ekle"
            formFields={formFields}
            formData={addForm}
            onSubmit={handleAddComment}
            onChange={handleChange}
          />
        </div>
        )
      }
    </>
  );
};

export default PostDetail;
