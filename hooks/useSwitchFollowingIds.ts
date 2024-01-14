import {create} from 'zustand'

interface useSwitchFollowingIdsStore{
    isOpen: boolean;
    OnOpen: () => void;
    OnClose: () => void;

};

const useSwitchFollowingIds = create<useSwitchFollowingIdsStore>((set) => ({
    isOpen: false,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false })
}));

export default useSwitchFollowingIds;