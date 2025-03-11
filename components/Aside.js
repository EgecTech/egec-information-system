import Link from "next/link";
import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { TiContacts } from "react-icons/ti";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import LoginLayout from "./LoginLayout";
import { signOut, useSession } from "next-auth/react";

export default function Aside({ asideOpen }) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("/");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const handleLinkClick = useCallback(
    async (link) => {
      if (router.pathname === link) {
        return;
      }
      setLoading(true);
      await router.push(link);
      setLoading(false);
    },
    [router]
  );

  const { data: session } = useSession();

  if (session) {
    return (
      <LoginLayout>
        <aside className={asideOpen ? "asideleft active" : "asideleft"}>
          {loading && <div className="loading-spinner">Loading...</div>}

          <ul>
            {/* Dashboard */}
            <li
              className={activeLink === "/" ? "navactive" : ""}
              onClick={() => handleLinkClick("/")}
              onMouseEnter={() => router.prefetch("/")}
            >
              <IoHome />
              <span>Dashboard</span>
            </li>

            {/* Blogs */}
            <li
              className={
                activeLink.includes("/blogs")
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
            >
              <div
                className="flex gap-1"
                onClick={() => handleLinkClick("/blogs")}
                onMouseEnter={() => router.prefetch("/blogs")}
              >
                <MdWorkOutline />
                <span>Blogs</span>
              </div>
              {activeLink.includes("/blogs") && (
                <ul>
                  <Link href="/blogs" prefetch>
                    <li>All Blogs</li>
                  </Link>
                  <Link href="/blogs/draft" prefetch>
                    <li>Draft Blogs</li>
                  </Link>
                  <Link href="/blogs/addblog" prefetch>
                    <li>Add Blogs</li>
                  </Link>
                </ul>
              )}
            </li>

            {/* Projects */}
            <li
              className={
                activeLink.includes("/projects")
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
            >
              <div
                className="flex gap-1"
                onClick={() => handleLinkClick("/projects")}
                onMouseEnter={() => router.prefetch("/projects")}
              >
                <BsPostcard />
                <span>Projects</span>
              </div>
              {activeLink.includes("/projects") && (
                <ul>
                  <Link href="/projects" prefetch>
                    <li>All Projects</li>
                  </Link>
                  <Link href="/projects/draftprojects" prefetch>
                    <li>Draft Projects</li>
                  </Link>
                  <Link href="/projects/addproject" prefetch>
                    <li>Add Projects</li>
                  </Link>
                </ul>
              )}
            </li>

            {/* Shops */}
            <li
              className={
                activeLink.includes("/shops")
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
            >
              <div
                className="flex gap-1"
                onClick={() => handleLinkClick("/shops")}
                onMouseEnter={() => router.prefetch("/shops")}
              >
                <RiShoppingCartLine />
                <span>Shops</span>
              </div>
              {activeLink.includes("/shops") && (
                <ul>
                  <Link href="/shops" prefetch>
                    <li>All Shops</li>
                  </Link>
                  <Link href="/shops/draftshop" prefetch>
                    <li>Draft Shops</li>
                  </Link>
                  <Link href="/shops/addproduct" prefetch>
                    <li>Add Shops</li>
                  </Link>
                </ul>
              )}
            </li>

            {/* Gallery */}
            <li
              className={
                activeLink.includes("/gallery")
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
            >
              <div
                className="flex gap-1"
                onClick={() => handleLinkClick("/gallery")}
                onMouseEnter={() => router.prefetch("/gallery")}
              >
                <GrGallery />
                <span>Gallery</span>
              </div>
              {activeLink.includes("/gallery") && (
                <ul>
                  <Link href="/gallery" prefetch>
                    <li>All Gallery</li>
                  </Link>
                  <Link href="/gallery/addphoto" prefetch>
                    <li>Add Gallery</li>
                  </Link>
                </ul>
              )}
            </li>

            {/* Contacts */}
            <li
              className={activeLink === "/contacts" ? "navactive" : ""}
              onClick={() => handleLinkClick("/contacts")}
              onMouseEnter={() => router.prefetch("/contacts")}
            >
              <TiContacts />
              <span>Contacts</span>
            </li>

            {/* Settings */}
            <li
              className={activeLink === "/setting" ? "navactive" : ""}
              onClick={() => handleLinkClick("/setting")}
              onMouseEnter={() => router.prefetch("/setting")}
            >
              <IoSettingsOutline />
              <span>Setting</span>
            </li>
          </ul>

          <button onClick={() => signOut()} className="logoutbtn">
            Logout
          </button>
        </aside>
      </LoginLayout>
    );
  }
}
