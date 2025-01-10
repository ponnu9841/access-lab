import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";
import { getToken } from "@/services/localStorageService";
import { useRouter } from "next/router";
import getCurrentRoute from "@/utils/getCurrentRoute";
export default function DashBoardLayout({ children }: ReactChildren) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const token = getToken();
		if (token) {
			setIsAuthenticated(true);
			return;
		}
		router.push("/login");
	}, []); //eslint-disable-line

	if (isAuthenticated) {
		return (
			<SidebarProvider>
				<AppSidebar />
				<div className="my-4 mx-3 flex-1">
					<div className="flex gap-x-2 items-center">
						<SidebarTrigger />

                        <div className="flex-1 flex justify-between">
                            <h1 className="text-xl">{getCurrentRoute(router.pathname)}</h1>
                        </div>
                        
					</div>
					<div className="p-5 px-2">{children}</div>
				</div>
			</SidebarProvider>
		);
	}
}
