import FontSelector from "@/components/design/settings/font-selector";
import FontStyleToggle from "../settings/font-style-toggle";
import ColorPicker from "../settings/color-picker";
import FontSizeSelector from "../settings/font-size-selector";
import StrikeThrough from "../settings/strike";
import ToggleCase from "../settings/toggle-case";

const TextAttributes = () => {
  return (
    <div>
      <FontSelector />
      <FontStyleToggle />
      <div className="flex flex-wrap gap-2 justify-start items-center">
        <ColorPicker />
        <FontSizeSelector />
        <StrikeThrough />
        <ToggleCase />
      </div>
    </div>
  );
};

export default TextAttributes;
