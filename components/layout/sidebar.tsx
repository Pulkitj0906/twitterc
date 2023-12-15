import {BsHouseFill, BsBellFill} from "react-icons/bs"
import {FaUser} from "react-icons/fa"
import SidebarLogo from "./SidebarLogo"
import SidebarItem from "./SidebarItem"
import {BiLogOut} from "react-icons/bi"
import SidebarTweetButton from "./SidebarTweetButton"
import useCurrentUser from "@/hooks/useCurrentUser"
import { signOut } from "next-auth/react"
import Avatar from "../Avatar"
import { BsThreeDots } from "react-icons/bs";
import Dropdown from "./dropdown"
import { Switch } from "@headlessui/react"
import DarkModeToggle from 'react-dark-mode-toggle'


interface sidebarProps{
    darkMode?: boolean;
    toggleDarkMode?: () => void;
}

const Sidebar:React.FC<sidebarProps> = ({darkMode,toggleDarkMode}) => {
    const { data: currentUser } = useCurrentUser();
    const items = [
        {
            label: "Home",
            href: '/',
            icon: BsHouseFill
        },
        {
            label: "Notification",
            href: '/notifications',
            icon: BsBellFill,
            auth: true,
            alert: currentUser?.hasNotification,
        },
        {
            label: "Profile",
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth:true
        }
    ]
    return (
            <div className="col-span-1 dark:bg-black h-full pr-4 md:pr-9 ">
                <div className="flex flex-col h-screen items-end justify-between sticky top-0 ">
                    <div className="space-y-2 lg:w=[230px]">
                        <SidebarLogo />
                        {items.map((item)=>(
                            <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                                icon={item.icon}
                                auth={item.auth}
                                alert={item.alert}
                            />
                        ))}
                        {currentUser && (
                        <SidebarItem onClick={()=> signOut()} icon={BiLogOut} label="LogOut" />
                        )}
                        <SidebarTweetButton />
                    </div>
                <div className="">
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
                            items-center" >
                        
                        {currentUser && <Avatar userId={currentUser?.id} />}
                        {currentUser && <div className="flex flex-col">
                            <p className="hidden lg:block text-black dark:text-white font-semibold ">
                                {currentUser?.name}
                            </p>
                            <p className="text-neutral-400 text-sm">@{currentUser?.username}</p>
                                
                        </div>}
                        <Dropdown item1={currentUser ?"My profile": ''} hrefitem1={`/users/${currentUser?.id}`} item2={currentUser?"LogOut":''} darkMode={darkMode} toggleDarkMode={toggleDarkMode} onClickitem2={()=> signOut()} />
                            
                        </div>
                    </div>
                </div>
            
             </div>
    );
}

export default Sidebar;