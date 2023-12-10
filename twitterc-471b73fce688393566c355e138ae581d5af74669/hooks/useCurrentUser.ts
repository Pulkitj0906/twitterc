import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
    const { data, error, isLoading,image, mutate } = useSWR('/api/current', fetcher)

    return {
        data,
        image,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;