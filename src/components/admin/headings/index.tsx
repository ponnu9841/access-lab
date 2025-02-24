import SectionHeadingForm from "./section-heading-form";
import { getSectionHeadings } from "@/utils";

export default function Headings() {
  
  return (
    <div className="px-4">
      <div className="bg-black/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[1px] gap-y-[1.5px] bg-transparent">
          {getSectionHeadings().map((heading, index) => (
            <div className="bg-background p-3" key={index}>
              <SectionHeadingForm section={heading} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
