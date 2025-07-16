"use client";
import { ChevronLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const Topbar = () => {
  const router = useRouter();

  return (
    <header className="w-full py-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 p-4  border border-ring/30">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft />
          Back
        </Button>

        <h1 className="text-xl">Design Title</h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <Button>
            <Download />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
