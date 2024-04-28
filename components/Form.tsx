import { ChangeEvent } from "react";

interface Props {
  type: string;
  post: { description: string; tag: string; imageUrl: string; fileUrl: string };
  setPost: (post: {
    description: string;
    tag: string;
    imageUrl: string;
    fileUrl: string;
  }) => void;
  submitting: boolean;
  handleSubmit: () => void;
}
const Form = ({ type, post, setPost, submitting, handleSubmit }: Props) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = event.target.result;
        setPost({ ...post, imageUrl: image as string });
      };

      reader.readAsDataURL(selectedImage);
    }
  };
  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const selectedFile = e.target.files[0];
  //     const reader = new FileReader();

  //     reader.onload = (event) => {
  //       const fileData = event.target.result as string; // Convert to string
  //       const fileUrl = URL.createObjectURL(selectedFile);
  //       setPost({ ...post, fileUrl });
  //     };

  //     reader.readAsDataURL(selectedFile); // Read file as data URL
  //   }
  // };

  return (
    <section className="w-50 max-w-75 flex-start flex-col max-h-3/4 overflow-y-auto">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">{type} your Todos.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 overflow-y-auto glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your To Do
          </span>

          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Todo{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Selected Image"
              className="preview-image "
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </label>

        {/* <label>
          File:
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
          />
          {post.fileUrl && <span className="file-preview">{post.fileUrl}</span>}
        </label> */}

        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
