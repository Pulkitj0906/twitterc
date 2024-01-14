import useReportModal from "@/hooks/useReportModal";
import Modal from "../Modal";
import PostItem from "../posts/PostItem";
import ReportElement from "../layout/ReportItem";
import { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import toast from "react-hot-toast";

const ReportModal = () => {
    const { data, userId, isOpen, onClose, onOpen } = useReportModal();
    const [ page2, setPage2 ] = useState(false);
    
    const ReportList = {
        'Hate': 'Slurs, Racist or sexist stereotypes, Dehumanization, Incitement of fear or discrimination, Hateful references, Hateful symbols & logos',
        'Abuse & Harassment': 'Insults, Unwanted Sexual Content & Graphic Objectification, Unwanted NSFW & Graphic Content, Violent Event Denial, Targeted Harassment and Inciting Harassment',
        'Violent Speech':'Violent Threats, Wish of Harm, Glorification of Violence, Incitement of Violence, Coded Incitement of Violence',
        'Child Safety':'Child sexual exploitation, grooming, physical child abuse, underage user',
        'Privacy':'Sharing private information, threatening to share/expose private information, sharing non-consensual intimate images, sharing images of me that I don’t want on the platform',
        'Spam':'Financial scams, posting malicious links, misusing hashtags, fake engagement, repetitive replies, Retweets, or Direct Messages',
        'Suicide or self-harm':'Encouraging, promoting, providing instructions or sharing strategies for self-harm.',
        'Sensitive or disturbing media':'Graphic Content, Gratutitous Gore, Adult Nudity & Sexual Behavior, Violent Sexual Conduct, Bestiality & Necrophilia, Media depicting a deceased individual',
        'Deceptive identities':'Impersonation, non-compliant parody/fan accounts',
        'Violent & hateful entities': 'Violent extremism and terrorism, hate groups & networks'
    }
    const initialStates = Object.fromEntries(
        Object.keys(ReportList).map(category => [category, false])
    );
    const [clickedStates, setClickedStates] = useState(initialStates);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (isOpen) {
        // Delay the transition to give time for the modal to open
        setTimeout(() => {
            setWidth(page2 ? 100 : 50);
        }, 100);
        } else {
        setWidth(0);
        }
    }, [isOpen, page2]);
    const bodycontent = (
        <>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
                className={`bg-black h-full rounded-full transition-all ease-in-out duration-1000`}
                style={{ width: `${width}%` }}
            />
            </div>
            <div className="pointer-events-none relative">
                <div className="bg-white/10 z-10 w-full h-full backdrop-blur-[0.55px] absolute"/>
                <div className="grayscale select-none">
                    <PostItem data={data} AvoidDots={true} smallImage={true} />
                </div>
            </div>
            {page2 ?
                <div>
                    <div className="flex flex-row gap-3 m-4 mb-1 flex-wrap">
                    {Object.entries(clickedStates).map(([category, isSelected]) => (
                        isSelected && (
                            <div key={category} className="mb-2 bg-black/70 rounded-full text-white flex justify-center items-center shadow-2xl box-shadow">
                                <p className="m-3 my-1">{category}</p>
                            </div>
                        )
                    ))}
                        <div className="flex justify-center items-center">
                            <RiEdit2Line onClick={()=>setPage2(false)} className='hover:opacity-60 hover:cursor-pointer' />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold">Remarks(if any)</h1>
                    <textarea
                        autoFocus
                        placeholder="Why are u reporting this post?"
                        className="
                        w-full
                        p-4 
                        text-lg 
                        dark:bg-black 
                        rounded-md
                        outline-none
                        dark:text-white
                        focus:border-black
                        focus:border-2
                        transition
                        bg-transparent
                        disabled:bg-neutral-900
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        h-40
                        whitespace-normal
                        mt-3
                        resize-none
                        "
                    />
                </div>
                
                
                : <div className="h-56 overflow-y-scroll scrollbar-thin scrollbar-thumb-black/10 scrollbar-thumb-rounded-3xl scroll-smooth">
                    {Object.entries(ReportList).map(([header, content]) => (
                        <div key={header} className="mt-3">
                            <ReportElement
                                key={header}
                                clicked={clickedStates[header]}
                                onReport={() => handleReport(header)}
                                header={header}
                                content={content}
                            />
                        </div>
                    ))}</div>
            }
        </>
    )
    const handleReport = (category:string) => {
        setClickedStates(prevStates => ({
            ...prevStates,
            [category]: !prevStates[category],
        }));
    };

    const anyClicked = Object.values(clickedStates).some(state => state);

    const onSubmitPage1 = () => {
        setPage2(true)
    }

    const onSubmitPage2 = () => {
        onClose(),
        setClickedStates(initialStates);
        setPage2(false)
        toast.success('Report Submitted!')
    }
    const justOnclose = () => {
        onClose(),
        setClickedStates(initialStates);
        setPage2(false)
    }
    return (
        <>
        <Modal
            title={`Report ${data?.user?.name}'s Post`}
            actionLabel={page2?"Submit":'Next'}
            onClose={justOnclose}
            onSubmit={page2?onSubmitPage2:onSubmitPage1}
            body={bodycontent}
            isOpen={isOpen}
            disabled={!anyClicked && !page2}
                />
        </>
  )
};

export default ReportModal;
