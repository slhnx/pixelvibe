import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { useCanvasStore } from "@/store/canvas";
import { isText } from "@/lib/utils";
import { useCanvas } from "@/hooks/use-canvas";
import { useEffect, useState } from "react";

const FontStyleToggle = () => {
  const [styles, setStyles] = useState<string[]>([]);
  const { fabricCanvas, activeObject } = useCanvas();

  useEffect(() => {
    const isBold = activeObject?.get("fontWeight") === "bold";
    const isItalic = activeObject?.get("fontStyle") === "italic";
    const isUnderline = activeObject?.get("underline") === "underline";

    setStyles([
      isBold ? "bold" : "",
      isItalic ? "italic" : "",
      isUnderline ? "underline" : "",
    ]);
  }, [activeObject]);

  const toggleBold = () => {
    const activeObject = fabricCanvas?.getActiveObject();

    if (isText(activeObject)) {
      const isBold = activeObject?.get("fontWeight") === "bold";

      activeObject?.set("fontWeight", isBold ? "normal" : "bold");
      fabricCanvas?.requestRenderAll();
    }
  };

  const toggleItalic = () => {
    if (isText(activeObject)) {
      const isItalic = activeObject?.get("fontStyle") === "italic";

      activeObject?.set("fontStyle", isItalic ? "normal" : "italic");
      fabricCanvas?.requestRenderAll();
    }
  };

  const toggleUnderline = () => {
    if (isText(activeObject)) {
      const isUnderline = activeObject?.get("underline") === "underline";

      activeObject?.set("underline", isUnderline ? false : "underline");
      fabricCanvas?.requestRenderAll();
    }
  };

  return (
    <div className="mt-4">
      <Label>Font Style:</Label>
      <ToggleGroup
        value={styles}
        onValueChange={(value) => setStyles(value)}
        variant="outline"
        type="multiple"
        className="w-full mt-2"
      >
        <ToggleGroupItem value="bold" onClick={toggleBold}>
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" onClick={toggleItalic}>
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" onClick={toggleUnderline}>
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default FontStyleToggle;
