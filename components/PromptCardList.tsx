import React from "react";
import PromptCard from "./PromptCard";
import { IPrompt } from "@customTypes/prompt";
interface IPromptListProps {
  data: IPrompt[];
  handleTagClick: (tag: string) => void;
}
const PromptCardList = ({ data, handleTagClick }: IPromptListProps) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((x) => (
        <PromptCard item={x} key={`${x._id}`} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

export default PromptCardList;
