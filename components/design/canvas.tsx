"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";

import "@/app/fonts.css";
import { useShowAttributes } from "@/store/attribute-panel";
import { useCanvasStore } from "@/store/canvas";
import { useQuery } from "@tanstack/react-query";
import * as fabric from "fabric";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";

const Canvas = () => {
  const attributes = useShowAttributes();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const setFabricCanvas = useCanvasStore((state) => state.setFabricCanvas);

  const { id } = useParams<{ id: Id<"design"> }>();

  const { isLoading, data: design } = useQuery(
    convexQuery(api.design.getDesign, { designId: id })
  );

  useEffect(() => {
    if (!canvasRef.current || !design) return;

    const canvasHeight = design.height;
    const canvasWidth = design.width;

    const windowHeight = containerRef?.current?.scrollHeight as number;
    const windowWidth = containerRef?.current?.scrollWidth as number;

    const scaleX = windowWidth / canvasWidth;
    const scaleY = windowHeight / canvasHeight;

    const newScale = Math.min(scaleX, scaleY);

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: design.width * newScale,
      height: design.height * newScale,
      backgroundColor: "#fff",
    });

    canvas.on("selection:updated", () => {
      const active = canvas.getActiveObject();
      if (active?.type === "textbox") {
        attributes.setShowAttrFor("text");
      }
    });

    canvas.on("selection:cleared", () => {
      attributes.setShowAttrFor(null);
    });

    canvas.renderAll();

    setFabricCanvas(canvas);

    return () => {
      setFabricCanvas(null);
      canvas.dispose();
    };
  }, [isLoading, design]);

  useEffect(() => {
    if (!design || !containerRef) return;
  }, [isLoading, design]);

  if (isLoading || !canvasRef) {
    return <Skeleton className="h-[400px] w-[800px]" />;
  }

  return (
    <div
      ref={containerRef}
      className="rounded-lg w-full border flex justify-center border-ring/40"
    >
      <canvas
        className="w-full"
        ref={canvasRef}
        style={{
          display: "block",
        }}
      />
    </div>
  );
};

export default Canvas;
