"use client";

import NewDesignDialog from "@/components/new-design-dialog";
import NewWorkspaceDialog from "@/components/new-workspace-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useWorkspaceStore } from "@/store/workspace";
import { useUser } from "@clerk/nextjs";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { Building, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
  const setActiveWorkspace = useWorkspaceStore(
    (state) => state.setActiveWorkspace
  );

  const [newWorkspaceDialog, setNewWorkspaceDialog] = useState(false);
  const { user } = useUser();

  const { data: currentWorkspace } = useQuery(
    convexQuery(api.workspaces.getActiveWorkspace, {
      clerkUserId: user?.id as string,
    })
  );

  useEffect(() => {
    if (currentWorkspace) {
      setActiveWorkspace(currentWorkspace);
    }
  }, [currentWorkspace]);

  const { isLoading, data: workspaces } = useQuery(
    convexQuery(api.workspaces.getWorkspaces, {
      clerkUserId: user?.id as string,
    })
  );

  const onWorkspaceChange = (newWorkspaceId: string) => {
    const newWorkspace = workspaces?.find((w) => w._id === newWorkspaceId);

    if (newWorkspace) {
      setActiveWorkspace(newWorkspace);
    }
  };

  return (
    <main className="relative">
      <div className="absolute top-10 -translate-y-[20%] z-[-2] h-screen w-screen dark:bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="w-full flex items-center justify-center">
        {!isLoading && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="-mt-6">
              <Button variant="outline">{activeWorkspace?.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuRadioGroup
                value={activeWorkspace?._id}
                onValueChange={(value) => onWorkspaceChange(value)}
              >
                {workspaces?.map((workspace) => (
                  <DropdownMenuRadioItem
                    key={workspace._id}
                    value={workspace._id}
                    className="text-primary"
                  >
                    <Building />
                    {workspace.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="py-2"
                onClick={() => setNewWorkspaceDialog(true)}
              >
                <Button
                  variant="outline"
                  className="w-full  flex items-center gap-2"
                >
                  <Plus className="" />
                  Create New Workspace
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <NewWorkspaceDialog
          open={newWorkspaceDialog}
          onOpenChange={setNewWorkspaceDialog}
        />
      </div>
      <div className="container mx-auto my-28 text-primary">
        <h1 className="text-7xl text-center">Good Morning, Shaan!</h1>
        <p className="text-secondary-foreground/80 text-xl text-center mt-4">
          Choose from a list of templates below and get started with your design
        </p>
        <div className="flex justify-center mt-12">
          <NewDesignDialog />
        </div>
      </div>
    </main>
  );
};

export default Page;
