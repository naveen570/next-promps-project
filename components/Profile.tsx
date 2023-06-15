import React from "react";
import PromptCard from "./PromptCard";
import { IPrompt } from "@customTypes/prompt";

interface IProfileProps {
  name: string;
  desc: string;
  handleEdit: (post: IPrompt) => void;
  handleDelete: (promptId: string) => void;
  posts: IPrompt[];
}
const Profile = ({
  name,
  desc,
  handleDelete,
  handleEdit,
  posts,
}: IProfileProps) => {
  return (
    <section className='w-full'>
      <h1 className='text-left head_text'>
        <span className='blue_gradient'>{name}</span> Profile
      </h1>
      <p className='text-left desc'>{desc}</p>
      <div className='mt-16 prompt_layout'>
        {posts.map((x) => (
          <PromptCard
            item={x}
            key={`${x._id}`}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
