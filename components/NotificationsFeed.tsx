import { BsTwitter } from "react-icons/bs";
import useNotifications from "@/hooks/useNotification";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import Avatar from "./Avatar";
import usePosts from "@/hooks/usePosts";
import PostItem from "./posts/PostItem";
import Loader from "./layout/Loader";

interface Notification {
  id: string;
  senderId: string;
  body: string;
  postId: string;
  // Add other properties as needed
}

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [], error, isLoading, mutate } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  // Ensure userId is defined before using usePosts
  const userId = currentUser?.id;
  const { data: posts = [] } = usePosts(userId);

  if (!userId) {
    // Handle the case where userId is not available
    return <div>Loading...</div>;
  }


  if (isLoading) {
    return (
      <div>
        <Loader/>
      </div>
    );
  }

  if (error) {
    return <div>Error loading notifications</div>;
  }

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 flex justify-center items-center text-center p-6 text-xl">
        <p className="text-sky-500">
        No notifications yet...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Notification) => (
        <div key={notification.id} className="flex flex-row p-6 gap-4 border-b-[1px] dark:border-neutral-800">
          <Avatar userId={notification.senderId} />
          <div className="w-full">
            <p className="dark:text-white">{notification.body}</p>
            <div className="grayscale ">
              {posts.find((post: Record<string, any>) => post.id === notification.postId) && (
                <PostItem
                  smallImage
                  userId={userId}  // Pass userId to PostItem
                  key={notification.id}
                  data={posts.find((post: Record<string, any>) => post.id === notification.postId)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
