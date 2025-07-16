import * as fabric from "fabric";
import { create } from "zustand";

type CanvasStore = {
  fabricCanvas: fabric.Canvas | null;
  setFabricCanvas: (canvas: fabric.Canvas | null) => void;
};

export const useCanvasStore = create<CanvasStore>((set) => ({
  fabricCanvas: null,
  setFabricCanvas: (canvas) => set({ fabricCanvas: canvas }),
}));
