import useTweetModal from "@/hooks/useTweetModal";
import Modal from "../Modal";
import { useCallback, useState } from "react";
import Form from "../Form";
import axios from "axios";
import toast from "react-hot-toast";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";

const TweetModal = () => {
    const TweetModal = useTweetModal();
    const [isLoading, setIsLoading] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatatePosts } = usePosts();
    // const {mutate: mutatatePost}= usePost(postId as string)

    const [ body, setBody ] = useState('');
    const [ image, setimage ] = useState('');
  
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const url='/api/posts'

            await axios.post(url, { body,image });

            setBody('');
            setimage('');
            toast.success('Tweet Created')
            // mutatatePosts();
            // mutatatePost();
        } catch(error) {
            toast.error("Something went wrong!")
        } finally {
            setIsLoading(false);
       }
    },[body,image])
    
    const bodycontent = (
        <Form placeholder="What's happening?" h_large={true} />
    )
  return (
      <Modal
          disabled={isLoading}
          isOpen={TweetModal.isOpen}
          title="Tweet"
          actionLabel="Tweet"
          onClose={TweetModal.OnClose}
          onSubmit={onSubmit}
          body={bodycontent}
          Avoidfooter={true}
      />
  )
};

export default TweetModal;
