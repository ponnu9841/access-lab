import Link from "next/link";
import { FiPhone, FiMail, FiInstagram, FiFacebook, FiLinkedin } from "react-icons/fi";

export default function InfoBar() {
	return (
		<div className="bg-primary hidden md:block">
			<div className="container flex justify-between text-white items-stretch">
				<div>
					<div className="text-sm flex items-stretch">
						<Link
							href="tel:+1800-001-658"
							className="flex space-x-2 items-center border-l border-gray-400 p-3"
						>
							<FiPhone size={16} />
							<span>+1800-001-658</span>
						</Link>
						<Link
							href="mailto:info@accesslabz.com"
							className="flex space-x-2 items-center p-3 border-x border-gray-400"
						>
							<FiMail size={16} />
							<span>info@accesslabz.com</span>
						</Link>
					</div>
				</div>
				<div className="flex">
					<Link
						target="_blank"
						href="#"
						className="p-3 border-l border-gray-400"
					>
						<FiInstagram size={16} />
					</Link>
					<Link
						target="_blank"
						href="#"
						className="p-3 border-x border-gray-400"
					>
						<FiFacebook size={16} />
					</Link>
					<Link
						target="_blank"
						href="#"
						className="p-3 border-r border-gray-400"
					>
						<FiLinkedin size={16} />
					</Link>
				</div>
			</div>
		</div>
	);
}
