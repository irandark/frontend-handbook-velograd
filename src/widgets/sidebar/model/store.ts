import { create } from "zustand";

type SidebarStore = {
    isResized: boolean;

    toggle: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
    isResized: false,

    toggle: () => set((state) => ({ isResized: !state.isResized })),
}));
