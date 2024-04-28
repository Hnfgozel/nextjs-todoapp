import React from "react";
import Form from "./Form";
import { Post } from "@/types/types";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  post: Post;
  type: string; // Add type prop to differentiate between Create and Edit
  setPost: (post: Post) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Pass handleSubmit function
}
const Modal = ({
  show,
  onClose,
  post,
  type,
  setPost,
  submitting,
  handleSubmit,
}: ModalProps) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Background overlay */}
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>

      {/* Modal content */}
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 max-w-3/4  overflow-y-auto" style={{maxHeight: "650px"}}>
        <div className="relative p-5 bg-white border rounded-lg shadow-lg h-full overflow-y-auto">
          {/* Close button */}
          <button
            className="absolute top-0 right-0 p-2"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <Form
            type={type} // Pass type prop to Form
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleSubmit} // Pass handleSubmit function
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
