// useNotifications.ts
import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useNotifications = (userId?: string, senderId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;

  // Define the type for senderId in the where clause
  const senderIdFilter = senderId ? { senderId } : undefined;

  const { data, error, isLoading, mutate } = useSWR(
    url,
    (url) => fetcher(url),
    { revalidateOnFocus: false }// Pass options object within the fetcher function
  );

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useNotifications;
