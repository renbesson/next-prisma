import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { SignInButton, SignOutButton, SignUpButton } from "./AuthButtons";
import Link from "next/link";

async function AppBar() {
  const session = await getServerSession(authOptions);

  const SignInMenu = () => (
    <ul className="py-2" aria-labelledby="user-menu-button">
      <li>
        <Link
          href="/updateProfile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Update Profile
        </Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );

  const SignOutMenu = () => (
    <>
      <li>
        <SignUpButton />
      </li>
      <li>
        <SignInButton />
      </li>
    </>
  );

  const MainMenuOption = ({ text, link }: { text: string; link: string }) => (
    <li>
      <Link
        href={link}
        className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:hover:text-secondary"
        aria-current="page"
      >
        {text}
      </Link>
    </li>
  );

  const AvatarMenu = () => (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="images/avatar.png" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {session ? <SignInMenu /> : <SignOutMenu />}
      </ul>
    </div>
  );

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" href={"/"}>
          daisyUI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <AvatarMenu />
      </div>
    </div>
  );
}

export default AppBar as unknown as () => JSX.Element;
