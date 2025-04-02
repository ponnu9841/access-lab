import { useRouter } from "next/router";
import React from "react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
   const router = useRouter();
   const handleClick = () => {
      router.back();
   };
   return <Button onClick={handleClick}>Go Back</Button>;
}
