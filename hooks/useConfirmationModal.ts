import { create } from "zustand";

interface ConfirmationModalProps{
    isOpen: boolean,
    OnOpen: (postId?:string) => void,
    OnClose: () => void,
    postId?:string,
}

const useConfirmationModal = create<ConfirmationModalProps>((set) => ({
    isOpen: false,
    OnOpen: (postId) => set({ isOpen: true,postId }),
    OnClose: () => set({ isOpen: false }),
}))

export default useConfirmationModal;
