import React from "react";
import { Button, Input, Typography, Modal } from "antd";
import { Post } from "@/types/types";
import { ChangeEvent } from "react";

const { Title, Text } = Typography;

interface FormProps {
  type: string;
  post: { description: string; tag: string; imageUrl: string; fileUrl: string };
  setPost: (post: {
    description: string;
    tag: string;
    imageUrl: string;
    fileUrl: string;
  }) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = event.target?.result;
        setPost({ ...post, imageUrl: image as string });
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 overflow-y-auto glassmorphism"
    >
      <Input.TextArea
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
        placeholder="Write your post here"
        required
        rows={4}
      />

      <Input
        value={post.tag}
        onChange={(e) => setPost({ ...post, tag: e.target.value })}
        type="text"
        placeholder="#Tag area (product, webdevelopment, idea, etc.) "
        required
      />
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
       {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Selected Image"
          className="preview-image"
          style={{ maxWidth: "100%", height: "300px", objectFit: "contain", marginTop: "10px" }}
        />
      )}

      <div className="flex-end mx-3 mb-5 gap-4">
        <Button
          htmlType="submit"
          type="primary"
          loading={submitting}
          style={{ backgroundColor: "#ff6600", borderColor: "#ff6600" }}
        >
          {submitting ? `${type}ing...` : type}
        </Button>
      </div>
    </form>
  );
};

interface ModalProps {
  show: boolean;
  onClose: () => void;
  post: Post;
  type: string;
  setPost: (post: Post) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TodoModal = ({
  show,
  onClose,
  post,
  type,
  setPost,
  submitting,
  handleSubmit,
}: ModalProps) => {
  return (
    <Modal
      open={show}
      onCancel={onClose}
      footer={null}
      title={type === "Edit" ? "Edit Todo" : "Create Todo"}
      width={800}
      styles ={{ padding: "24px 40px", maxHeight: "80vh", overflowY: "auto" }}
    >
      <Form
        type={type}
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default TodoModal;
