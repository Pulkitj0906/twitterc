import useSwitchFollowingIds from "@/hooks/useSwitchFollowingIds";
import { useRouter } from "next/router";
import { useCallback, useState } from "react"
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
    label: string;
    showBackArrow?: boolean;
    double?: boolean;
}


const Header: React.FC<HeaderProps> = ({ label, showBackArrow, double }) => {
    const router = useRouter();
    const switchFollowingtab = useSwitchFollowingIds();

    const handleBack = useCallback(() => {
        router.back();
    }, [router])

    return (
        <>
            {!double ? <div className="border-b-[1px] sticky top-0 backdrop-blur-sm z-10 dark:bg-black/30  dark:border-neutral-800 p-5">
                <div className="flex flex-row items-center gap-2">
                    {
                        showBackArrow && (
                            <BiArrowBack
                                onClick={handleBack}

                                size={20}
                                className="
                      cursor-pointer
                      hover:opacity-70
                      text-black
                      dark:text-white
                      "
                            />
                        )
                    }
                    <h1 className=" text-xl font-semibold">{label}</h1>
                </div>

            </div> :
                <div className="border-b-[0.000025px] sticky top-0 bg-transparent backdrop-blur-sm z-10 dark:bg-black/20  dark:border-neutral-800 flex flex-row">
                
                    <div onClick={switchFollowingtab.OnClose} className="w-1/2 flex items-center justify-center p-4 dark:hover:bg-neutral-800/50 hover:bg-neutral-200/50 cursor-pointer">
                            <h1 className=" text-xl font-semibold">For you</h1>
                        {!switchFollowingtab.isOpen && <div className="bg-black dark:bg-white h-1 w-16 rounded-lg absolute bottom-0"></div>}
                    </div>
                    <div onClick={switchFollowingtab.OnOpen} className="w-1/2 flex items-center justify-center hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 cursor-pointer">
                            <h1 className=" text-xl font-semibold">Following</h1>
                        {switchFollowingtab.isOpen && <div className="bg-black dark:bg-white h-1 w-20 rounded-lg absolute bottom-0"></div>}
                    </div>
            </div> }
        </>
    )
};

export default Header;
