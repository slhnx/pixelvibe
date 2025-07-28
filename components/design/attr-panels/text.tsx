import FontSelector from "@/components/design/settings/font-selector";
import FontStyleToggle from "../settings/font-style-toggle";
import ColorPicker from "../settings/color-picker";

const TextAttributes = () => {
  return (
    <div>
      <FontSelector />
      <FontStyleToggle />
      <ColorPicker />
    </div>
  );
};

export default TextAttributes;
