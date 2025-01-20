
import BannerData from "./banner-data";
import BannerForm from "./form";

export default function Banner() {
	

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
			<div className="md:col-span-2">
				<BannerForm />
			</div>
			<div className="md:col-span-3">
                <BannerData />
            </div>
		</div>
	);
}
