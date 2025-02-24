import { getPages } from "@/utils";
import PagesBannerForm from "./pages-banner-form";

export default function PagesBanner() {
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[1px] gap-y-[1.5px] bg-transparent">
        {getPages().map((page, index) => (
          <div className="bg-background p-3" key={index}>
            <PagesBannerForm page={page} />
          </div>
        ))}
      </div>
    </div>
  );
}
