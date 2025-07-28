import FontSelector from "@/components/design/settings/font-selector";
import FontStyleToggle from "../settings/font-style-toggle";
import ColorPicker from "../settings/color-picker";
import FontSizeSelector from "../settings/font-size-selector";

const TextAttributes = () => {
  return (
    <div>
      <FontSelector />
      <FontStyleToggle />
      <div className="flex gap-2 items-center">
        <ColorPicker />
        <FontSizeSelector />
      </div>
    </div>
  );
};

export default TextAttributes;
