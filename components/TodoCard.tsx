"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Post } from "@/types/types";

interface Props {
  post: Post;
  handleTagClick: (tagName: string) => void;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
}

const TodoCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: Props) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.description);
    navigator.clipboard.writeText(post.description);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card relative overflow-hidden rounded-lg shadow-lg">

      <div className="relative w-full h-40">
        <Image
          src={post.imageUrl || "/assets/images/placeholder.png"}
          alt="post_image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

 
      <div className="p-4">
        <p className="my-4 font-bold text-base text-gray-800">
          {post.description}
        </p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>

        {/* Action Buttons */}
        <div className="mt-5 flex justify-between items-center gap-4 border-t border-gray-100 pt-3">
          {/* Copy Button at Bottom Left */}
          <div className="flex items-center cursor-pointer" onClick={handleCopy}>
            <Image
              src={
                copied === post.description
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copied === post.description ? "tick_icon" : "copy_icon"}
              width={20}
              height={20}
              className="mr-2"
            />
            {copied === post.description ? (
              <span className="text-sm text-green-500">Copied!</span>
            ) : (
              <span className="text-sm">Copy</span>
            )}
          </div>

          {/* Edit and Delete Buttons */}
          <div className="flex gap-2">
            <button
              className="font-inter text-sm rounded-md py-2 px-4 bg-green-500 text-white hover:bg-green-600 transition-all duration-200"
              onClick={() => handleEdit && handleEdit(post)}
            >
              Edit
            </button>
            <button
              className="font-inter text-sm rounded-md py-2 px-4 bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
              onClick={() => handleDelete(post)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
