import { presetDimensions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { Card, CardDescription, CardHeader } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type DimensionSelectorProps = {
  handleDimensionSelect: (value: string) => void;
  field: ControllerRenderProps<
    {
      designName: string;
      dimensionType: string;
      customWidth?: string | undefined;
      customHeight?: string | undefined;
    },
    "dimensionType"
  >;
};

const DimensionSelector = ({
  handleDimensionSelect,
  field,
}: DimensionSelectorProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {presetDimensions.map((dimension) => (
          <CarouselItem
            key={dimension.value}
            className="md:basis-1/3 lg:basis-1/3"
          >
            <Card
              className={cn(
                "cursor-pointer border-2",
                field.value == dimension.value
                  ? "border-primary/40 bg-neutral-800 shadow-lg"
                  : "hover:border-primary/40"
              )}
              onClick={() => handleDimensionSelect(dimension.value)}
            >
              <CardHeader className="p-3 text-center">
                <div className="text-center">
                  <p>{dimension.label}</p>
                </div>

                {dimension.value !== "custom" ? (
                  <CardDescription className="text-xs">
                    {dimension.width} × {dimension.height}
                  </CardDescription>
                ) : (
                  <CardDescription className="text-xs">
                    Enter custom dimensions
                  </CardDescription>
                )}
              </CardHeader>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious type="button" />
      <CarouselNext type="button" />
    </Carousel>
  );
};

export default DimensionSelector;
