"use client";

import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, useUser } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const titleVariant = {
  initial: { opacity: 0, y: -15, filter: "blur(40px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const subtitleVariant = {
  initial: { opacity: 0, y: -15, filter: "blur(20px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const getStartedVariant = {
  initial: { opacity: 0, y: -15, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

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

const Page = () => {
  const { user } = useUser();

  return (
    <motion.main className="relative overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blurs flex flex-col items-end absolute -right-32 sm:-right-60 -top-10 blur-xl -z-10"
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

      <motion.header className="flex items-center justify-between container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="logo">
          <h1 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-bold">
            PixelVibe
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {!user?.id ? (
            <SignInButton forceRedirectUrl="/onboarding">
              <Button variant="secondary" size="sm" className="sm:size-default">
                Login
              </Button>
            </SignInButton>
          ) : (
            <Link href="/dashboard">
              <Button variant="secondary" size="sm" className="sm:size-default">
                Dashboard
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </motion.header>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
        className="hero container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-32 lg:py-52"
      >
        <div className="z-10 flex mb-4 sm:mb-6 items-center justify-center">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-sm sm:text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-3 sm:px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span className="hidden sm:inline">✨ Introducing PixelVibe</span>
              <span className="sm:hidden">✨ PixelVibe</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>

        <motion.h1
          variants={titleVariant}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-4xl sm:text-6xl lg:text-8xl font-bold text-center mb-2 text-primary leading-tight"
        >
          Design Your Vibe
        </motion.h1>

        <motion.p
          variants={subtitleVariant}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
          className="text-muted-foreground text-center text-lg sm:text-xl lg:text-2xl w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 my-4 mx-auto px-4 sm:px-0"
        >
          Create stunning visuals, social posts, and brand assets—all in one
          powerful, intuitive editor.
        </motion.p>

        <motion.div
          variants={getStartedVariant}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
          className="flex items-center gap-4 justify-center mt-6 sm:mt-4"
        >
          <SignInButton forceRedirectUrl="/onboarding">
            <Button
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              Get Started
            </Button>
          </SignInButton>
        </motion.div>
      </motion.div>
    </motion.main>
  );
};

export default Page;
