import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import PostFeed from "@/components/posts/PostFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  try {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      };
    }

    return {
      props: {
        session
      }
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    throw error;
  }
}

const Bookmarks = () => {
  return ( 
    <>
      <Header showBackArrow label="Bookmarks" />
      <PostFeed onlyFollowingIds />
    </>
   );
}
 
export default Bookmarks;