import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import Explore from "./_components/explore";
function page() {
  return (
    <ScrollArea className="h-full">
      <Explore />
    </ScrollArea>
  );
}

export default page;
