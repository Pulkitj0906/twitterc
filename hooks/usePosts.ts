import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const addViewToPost = async (postId: string) => {
    try {
      await fetcher(`/api/posts/${postId}/add-view`);
      mutate();
    } catch (error) {
      console.error('Error adding view to post:', error);
    }
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    addViewToPost,
  };
};

export default usePosts;
