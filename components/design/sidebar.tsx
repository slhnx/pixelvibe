"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToolOption, toolOptions } from "@/lib/constants";
import { useShowAttributes } from "@/store/attribute-panel";
import TextPanel from "./panels/text";
import TextAttributes from "./attr/text";

const panelVariants = {
  hidden: {
    x: "5%",
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
};

const DesignSidebar = () => {
  const attributes = useShowAttributes();
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const getToolPanel = (hoveredTool: ToolOption | undefined) => {
    switch (hoveredTool?.id) {
      case "text":
        return <TextPanel />;
    }
  };

  return (
    <div className="relative py-4 px-2 rounded-xl bg-cardpy-4 bg-neutral-100 dark:bg-neutral-900 border border-ring/30">
      {/* Main Tools Sidebar */}
      <div className="h-fit flex flex-col items-center py-4 space-y-2">
        {toolOptions.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger>
              <div
                key={tool.id}
                className="relative group"
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                <div className="w-12 h-12 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200 cursor-pointer">
                  <tool.icon className="h-5 w-5 text-foreground" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>{tool.title}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Right Panel */}
      <AnimatePresence>
        {hoveredTool && (
          <motion.div
            className="fixed left-24 top-24 w-80 h-fit py-4 px-2 rounded-xl bg-card border border-ring/30 z-40 shadow-xl shadow-secondary/30"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onMouseEnter={() => setHoveredTool(hoveredTool)}
            onMouseLeave={() => setHoveredTool(null)}
          >
            {(() => {
              const tool = toolOptions.find((t) => t.id === hoveredTool);
              if (!tool) return null;

              return (
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <tool.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div>{getToolPanel(tool)}</div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {attributes.showAttrFor === "text" && (
          <motion.div
            className="fixed left-24 top-24 w-80 h-fit py-4 px-2 rounded-xl bg-card border border-ring/30 z-40 shadow-xl shadow-secondary/30"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onMouseEnter={() => setHoveredTool(hoveredTool)}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <TextAttributes />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default DesignSidebar;
