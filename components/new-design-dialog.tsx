"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { presetDimensions } from "@/lib/constants";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DimensionSelector from "./dimension-selector";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useWorkspaceStore } from "@/store/workspace";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const formSchema = z
  .object({
    designName: z
      .string()
      .min(1, "Design name is required")
      .max(50, "Design name must be less than 50 characters"),
    dimensionType: z.string().min(1, "Please select a dimension"),
    customWidth: z.string().optional(),
    customHeight: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.dimensionType === "custom") {
        return (
          data.customWidth &&
          data.customHeight &&
          !isNaN(Number(data.customWidth)) &&
          !isNaN(Number(data.customHeight)) &&
          Number(data.customWidth) > 0 &&
          Number(data.customHeight) > 0
        );
      }
      return true;
    },
    {
      message: "Custom dimensions must be valid positive numbers",
      path: ["customWidth"],
    }
  );

const NewDesignDialog = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
  const router = useRouter();

  const { isPending, mutate: createDesign } = useMutation({
    mutationFn: useConvexMutation(api.design.createDesign),
    onSuccess: (id: string) => {
      router.push(`/design/${id}`);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designName: "",
      dimensionType: "",
      customWidth: "",
      customHeight: "",
    },
  });

  const watchDimensionType = form.watch("dimensionType");
  const isCustomSelected = watchDimensionType === "custom";

  const handleDimensionSelect = (value: string) => {
    form.setValue("dimensionType", value);
    // Clear custom dimensions when switching away from custom
    if (value !== "custom") {
      form.setValue("customWidth", "");
      form.setValue("customHeight", "");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let finalDimensions;

    const { designName, dimensionType, customHeight, customWidth } = values;

    if (dimensionType === "custom") {
      finalDimensions = {
        width: Number(customWidth),
        height: Number(customHeight),
      };
    } else {
      const preset = presetDimensions.find(
        (p) => p.value === values.dimensionType
      );
      finalDimensions = preset
        ? { width: preset.width, height: preset.height }
        : null;
    }

    const design = {
      title: designName,
      workspace: activeWorkspace?._id as Id<"workspaces">,
      data: null,
      createdBy: user?.id as string,
      height: finalDimensions?.height as number,
      width: finalDimensions?.width as number,
    };

    createDesign(design);

    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Design
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Create New Design</DialogTitle>
          <DialogDescription>
            Enter your design details and choose the dimensions for your
            project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="designName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Design Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter design name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dimensionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-4">Dimensions</FormLabel>
                  <div className="px-8">
                    <DimensionSelector
                      field={field}
                      handleDimensionSelect={handleDimensionSelect}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isCustomSelected && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (px)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Width"
                          min="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customHeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (px)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Height"
                          min="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isPending}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewDesignDialog;
