import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import useCurrentUser from "@/hooks/useCurrentUser";

interface PostFeedProps{
    userId?: string;
    onlyFollowingIds?: boolean;
}


const PostFeed: React.FC<PostFeedProps> = ({ userId,onlyFollowingIds }) => {
    const{ data: posts=[]}=usePosts(userId)
    const { data: currentUser } = useCurrentUser()
  
  const filteredPosts = posts.filter((post:Record<string, any>) =>
  currentUser?.followingIds.includes(post.user.id)
);
  return (
    <>
      {!onlyFollowingIds
        ? posts.map((post: Record<string, any>) => (
            <PostItem userId={userId} key={post.id} data={post} />
          ))
        : filteredPosts.map((post: Record<string, any>) => (
            <PostItem key={post.id} data={post} userId={currentUser?.id} />
          ))}
    </>
  )
};

export default PostFeed;
