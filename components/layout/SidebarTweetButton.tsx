import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import RegisterModal from "../modals/RegisterModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useTweetModal from "@/hooks/useTweetModal";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const tweetModal=useTweetModal()
  const{data: currentUser}=useCurrentUser()
  
  const onClick = useCallback(() => {
    currentUser? console.log('yes'):console.log('no')
    currentUser ? tweetModal.OnOpen() : loginModal.OnOpen() 
  },[loginModal,currentUser,tweetModal])

  return (
    <div onClick={onClick}>
          <div className="
          mt-6
          lg:hidden
          rounded-full
          h-14
          w-14
          p-4
          flex
          items-center
          justify-center
          bg-sky-500
          hover:bg-opacity-80
          transition
          cursor-pointer
          ">
              
      <FaFeather size={24} color="white"/>
          </div>
          <div className="
          mt-6
          hidden
          lg:block
          px-4
          py-2
          rounded-full
          bg-sky-500
          hover:bg-opacity-90
          cursor-pointer
          transition
          ">
              <p className="
              hidden
              lg:block
              text-center
              font-semibold
              text-white
              text-[20px]
              ">
                  Tweet
              </p>
          </div>
    </div>
  )
};

export default SidebarTweetButton;
