import { IPost } from "@app/create-prompt/page";
import Link from "next/link";
import React from "react";
export interface IFormProps {
  type: string;
  post: IPost;
  setPost: React.Dispatch<React.SetStateAction<IPost>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Form = ({
  handleSubmit,
  post,
  setPost,
  submitting,
  type,
}: IFormProps) => {
  return (
    <section className='flex flex-col w-full max-w-full'>
      <h1 className='text-left head_text'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='max-w-md text-left desc'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        className='flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism'
        onSubmit={handleSubmit}
      >
        <label htmlFor='promtData'>
          <span className='text-base font-semibold text-gray-700 font-satoshi'>
            Prompt
          </span>
        </label>
        <textarea
          name='promtData'
          id='promtData'
          value={post.prompt}
          onChange={(e) => {
            setPost({ ...post, prompt: e.target.value });
          }}
          placeholder='Write your prompt here...'
          required
          className='form_textarea'
        ></textarea>
        <label htmlFor='tag'>
          <span className='text-base font-semibold text-gray-700 font-satoshi'>
            Tags{" "}
            <span className='font-normal'>(#product, #development, #idea)</span>
          </span>
        </label>
        <input
          name='tag'
          id='tag'
          value={post.tag}
          onChange={(e) => {
            setPost({ ...post, tag: e.target.value });
          }}
          placeholder='enter the tag'
          required
          className='form_input'
        ></input>
        <div className='gap-4 mx-3 mb-5 flex-end'>
          <Link href={"/"} className='text-sm text-gray-500'>
            Cancel
          </Link>
          <button
            className='px-5 py-1.5 disabled:opacity-50 text-sm bg-primary-orange text-white rounded-full hover:shadow-md'
            type='submit'
            disabled={submitting}
          >
            {submitting ? `${type} ...` : type}{" "}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
