import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import useBookmarkedPosts from "@/hooks/useBookmarkPost";

interface PostFeedProps {
  userId?: string;
  onlyFollowingIds?: boolean;
  onlyBookmarked?: boolean;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId, onlyFollowingIds, onlyBookmarked }) => {
  const { data: posts = [] } = usePosts(userId);
  const { data: currentUser } = useCurrentUser();
  const bookmarkedpost=useBookmarkedPosts()

  let filteredPosts = posts;

  if (onlyFollowingIds) {
    filteredPosts = posts.filter((post: Record<string, any>) =>
      currentUser?.followingIds.includes(post.user.id)
    );
  }

  if (onlyBookmarked && currentUser?.id) {
    filteredPosts = bookmarkedpost
  }

  return (
    <>
      {filteredPosts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
