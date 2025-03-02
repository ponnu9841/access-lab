import React from "react";
import PolicyBannerForm from "./policies-form";
import { getPolicies } from "@/utils";

export default function Policies() {
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[1px] gap-y-[1.5px] bg-transparent">
        {getPolicies().map((policy, index) => (
          <div className="bg-background p-3" key={index}>
            <PolicyBannerForm type={policy} />
          </div>
        ))}
      </div>
    </div>
  );
}
