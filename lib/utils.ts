import { clsx, type ClassValue } from "clsx";
import {
  FabricObject,
  FabricObjectProps,
  ObjectEvents,
  SerializedObjectProps,
} from "fabric";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isText = (
  obj:
    | FabricObject<
        Partial<FabricObjectProps>,
        SerializedObjectProps,
        ObjectEvents
      >
    | undefined
) =>
  obj &&
  (obj.type === "textbox" || obj.type === "i-text" || obj.type === "text");
