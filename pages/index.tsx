import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import useSwitchFollowingIds from "@/hooks/useSwitchFollowingIds";

export default function Home() {
  const switchFollowingtab = useSwitchFollowingIds()
  return (
    <>
      <Header double label="Home" />
      <Form placeholder="What's happening?" h_large={false} />
      {switchFollowingtab.isOpen ?
        <PostFeed onlyFollowingIds /> : <PostFeed />}
    </>
  )
}
