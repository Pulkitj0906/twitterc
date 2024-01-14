// useBookmarkedPosts.ts
import usePosts from "@/hooks/usePosts";
import useCurrentUser from "@/hooks/useCurrentUser";

const useBookmarkedPosts = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: allPosts = [] } = usePosts();

  if (!currentUser?.id) {
    return [];
  }

  const bookmarkedPosts = allPosts.filter((post:Record<string,any>) =>
    post.bookmarkIds.includes(currentUser.id)
  );

  return bookmarkedPosts;
};

export default useBookmarkedPosts;
