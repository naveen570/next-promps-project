"use client";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setProvider = async () => {
      const result = await getProviders();
      setProviders(result);
    };
    setProvider();
  }, []);
  const userImage = session?.user?.image;
  return (
    <nav className='w-full pt-3 mb-16 flex-between'>
      <Link href={"/"} className='flex gap-2 flex-center'>
        <Image
          src={"/assets/images/logo.svg"}
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Prompts</p>
      </Link>
      {/* Desktop nav */}
      <div className='hidden sm:flex'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href={"/create-post"} className='black_btn'>
              Create Post
            </Link>
            <button className='outline_btn' onClick={() => signOut()}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={userImage ?? "/assets/images/logo.svg"}
                alt='profile'
                width={37}
                height={37}
                className='object-contain rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type='button'
                  className='black_btn'
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile nav */}
      <div className='relative flex sm:hidden'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={userImage ?? "/assets/images/logo.svg"}
              alt='logo'
              width={30}
              height={30}
              className='object-contain rounded-full'
              onClick={() => setToggleDropDown((x) => !x)}
            />
            {toggleDropDown && (
              <div className='dropdown'>
                <Link
                  href={"/profile"}
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className='w-full mt-5 black_btn'
                  type='button'
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type='button'
                  className='black_btn'
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
