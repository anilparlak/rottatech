import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, getPosts } from "../../store/posts";
import Card from "../../components/Card";
import Search from "../../components/Search";
import CustomModal from "../../components/CustomModal";
import { IoMdAddCircle } from "react-icons/io";
import Button from "../../components/Button";
import "./posts.scss";

const Posts = () => {
  const [filter, setFilter] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    body: "",
  });
  const dispatch = useDispatch();
  const { posts, postsLoading } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };
  const onSearchChange = (e) => {
    const searchField = e.target.value.toLocaleLowerCase();
    setFilter(() => {
      return searchField;
    });
  };

  const handleAddPost = async () => {
    if (addForm.title === "" || addForm.body === "") {
      toast.error("Formu lütfen doldurun.", {
        closeButton: false,
      });
      return null;
    }
    dispatch(
      createPost({
        title: addForm?.title,
        body: addForm?.body,
        userId: posts?.length + 1,
      })
    )
      .then(() => {
        toast.success("Post başarılı bir şekilde eklendi.", {
          closeButton: false,
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

  const handleDeletePost = async (id) => {
    dispatch(deletePost(id));
  };

  const filterePosts = posts?.filter((post) => {
    return post?.title?.toLocaleLowerCase()?.includes(filter);
  });

  return (
    <div className="postsPage">
      <Search onChangeHandler={onSearchChange} />
      <div className="postsPage__addNew" onClick={() => setIsOpenModal(true)}>
        <span>Yeni Post Ekle</span>
        <IoMdAddCircle />
      </div>
      <div className="postsPage__cards">
        {!postsLoading &&
          posts?.length > 0 &&
          filterePosts.map((item) => <Card key={item?.id} cardItem={item} handleDeletePost={handleDeletePost}/>)}
      </div>
      <CustomModal
        isOpen={isOpenModal}
        setOpen={setIsOpenModal}
        title="Yeni Ekle"
      >
        <div className="postsPage__addForm">
          <div className="form-input">
            <label htmlFor="name">Başlık</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Başlık"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="body">Mesaj</label>
            <textarea
              name="body"
              id="body"
              rows="4"
              placeholder="Mesaj"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <Button onClick={handleAddPost} type="submit">
            Gönder
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Posts;
