"use client";
import React, { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import { IPrompt } from "@customTypes/prompt";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [postList, setPostList] = useState<IPrompt[]>([]);
  async function handleSearchChange(
    element: React.ChangeEvent<HTMLInputElement>
  ) {
    setSearchText(element.target.value);
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = (await response.json()) as IPrompt[];
      setPostList(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={postList} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
