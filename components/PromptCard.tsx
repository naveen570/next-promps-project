import { IPost } from "@app/create-prompt/page";
import { IPrompt } from "@customTypes/prompt";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const PromptCard = ({
  item,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  item: IPrompt;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: IPrompt) => void;
  handleDelete?: (promptId: string) => void;
}) => {
  const [copied, setCopied] = useState("");
  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  function handleCopy() {
    setCopied(item.prompt);
    navigator.clipboard.writeText(item.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  }
  return (
    <div className='prompt_card'>
      <div className='flex items-start justify-between gap-5'>
        <div
          className='flex items-center justify-start flex-1 gap-3 cursor-pointer'
          onClick={() => {
            if (session?.user.id === item.creator._id) {
              router.push("/profile");
            } else {
              router.push(
                `/profile/${item.creator._id}?name=${item.creator.userName}`
              );
            }
          }}
        >
          <Image
            src={item.creator.image as string}
            alt='user_image'
            height={40}
            width={40}
            className='object-contain rounded-full'
          />
          <div className='flex flex-col '>
            <h3 className='font-semibold text-gray-900 font-satoshi'>
              {item.creator.userName}
            </h3>
            <p className='text-sm text-gray-500 font-inter'>
              {item.creator.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            width={12}
            height={12}
            alt='copy'
            src={
              copied === item.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
      <p className='my-4 text-sm text-gray-700 font-satoshi'>{item.prompt}</p>
      <p
        className='text-sm cursor-pointer font-inter blue_gradient'
        onClick={() => {
          handleTagClick && handleTagClick(item.tag);
        }}
      >
        {item.tag}
      </p>
      {session?.user.id === item.creator._id && pathName === "/profile" && (
        <div className='w-full gap-3 pt-3 mt-5 border-t border-gray-100 flex-center'>
          <p
            className='text-sm font-semibold cursor-pointer font-inter green_gradient'
            onClick={() => handleEdit && handleEdit(item)}
          >
            Edit
          </p>
          <p
            className='text-sm font-semibold cursor-pointer font-inter orange_gradient'
            onClick={() => {
              handleDelete && handleDelete(item._id);
            }}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
