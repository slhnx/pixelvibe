"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCanvas } from "@/hooks/use-canvas";
import { isText } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const FontSizeSelector = () => {
  const { fabricCanvas, activeObject } = useCanvas();
  const [fontSize, setFontSize] = useState(
    (activeObject?.get("fontSize") as number) || 12
  );

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
        disabled={fontSize == 1}
        onClick={() =>
          setFontSize((fontSize) => (fontSize - 4 > 0 ? fontSize - 4 : 1))
        }
      >
        <Minus />
      </Button>
      <Input
        type="number"
        min={0}
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