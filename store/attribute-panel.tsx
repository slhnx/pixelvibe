import { create } from "zustand";

type ObjectTypes = "text" | null;

interface AttributePanelState {
  showAttrFor: ObjectTypes;
  setShowAttrFor: (showAttrFor: ObjectTypes) => void;
}

export const useShowAttributes = create<AttributePanelState>((set) => ({
  showAttrFor: null,
  setShowAttrFor: (showAttrFor: ObjectTypes) => {
    set({ showAttrFor });
  },
}));
