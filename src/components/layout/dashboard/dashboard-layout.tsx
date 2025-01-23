import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";
import { getToken, getUser } from "@/services/localStorageService";
import { useRouter } from "next/router";
import getCurrentRoute from "@/utils/getCurrentRoute";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { setUser } from "@/redux/features/user-slice";
import { handleToast } from "@/axios/handleErrorToast";
export default function DashBoardLayout({ children }: ReactChildren) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();
	const dispatch = useAppDispatch();
	useEffect(() => {
		const token = getToken();
		if (token) {
			const user = getUser();
			if (user.type === "admin") {
				setIsAuthenticated(true);
				dispatch(setUser(user));
				return;
			}
			handleToast("You are not authorized to access this page");
			router.push("/login");
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
	} else {
		return <></>;
	}
}
