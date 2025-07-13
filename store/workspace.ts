import { create } from "zustand";
import { Doc } from "@/convex/_generated/dataModel";

type WorkspaceStore = {
  activeWorkspace: Doc<"workspaces"> | null;
  setActiveWorkspace: (workspace: Doc<"workspaces"> | null) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  activeWorkspace: null,
  setActiveWorkspace: (workspace: Doc<"workspaces"> | null) =>
    set({ activeWorkspace: workspace }),
}));
