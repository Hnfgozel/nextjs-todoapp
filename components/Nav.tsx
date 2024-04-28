"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            <span>{session.user.name}</span>
          </div>
        ) : null}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <div className="dropdown">
              <button
                type="button"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className="mt-5 w-full black_btn"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;
