import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../../store/posts";
import Card from "../../components/Card";
import Search from "../../components/Search";
import { IoMdAddCircle } from "react-icons/io";
import CustomFormModal from "../../components/CustomFormModal";
import "./posts.scss";
import Loading from "../../components/Loading";

const Posts = () => {
  const [filter, setFilter] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdatablePost, setIsUpdatablePost] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    body: "",
  });
  const dispatch = useDispatch();
  const { posts, postsLoading, postsError } = useSelector((state) => state.posts);

  const formFields = [
    {
      name: "title",
      label: "Başlık",
      type: "text",
      placeholder: "Başlık",
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
  const onSearchChange = (e) => {
    const searchField = e.target.value.toLocaleLowerCase();
    setFilter(() => {
      return searchField;
    });
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (addForm.title === "" || addForm.body === "") {
      toast.error("Formu lütfen eksiksiz doldurun.", {
        closeButton: false,
      });
      return null;
    }
    if (isUpdatablePost) {
      handleUpdateForm(e);
    } else {
      dispatch(
        createPost({
          title: addForm?.title,
          body: addForm?.body,
          userId: +posts?.length + 1,
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
    }
  };

  const handleUpdateForm = async (e) => {
    e.preventDefault();

    dispatch(
      updatePost({
        title: addForm?.title,
        body: addForm?.body,
        userId: addForm?.userId,
        id: addForm?.id,
      })
    )
      .then(() => {
        toast.success("Post başarılı bir şekilde güncellendi.", {
          closeButton: true,
        });
        setAddForm({
          title: "",
          body: "",
        });
        setIsOpenModal(false);
      })
      .catch(() => {
        toast.error("Post güncellenemedi.", {
          closeButton: false,
        });
      });
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  const handleUpdatePostOpen = (id) => {
    if (posts[+id - 1]) {
      setAddForm((prevData) => ({ ...prevData, ...posts[+id - 1] }));
      setIsOpenModal(true);
      setIsUpdatablePost(true);
    } else {
      toast.error("Post güncelenebilir değil.", {
        closeButton: false,
      });
    }
  };

  const handleOpenForm = () => {
    setAddForm({
      title: "",
      body: "",
    });
    setIsOpenModal(true);
    setIsUpdatablePost(false);
  };

  const filterePosts = posts?.filter((post) => {
    return post?.title?.toLocaleLowerCase()?.includes(filter);
  });

  useEffect(() => {
    if (posts?.length === 0) {
      dispatch(getPosts());
    }
  }, []);

  return (
    <div className="postsPage">
      <Search onChangeHandler={onSearchChange} />
      <div className="postsPage__addNew" onClick={handleOpenForm}>
        <span>Yeni Post Ekle</span>
        <IoMdAddCircle />
      </div>
      {
        postsError ? (
          <span className="notFound">
            İçerik Bulunamadı, Lütfen Daha Sonra Tekrar Deneyiniz
          </span>
        ) : (
          <>          
          <div className="postsPage__cards">
            {!postsLoading ? (
              posts?.length > 0 &&
              filterePosts.map((item) => (
                <Card
                  key={item?.id}
                  cardItem={item}
                  handleDeletePost={handleDeletePost}
                  handleUpdatePostOpen={handleUpdatePostOpen}
                />
              ))) : <Loading loadingClass="postPage" /> }
          </div>
          <CustomFormModal
            isOpen={isOpenModal}
            setOpen={setIsOpenModal}
            title={`${!!isUpdatablePost ? "Güncelle" : "Yeni Post Ekle"}`}
            formFields={formFields}
            formData={addForm}
            onSubmit={handleAddPost}
            onChange={handleChange}
          />
      </>
        )
      }
      </div>
  );
};

export default Posts;
