import {create} from 'zustand'

interface EditModalStore{
    isOpen: boolean;
    OnOpen: () => void;
    OnClose: () => void;

};

const useEditModal = create<EditModalStore>((set) => ({
    isOpen: false,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false })
}));

export default useEditModal;