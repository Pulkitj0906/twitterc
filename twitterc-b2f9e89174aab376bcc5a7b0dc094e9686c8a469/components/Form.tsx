import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { set } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import { FaRegImages } from "react-icons/fa";
import ImageUploadForPost from "./ImageUploadForPost";

interface FormProps{
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}


const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
}) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatatePosts } = usePosts();
    const {mutate: mutatatePost}= usePost(postId as string)

    const [ body, setBody ] = useState('');
    const [ image, setimage ] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const url=isComment?`/api/comments?postId=${postId}`:'/api/posts'

            await axios.post(url, { body,image });

            setBody('');
            setimage('');
            toast.success('Tweet Created')
            mutatatePosts();
            mutatatePost();
        } catch(error) {
            toast.error("Something went wrong!")
        } finally {
            setIsLoading(false);
       }
    },[body,mutatatePosts,isComment,postId,mutatatePost,image])

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
          {currentUser ? (
              <div className="flex flex-row gap-4">
                  <div>
                      <Avatar userId={currentUser?.id} />
                </div>
                  <div className="w-full">
                      <textarea
                          disabled={isLoading}
                          onChange={(e)=>setBody(e.target.value)}
                          value={body}
                          className="
                          disabled:opacity-80
                          peer
                          resize-none
                          mt-3
                          w-full
                          bg-black
                          ring-0
                          outline-none
                          text-[20px]
                          placeholder-neutral-500
                          text-white
                          
                          "
                          placeholder={placeholder}
                      >
                          
                    </textarea>
                      <hr className="
                      opacity-0
                      peer-focus:opacity-100
                      h-[1px]
                      w-full
                      border-neutral-800
                      transition
                      "
                      />
                      {/* my attempt */}
                      <div  className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
                          <ImageUploadForPost
                            disabled={isLoading}
                            value={image}
                            onChange={(image)=> setimage(image)}
                            label=''
            />               
                      </div>

                      {/* my attempt */}
                      <div className="
                      mt-4
                      flex
                      flex-row
                      justify-end
                      ">
                          <Button 
                              disabled={isLoading || !body }
                              onClick={onSubmit}
                              label="Tweet" />
                      </div>
                  </div>
              </div>
        ):(
          <div className="py=8 ">
            <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Twitter!</h1>
              <div className="flex flex-row items-center justify-center gap-4">
                  <Button label="Login" onClick={loginModal.OnOpen}/>
                  <Button label="Register" onClick={registerModal.OnOpen} secondary/>
              </div>
      </div>)}
    </div>
  )
};

export default Form;
