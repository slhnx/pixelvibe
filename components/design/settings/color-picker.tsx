import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCanvas } from "@/hooks/use-canvas";
import { isText } from "@/lib/utils";
import { hexToHsva, hsvaToHex } from "@uiw/color-convert";
import Colorful from "@uiw/react-color-colorful";
import Image from "next/image";
import { useEffect, useState } from "react";

const ColorPicker = () => {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const { fabricCanvas, activeObject } = useCanvas();

  useEffect(() => {
    if (activeObject && activeObject.type === "textbox") {
      const textColor = activeObject.get("fill");
      setHsva(hexToHsva(textColor));
    }
  }, [activeObject]);

  return (
    <Popover>
      <PopoverTrigger asChild className="mt-4">
        <Button variant="outline">
          <Image
            src="/color-picker-dark.svg"
            height={14}
            width={14}
            alt="color-picker"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <Colorful
            color={hsva}
            disableAlpha
            onChange={(color) => {
              setHsva(color.hsva);

              if (isText(activeObject)) {
                activeObject?.set("fill", hsvaToHex(color.hsva));
                fabricCanvas?.requestRenderAll();
              }
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
