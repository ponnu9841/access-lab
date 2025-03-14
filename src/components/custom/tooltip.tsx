import React from "react";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CustomTooltip({
   titleNode,
   content,
   onClick,
}: {
   titleNode: React.ReactNode | string;
   content: string;
   onClick?: () => void;
   buttonClassName?: string;
}) {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger
               onClick={onClick}
               asChild={typeof titleNode !== "string"}
            >
               {titleNode}
            </TooltipTrigger>
            <TooltipContent>
               <>{content}</>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
}
