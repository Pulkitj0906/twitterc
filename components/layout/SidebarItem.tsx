import { IconType } from "react-icons";
import { useCallback } from "react";
import { userAgent } from "next/server";
import { useRouter } from "next/router";
import { on } from "stream";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { BsDot } from "react-icons/bs";

interface SiderbarItemProps{
  label: string;
  href?: string;
  icon: IconType
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}





const SidebarItem: React.FC<SiderbarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert
}) => {
  const loginModal=useLoginModal()
  const{data: currentUser}=useCurrentUser()
  const router= useRouter()
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick()
    }
    if (auth && !currentUser) {
      loginModal.OnOpen()
    }
    else if (href) {
      router.push(href)
    }
  },[router,onClick,href,currentUser,auth,loginModal])
  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="
      relative
      rounded-full
      h-14
      w-14
      flex
      items-center
      justify-center
      p-4
      dark:hover:bg-black
      hover: bg-slate-300
      hover: bg-opacity-0
      cursor-pointer
      lg:hidden
      ">
        <Icon size={28} className="text-black dark:text-white"/>
        {alert? <BsDot className='text-sky-500 absolute -top-4 left-0' size={70} /> :null}
      </div>
      <div className="
      relative
      hidden 
      lg:flex 
      items-row 
      gap-4 
      p-4 
      rounded-full 
      dark:hover:bg-opacity-20
      hover:bg-slate-500
      hover:bg-opacity-10 
      cursor-pointer
      items-center  
      ">
        <Icon size={32} className="text-black dark:text-white" />
        <p className="hidden lg:block text-black dark:text-white text-xl">
          {label}
        </p>
        {alert? <BsDot className='text-sky-500 absolute -top-4 left-0' size={60} /> :null}

      </div>
    </div>
  )
};

export default SidebarItem;
