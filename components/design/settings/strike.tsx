"use client";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCanvas } from "@/hooks/use-canvas";
import { isText } from "@/lib/utils";
import { Strikethrough } from "lucide-react";

const StrikeThrough = () => {
  const [pressed, setPressed] = useState(false);
  const { activeObject, fabricCanvas } = useCanvas();

  useEffect(() => {
    if (isText(activeObject)) {
      activeObject?.set("linethrough", activeObject?.get("linethrough"));
      setPressed(activeObject?.get("linethrough"));
    }
  }, [activeObject]);

  const toggleStrikethrough = () => {
    if (!isText(activeObject)) return;

    activeObject?.set("linethrough", !activeObject?.get("linethrough"));
    fabricCanvas?.requestRenderAll();
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Toggle
          className="mt-4"
          asChild
          pressed={pressed}
          onPressedChange={toggleStrikethrough}
        >
          <Strikethrough />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Strikethough</TooltipContent>
    </Tooltip>
  );
};

export default StrikeThrough;
