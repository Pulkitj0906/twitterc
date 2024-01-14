import { create } from "zustand";

interface ReportModalStore{
    isOpen: boolean;
    onOpen: (data?: Record<string, any>, userId?: string) => void;
    onClose: () => void;
    data?: Record<string, any>
    userId?: string
}

const useReportModal= create<ReportModalStore>((set) => ({
    isOpen: false,
    data: {},
    userId: '', 
    onOpen: (data, userId) => set({ isOpen: true, data, userId }),
    onClose:()=>set({isOpen:false})
}))

export default useReportModal;