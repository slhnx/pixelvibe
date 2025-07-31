"use client";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CaseSensitive } from "lucide-react";
import { useCanvas } from "@/hooks/use-canvas";
import { isText } from "@/lib/utils";

const ToggleCase = () => {
  const [pressed, setPressed] = useState(false);
  const { activeObject, fabricCanvas } = useCanvas();

  useEffect(() => {
    if (isText(activeObject)) {
      const currentText: string = activeObject?.get("text") || "";
      setPressed(currentText.toUpperCase() === currentText);
    }
  }, [activeObject]);

  const toggleCase = () => {
    if (!isText(activeObject)) return;

    const currentText: string = activeObject?.get("text") || "";

    const isUpperCase = currentText.toUpperCase() === currentText;

    const newText = isUpperCase
      ? currentText.toLowerCase()
      : currentText.toUpperCase();
    setPressed(newText === currentText.toUpperCase());
    activeObject?.set("text", newText);

    fabricCanvas?.requestRenderAll();
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Toggle
          className="mt-4"
          asChild
          pressed={pressed}
          onPressedChange={toggleCase}
        >
          <CaseSensitive />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Toggle Uppercase</TooltipContent>
    </Tooltip>
  );
};

export default ToggleCase;
