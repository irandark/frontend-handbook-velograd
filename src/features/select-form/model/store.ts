import { create } from "zustand";

type ActiveFormStore = {
    activeFormId: number;

    setActiveFormById: (id: number) => void;
};

export const useActiveFormStore = create<ActiveFormStore>((set) => ({
    activeFormId: 0,

    setActiveFormById: (id) => set({ activeFormId: id }),
}));
