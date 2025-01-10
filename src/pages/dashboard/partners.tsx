import PartnerImages from "@/components/admin/partner/partner-images";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
// import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";

export default function Partners() {
    // const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch partner
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <PartnerImages />
                {/* show uploaded images */}
            </div>
            <div>
                
            </div>
        </div>
    )
}

Partners.getLayout = function getLayout(page: React.ReactElement) {
    return <DashBoardLayout>{page}</DashBoardLayout>;
};
