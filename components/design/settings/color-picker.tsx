import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCanvas } from "@/hooks/use-canvas";
import { isText } from "@/lib/utils";
import { hsvaToHex } from "@uiw/color-convert";
import Colorful from "@uiw/react-color-colorful";
import Image from "next/image";
import { useState } from "react";

const ColorPicker = () => {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const { fabricCanvas, activeObject } = useCanvas();

  return (
    <Popover>
      <PopoverTrigger asChild className="mt-4">
        <Button variant="ghost" className="rounded-full">
          <Image
            src="/color-picker-dark.svg"
            height={20}
            width={20}
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
