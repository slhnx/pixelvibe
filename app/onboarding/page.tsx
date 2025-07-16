"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useStoreUserEffect from "@/hooks/use-store-user-effect";
import { useUser } from "@clerk/nextjs";
import { useConvexMutation } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Building, Loader } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const blurVariants = {
  initial: { opacity: 0, scale: 0.8, rotate: 0 },
  animate: {
    opacity: 0.5,
    scale: 1,
    rotate: 360,
  },
};

const floatingVariants = {
  animate: {
    y: [-30, 10, -30],
    x: [-10, 10, -10],
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1.4, 1.5, 1.2, 0.8, 1],
    opacity: [0.5, 0.7, 0.5],
  },
};

const formSchema = z.object({
  workspaceName: z.string().min(1),
});

const Onboarding = () => {
  const { isLoading, isAuthenticated } = useStoreUserEffect();
  const { user } = useUser();

  const router = useRouter();

  const { isPending, mutate: createWorkspace } = useMutation({
    mutationFn: useConvexMutation(api.workspaces.create),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  const onSubmit = ({ workspaceName }: z.infer<typeof formSchema>) => {
    if (isAuthenticated) {
      createWorkspace({
        name: workspaceName,
        owner: user?.id as Id<"users">,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute -z-10 w-[400px] h-[400px] opacity-70">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blurs flex flex-col items-end -right-32 sm:-right-60 -top-10 blur-xl -z-10"
          >
            <motion.div
              variants={blurVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="h-[6rem] sm:h-[8rem] lg:h-[10rem] rounded-full w-[30rem] sm:w-[45rem] lg:w-[60rem] z-1 bg-gradient-to-b blur-[4rem] sm:blur-[5rem] lg:blur-[6rem] from-purple-600 to-sky-600"
              style={{ transformOrigin: "center" }}
            />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              transition={{
                delay: 1,
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="h-[6rem] sm:h-[8rem] lg:h-[10rem] rounded-full w-[45rem] sm:w-[70rem] lg:w-[90rem] z-1 bg-gradient-to-b blur-[4rem] sm:blur-[5rem] lg:blur-[6rem] from-pink-900 to-emerald-600 opacity-50"
            />
            <motion.div
              variants={pulseVariants}
              animate="animate"
              transition={{
                delay: 2,
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="h-[6rem] sm:h-[8rem] lg:h-[10rem] rounded-full w-[30rem] sm:w-[45rem] lg:w-[60rem] z-1 bg-gradient-to-b blur-[4rem] sm:blur-[5rem] lg:blur-[6rem] from-emerald-600 to-sky-500"
            />
          </motion.div>
        </div>
        <div className="flex items-center gap-4">
          <Loader className="animate-spin" />
          <h1 className="text-xl">Working on it...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-[400px] border border-primary/10 p-12 rounded-xl bg-neutral-100 dark:bg-neutral-900">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Building size={40} className="text-primary/70" />
            <h1 className="text-primary text-xl font-medium my-4">
              Just one more step...
            </h1>
            <FormField
              name="workspaceName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Workspace Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button isLoading={isPending} className="w-full">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Onboarding;
