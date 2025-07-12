"use client";

import { useState } from "react";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const presetDimensions = [
  {
    label: "Instagram Post (1080 × 1080)",
    value: "instagram-post",
    width: 1080,
    height: 1080,
  },
  {
    label: "Instagram Story (1080 × 1920)",
    value: "instagram-story",
    width: 1080,
    height: 1920,
  },
  {
    label: "Facebook Post (1200 × 630)",
    value: "facebook-post",
    width: 1200,
    height: 630,
  },
  {
    label: "Facebook Cover (1640 × 859)",
    value: "facebook-cover",
    width: 1640,
    height: 859,
  },
  {
    label: "Twitter Post (1200 × 675)",
    value: "twitter-post",
    width: 1200,
    height: 675,
  },
  {
    label: "Twitter Header (1500 × 500)",
    value: "twitter-header",
    width: 1500,
    height: 500,
  },
  {
    label: "YouTube Thumbnail (1280 × 720)",
    value: "youtube-thumbnail",
    width: 1280,
    height: 720,
  },
  {
    label: "YouTube Banner (2560 × 1440)",
    value: "youtube-banner",
    width: 2560,
    height: 1440,
  },
  {
    label: "LinkedIn Post (1200 × 627)",
    value: "linkedin-post",
    width: 1200,
    height: 627,
  },
  {
    label: "Pinterest Pin (1000 × 1500)",
    value: "pinterest-pin",
    width: 1000,
    height: 1500,
  },
  {
    label: "A4 Document (2480 × 3508)",
    value: "a4-document",
    width: 2480,
    height: 3508,
  },
  {
    label: "Business Card (1050 × 600)",
    value: "business-card",
    width: 1050,
    height: 600,
  },
];

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
  const [open, setOpen] = useState(false);

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let finalDimensions;

    if (values.dimensionType === "custom") {
      finalDimensions = {
        width: Number(values.customWidth),
        height: Number(values.customHeight),
      };
    } else {
      const preset = presetDimensions.find(
        (p) => p.value === values.dimensionType
      );
      finalDimensions = preset
        ? { width: preset.width, height: preset.height }
        : null;
    }

    console.log("Form submitted:", {
      designName: values.designName,
      dimensions: finalDimensions,
    });

    // Here you would typically create the design
    // For now, we'll just close the dialog and reset the form
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
      <DialogContent className="sm:max-w-[425px]">
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
                  <FormLabel>Dimensions</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select dimensions" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {presetDimensions.map((preset) => (
                        <SelectItem key={preset.value} value={preset.value}>
                          {preset.label}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
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
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewDesignDialog;
