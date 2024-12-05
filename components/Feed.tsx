"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { Input, Button, Typography, Modal, Space, Tag } from "antd";
import TodoCard from "./TodoCard";
import TodoModal from "./Form";
import { Post } from "@/types/types";
import { useSession } from "next-auth/react";

const { Title } = Typography;

interface Props {
  data: Post[];
  handleTagClick: (tagName: string) => void;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
}

const TodoCardList = ({
  data,
  handleTagClick,
  handleEdit,
  handleDelete,
}: Props) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <TodoCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    description: "",
    tag: "",
    imageUrl: "",
    fileUrl: "",
  });
  const [editPost, setEditPost] = useState<Post | null>(null);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");

  const [searchTimeout, setSearchTimeout] = useState<number | NodeJS.Timeout>(0);
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/todo");
    const data = await response.json();
    const userId = session?.user?.id;

    if (userId) {
      const userPosts = data.filter((post) => post.creator?._id === userId);
      setAllPosts(userPosts);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterTodos = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) => regex.test(item.tag) || regex.test(item.description)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterTodos(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterTodos(tagName);
    setSearchedResults(searchResult);
  };

  const toggleModal = async (editPost: Post | null = null) => {
    if (editPost) {
      setEditPost(editPost);
      setType("Edit");

      try {
        const response = await fetch(`/api/todo/${editPost._id}`);
        if (response.ok) {
          const todoData = await response.json();
          setPost(todoData);
        } else {
          console.error("Error fetching todo data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching todo data:", error);
      }
    } else {
      setPost({ description: "", tag: "", imageUrl: "", fileUrl: "" });
      setType("Create");
    }
    setShowModal(!showModal);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    const userId = session?.user?.id;
    try {
      if (!userId) {
        throw new Error("User ID not found");
      }

      let endpoint = "/api/todo/new";
      let method = "POST";

      if (type === "Edit") {
        endpoint = `/api/todo/${editPost?._id}`;
        method = "PATCH";
      }

      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify({
          description: post.description,
          userId,
          tag: post.tag,
          imageUrl: post.imageUrl,
        }),
      });

      if (response.ok) {
        toggleModal();
      }
    } catch (error) {
      console.error(error);
    } finally {
      fetchPosts();
      setIsSubmitting(false);
    }
  };

  const handleEdit = (post: Post) => {
    setEditPost(post);
    setPost(post);
    setType("Edit");
    setShowModal(true);
  };

  const handleDelete = async (post: Post) => {
    try {
      await fetch(`/api/todo/${post._id}`, {
        method: "DELETE",
      });
      // Refresh the todo list after deletion
      fetchPosts();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <section className="feed">
      <Button onClick={() => toggleModal()} type="primary" style={{ backgroundColor: "#ff6600", borderColor: "#ff6600" }}>
        Create To Do
      </Button>
      <Space direction="vertical" className="w-full mt-4">
        <Input.Search
          placeholder="Etiket ya da açıklamaya göre arama yapabilirsiniz."
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          allowClear
          enterButton={
            <Button type="primary" style={{ backgroundColor: "#ff6600", borderColor: "#ff6600" }}>
              Search
            </Button>
          }
          size="large"
        />
      </Space>

      <TodoModal
  show={showModal}
  onClose={() => setShowModal(!showModal)}
  post={post}
  type={type}
  setPost={setPost}
  submitting={submitting}
  handleSubmit={handleSubmit}
/>

      <TodoCardList
        data={searchText ? searchedResults : allPosts}
        handleTagClick={handleTagClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Feed;
