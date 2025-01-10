import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import NextImage from "./Image";
import Link from "next/link";

export function Logo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Link href="/dashboard">
					<NextImage
						src="/logo-textless.svg"
						className="aspect-square max-w-[40px]"
					/>
				</Link>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
