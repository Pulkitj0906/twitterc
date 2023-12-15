 
import FollowBar from "./layout/FollowBar";
import Sidebar from "./layout/sidebar";
import { useState } from "react";

interface LayoutProps{
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

  const toggleDarkmode = () => {
    setDarkMode((prevdarkMode) => !prevdarkMode);
  };
    return (
        <div className={`${darkMode && "dark"}`}>
        <div className="h-full text-black dark:bg-black dark:text-white">
            <div className="container h-full mx-auto xl:px-30 max-w-7xl">
                <div className="grid grid-cols-4 h-full">
                        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkmode}/>
                    <div className="
                    col-span-3
                    lg:col-span-2
                    border-x-[1px]
                    dark:border-neutral-800
                    ">
                        {children}
                    </div>
                    <FollowBar/>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Layout;