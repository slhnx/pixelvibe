"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
// import { FONTS } from "@/lib/constants";
import { ScrollArea } from "./ui/scroll-area";
import { useCanvasStore } from "@/store/canvas";
import { FONTS } from "@/lib/constants";
import { useEffect, useState } from "react";

const FontSelector = () => {
  const [font, setFont] = useState("");

  const fabricCanvas = useCanvasStore((state) => state.fabricCanvas);

  const updateFontFamily = (font: string) => {
    const activeObject = fabricCanvas?.getActiveObject();

    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fontFamily", font);
      fabricCanvas?.requestRenderAll();
    }
  };

  useEffect(() => {
    const activeObject = fabricCanvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const fontFamily = activeObject.get("fontFamily");
      setFont(fontFamily);
    }
  }, [fabricCanvas]);

  return (
    <div>
      <Label className="mb-2">Font Family:</Label>
      <Select value={font} onValueChange={(font) => updateFontFamily(font)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Inter" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-[400px]">
            {FONTS.map((font, index) => (
              <SelectItem
                value={font}
                key={font}
                style={{ fontFamily: index < 10 ? font : undefined }}
              >
                {font}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSelector;
