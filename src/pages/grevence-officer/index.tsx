import axiosClient from "@/axios/axios-client";
import GrievanceOfficerCard from "@/components/admin/grevence-officer-card";
import Layout from "@/components/layout";

export default function GrevenceOfficerPage(props: { grievanceOfficer: GrievanceOfficer | null }) {


    return (
        <div className="container min-h-[60%] mt-[140px] ">
            <h1 className="max-w-md mx-auto text-2xl mb-2">Grievance Officer</h1>
            <div className="flex justify-center">{props.grievanceOfficer && <GrievanceOfficerCard {...props.grievanceOfficer} />}</div>
        </div>
    );
}

GrevenceOfficerPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
    try {
        const grievanceOfficer = await axiosClient.get("/grievance-officer");

        return {
            props: {
                grievanceOfficer: grievanceOfficer.data.data,
            },
            revalidate: process.env.REVALIDATE_TIME
                ? +process.env.REVALIDATE_TIME
                : 0,
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        // Handle the error appropriately, e.g., redirect to an error page
        return {
            props: {
                error: "Error fetching Data",
            },
        };
    }
}

