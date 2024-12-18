import Image from "next/image";
import Link from "next/link";
import HomeSlider from "./home-slider";

export default function Header() {
	return (
		<header>
			<div className="min-h-[100px] container mx-auto flex items-center gap-4 justify-between w-full fixed top-0 left-0 z-10 bg- text-primary-foreground">
				<ul className="flex gap-4">
					<li>
						<Link href="/" className="font-medium">
							Home
						</Link>
					</li>
					<li>
						<Link href="/" className="font-medium">
							About
						</Link>
					</li>
				</ul>
				<div>
					<Image src="/logo.svg" alt="logo" width={80} height={80} />
				</div>
				<ul className="flex gap-4">
					<li>
						<Link href="/" className="font-medium">
							Services
						</Link>
					</li>
					<li>
						<Link href="/" className="font-medium">
							Contact
						</Link>
					</li>
				</ul>
			</div>
			<div className="hero w-full" id="hero">
				<HomeSlider />
			</div>
		</header>
	);
}
