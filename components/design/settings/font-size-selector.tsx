"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCanvas } from "@/hooks/use-canvas";
import { isText } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const FontSizeSelector = () => {
  const [fontSize, setFontSize] = useState(12);
  const { fabricCanvas, activeObject } = useCanvas();

  useEffect(() => {
    if (isText(activeObject)) {
      setFontSize(activeObject?.get("fontSize"));
    }
  }, []);

  useEffect(() => {
    if (isText(activeObject)) {
      activeObject?.set("fontSize", fontSize);
      fabricCanvas?.requestRenderAll();
    }
  }, [fontSize]);

  return (
    <div className="flex gap-2 mt-4">
      <Button
        variant="outline"
        onClick={() => setFontSize((fontSize) => fontSize - 4)}
      >
        <Minus />
      </Button>
      <Input
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value))}
        className="w-16"
      />
      <Button
        variant="outline"
        onClick={() => setFontSize((fontSize) => fontSize + 4)}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default FontSizeSelector;
