"use client";
import React, { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import { IPrompt } from "@customTypes/prompt";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [postList, setPostList] = useState<IPrompt[]>([]);
  const [searchedPosts, setSearchedPosts] = useState<IPrompt[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = (await response.json()) as IPrompt[];
      setPostList(data);
    };
    fetchPosts();
  }, []);
  function handleSearchChange(text: string) {
    clearTimeout(searchTimeout);
    setSearchText(text);
    setSearchTimeout(
      setTimeout(() => {
        const result = filterPosts(text);
        setSearchedPosts(result);
      }, 500)
    );
  }
  function filterPosts(target: string): IPrompt[] {
    const regex = new RegExp(target, "i");
    return postList.filter(
      (item) =>
        regex.test(item.creator.userName) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }
  function handleTagClick(tag: string) {
    handleSearchChange(tag);
  }
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          required
          className='search_input peer'
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchedPosts} handleTagClick={() => {}} />
      ) : (
        <PromptCardList data={postList} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
