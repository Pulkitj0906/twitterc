import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useView = ({ postId, userId }: { postId: string, userId?: string }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasViewed = useMemo(() => {
        const list = fetchedPost?.views || [];
        return list.includes(currentUser?.id);
    }, [fetchedPost, currentUser]);

    const toggleView: () => Promise<void> = async () => {
        if (!currentUser) {
            return loginModal.OnOpen();
        }

        try {
            await axios.post('/api/view', { postId });
            mutateFetchedPost();
            mutateFetchedPosts();
        } catch (error) {
            // Handle error
        }
    };

    return {
        hasViewed,
        toggleView,
    };
};

export default useView;
