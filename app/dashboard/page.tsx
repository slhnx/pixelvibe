import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <div>
        <Tabs defaultValue="list" className="w-full justify-center">
          <TabsList className="bg-transparent flex justify-between w-full ml-auto">
            <h1 className="text-xl text-primary ">Recent Projects</h1>
            <div>
              <TabsTrigger value="list">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <List />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>List</p>
                  </TooltipContent>
                </Tooltip>
              </TabsTrigger>

              <TabsTrigger value="grid">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Grid />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Grid</p>
                  </TooltipContent>
                </Tooltip>
              </TabsTrigger>
            </div>
          </TabsList>
          <Separator className="my-4" />
          <TabsContent value="list">list</TabsContent>
          <TabsContent value="grid">grid</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default Dashboard;
