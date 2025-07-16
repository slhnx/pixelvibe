import { Button } from "@/components/ui/button";
import { useCanvasStore } from "@/store/canvas";
import * as fabric from "fabric";

type AddTextBoxProps = {
  fontSize?: number;
  isHeading?: boolean;
  heading?: "h1" | "h2" | "h3";
};

const TextPanel = () => {
  const fabricCanvas = useCanvasStore((state) => state.fabricCanvas);

  const addTextBox = (props: AddTextBoxProps) => {
    const headingFontSizes = {
      h1: 48,
      h2: 32,
      h3: 16,
    };

    const textStyles: Partial<fabric.TextboxProps> = {
      left: 200,
      top: 200,
      width: props.isHeading ? 450 : 200,
      fontSize: 16,
      fontFamily: "Inter",
      fill: "#000000",
      fontWeight: "normal",
    };

    if (props.isHeading) {
      textStyles.fontSize =
        headingFontSizes[props.heading as keyof typeof headingFontSizes];
    }

    const textbox = new fabric.Textbox("Enter text here", {
      ...textStyles,
    });

    fabricCanvas?.add(textbox);
    fabricCanvas?.setActiveObject(textbox);
    fabricCanvas?.renderAll();
  };

  return (
    <div>
      <Button
        className="w-full mb-4"
        onClick={() => addTextBox({ fontSize: 16 })}
      >
        Add a textbox
      </Button>
      <Button
        className="w-full text-3xl h-12"
        size="lg"
        variant="outline"
        onClick={() => addTextBox({ isHeading: true, heading: "h1" })}
      >
        H1
      </Button>
      <Button
        className="w-full text-2xl h-10 my-4"
        size="lg"
        variant="outline"
        onClick={() => addTextBox({ isHeading: true, heading: "h2" })}
      >
        H2
      </Button>
      <Button
        className="w-full text-xl"
        size="lg"
        variant="outline"
        onClick={() => addTextBox({ isHeading: true, heading: "h3" })}
      >
        H3
      </Button>
    </div>
  );
};

export default TextPanel;
