import { create } from "zustand";

interface TweetModalProps{
    isOpen: boolean,
    OnOpen: () => void,
    OnClose: ()=>void,
}

const useTweetModal = create<TweetModalProps>((set) => ({
    isOpen: false,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false }) 
}))

export default useTweetModal;
