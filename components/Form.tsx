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
import { MdEmojiEmotions } from "react-icons/md";
import { BiPoll } from "react-icons/bi";
import EmojiDisplay from "./layout/emojiPicker";
import { emojis } from "./layout/emojis";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from "react-hook-form";

interface FormProps{
    placeholder: string;
    isComment?: boolean;
    postId?: string;
    h_large?: boolean;
}


const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId,
    h_large,
}) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatatePosts } = usePosts();
    const {mutate: mutatatePost}= usePost(postId as string)

    const [ body, setBody ] = useState('');
    const [ image, setimage ] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
  
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const url=isComment?`/api/comments?postId=${postId}`:'/api/posts'

            await axios.post(url, { body,image });
            setShowEmoji(false)
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
    }, [body, mutatatePosts, isComment, postId, mutatatePost, image])
  const [printedGroups, setPrintedGroups] = useState<string[]>([]);
  useEffect(() => {
    const uniqueGroups = emojis.reduce<string[]>((acc, curr) => {
      if (!acc.includes(curr.group)) {
        return [...acc, curr.group];
      }
      return acc;
    }, []);
    setPrintedGroups(uniqueGroups);
  }, []);
  const handleEmojiClick = (emoji: string) => {  
    const input = document.getElementById('message') as HTMLTextAreaElement;  
    if (input) {
      const cursorPosition = input.selectionStart || 0;  
      const messageValue = input.value;
  
      if (typeof cursorPosition === 'number') {
        const newValue =
          messageValue?.substring(0, cursorPosition) +
          emoji +
          messageValue.substring(cursorPosition);
        
        console.log('New value:', newValue);
  
        setBody(newValue);
        input.focus();
        input.setSelectionRange(cursorPosition + emoji.length, cursorPosition + emoji.length);
      }
    }
  };
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  return (
    <div className="border-b-[1px] dark:border-neutral-800 px-5 py-2">
          {currentUser ? (
              <div className="flex flex-row gap-4">
                  <div>
                      <Avatar userId={currentUser?.id} />
                </div>
                  <div className="w-full">
                      <textarea
                          id="message"
                          disabled={isLoading}
                          onChange={(e)=>setBody(e.target.value)}
                          value={body}
                          className={`
                          disabled:opacity-80
                          peer
                          resize-none
                          mt-3
                          w-full
                          dark:bg-black
                          ring-0
                          bg-transparent
                          outline-none
                          text-[20px]
                          placeholder-neutral-500
                          dark:text-white
                          ${h_large ?'h-40':''}
                          `}
                          placeholder={placeholder}
                      >
                          
                    </textarea>
                      <hr className="
                      opacity-0
                      peer-focus:opacity-100
                      h-[1px]
                      w-full
                      dark:border-neutral-800
                      transition
                      "
                      />
                      {/* my attempt */}
                      <div  className='flex flex-row items-center justify-between gap-2 mt-2'>
                          <div className="text-neutral-500 cursor-pointer transition flex flex-row gap-3 items-end">
                            <div className="">
                              <ImageUploadForPost
                                disabled={isLoading}
                                value={image}
                                onChange={(image)=> setimage(image)}
                                label=''
                              />
                            </div>
                            <div className="">
                              <MdEmojiEmotions onClick={()=>setShowEmoji(!showEmoji)} className={`hover:text-sky-500 ${showEmoji && 'text-sky-500'} `} size={20} />
                              {showEmoji && <div className="absolute">
                                <EmojiDisplay emojis={emojis} handleEmojiClick={handleEmojiClick} printedGroups={printedGroups} />
                              </div>}
                            </div>
                            <BiPoll className='hover:text-sky-500' size={22} />
                          </div>
                          <div className="self-end">           
                                  <Button 
                                      disabled={isLoading || (!body && !image) }
                                      onClick={onSubmit}
                                      label="Tweet" />
                          </div>   
                      </div>
                  </div>
              </div>
        ):(
          <div className="py=8 ">
            <h1 className="dark:text-white text-2xl text-center mb-4 font-bold">Welcome to Slater!</h1>
              <div className="flex flex-row items-center justify-center gap-4">
                  <Button label="Login" onClick={loginModal.OnOpen}/>
                  <Button label="Register" onClick={registerModal.OnOpen} secondary/>
              </div>
      </div>)}
    </div>
  )
};

export default Form;
