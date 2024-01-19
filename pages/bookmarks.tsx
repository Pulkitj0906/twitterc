import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import PostFeed from "@/components/posts/PostFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Bookmarks = () => {
  return ( 
    <>
      <Header showBackArrow label="Bookmarks" />
      <PostFeed onlyBookmarked />
    </>
   );
}
 
export default Bookmarks;