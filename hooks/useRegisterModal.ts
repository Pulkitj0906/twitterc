import {create} from 'zustand'

interface RegisterModalStore{
    isOpen: boolean;
    OnOpen: () => void;
    OnClose: () => void;

};

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false })
}));

export default useRegisterModal;