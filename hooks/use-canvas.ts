import { useCanvasStore } from "@/store/canvas";

export const useCanvas = () => {
  const fabricCanvas = useCanvasStore((state) => state.fabricCanvas);

  return { fabricCanvas, activeObject: fabricCanvas?.getActiveObject() };
};
