import React, { useEffect, useRef } from 'react';

type Emoji = {
    char: string;
    name: string;
    group: string;
};

type Props = {
    emojis: Emoji[];
    handleEmojiClick: (emoji: string) => void;
    printedGroups: string[];
};

const EmojiDisplay: React.FC<Props> = ({ emojis, handleEmojiClick, printedGroups }) => {
    const groupRefs: Record<string, React.RefObject<HTMLDivElement>> = {};

    // Create refs for each group section
    printedGroups.forEach((group) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        groupRefs[group] = useRef<HTMLDivElement>(null);
    });

     // Ensure to adjust the dependencies based on your actual use case

    // Function to scroll to the corresponding group section
    const scrollToGroup = (group: string) => {
        const ref = groupRefs[group]?.current;
        if (ref && 'offsetTop' in ref) {
            const container = ref.closest(".overflow-y-scroll"); // Find the closest scroll container
            if (container) {
                container.scrollTop = (ref as HTMLElement).offsetTop - container.scrollLeft;
            }
        }
    };
    return (
        <>
            <div className="bg-slate-100 dark:bg-neutral-900 shadow-2xl w-56 rounded-tr-xl rounded-tl-xl h-52 pt-2 pl-1 overflow-y-scroll flex flex-col relative scrollbar-thin scroll-smooth scrollbar-thumb-rounded-lg scrollbar-thumb-slate-500">
                {printedGroups.map((group, groupIndex) => (
                    <div key={groupIndex} ref={groupRefs[group]} className="group-container rounded-2xl">
                        <div className="w-full text-center mb-2 font-bold">{group}</div>
                        <div className="flex flex-wrap">
                            {emojis
                                .filter((emoji) => emoji.group === group)
                                .map((filteredEmoji, emojiIndex) => (
                                    <span
                                        key={emojiIndex}
                                        className="text-lg rounded-full hover:cursor-pointer hover:bg-slate-300"
                                        role="img"
                                        aria-label={filteredEmoji.name}
                                        onClick={() => handleEmojiClick(filteredEmoji.char)}
                                    >
                                        {filteredEmoji.char}
                                    </span>
                                ))}{emojis[4].char}
                        </div>
                    </div>
                ))}
            </div>
            <div className='sticky flex justify-between rounded-br-xl rounded-bl-xl bottom-0 h-6 w-full bg-slate-300 dark:bg-neutral-800'>
                <span className='hover:cursor-pointer ' onClick={() => scrollToGroup(printedGroups[0])}>😀</span>
                <span className='hover:cursor-pointer ' onClick={() => scrollToGroup(printedGroups[1])}>👦🏻</span>
                <span className='hover:cursor-pointer ' onClick={() => scrollToGroup(printedGroups[2])}>🐺</span>
                <span className='hover:cursor-pointer ' onClick={() => scrollToGroup(printedGroups[3])}>🍇</span>
                <span className='hover:cursor-pointer ' onClick={() => scrollToGroup(printedGroups[4])}>🌍</span>
                <span className='hover:cursor-pointer ' onClick={() => scrollToGroup(printedGroups[5])}>🎉</span>
                <span className='hover:cursor-pointer ' onClick={() => scrollToGroup(printedGroups[6])}>🕶️</span>
                <span className='hover:cursor-pointer ' onClick={() => scrollToGroup(printedGroups[7])}>🚫</span>
            </div>
        </>
    );
};

export default EmojiDisplay;
