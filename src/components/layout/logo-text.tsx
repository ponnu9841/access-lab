import { DM_Serif_Text } from "next/font/google";

const font = DM_Serif_Text({ weight: "400", subsets: ["latin"] });

export default function LogoText() {
	return (
		<div className={`text-primary text-3xl leading-none font-bold uppercase ${font.className}`}>
			ACCESS
            <div className="text-secondary">Tech</div>
		</div>
	);
}
