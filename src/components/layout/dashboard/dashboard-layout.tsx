import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect } from "react";
import { clearToken } from "@/services/localStorageService";
import { useRouter } from "next/router";
import getCurrentRoute from "@/utils/getCurrentRoute";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { fetchUser } from "@/redux/features/user-slice";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { handleToast } from "@/axios/handleErrorToast";
export default function DashBoardLayout({ children }: ReactChildren) {
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { user } = useAppSelector((state) => state.rootReducer.user);
	const router = useRouter();
	const dispatch = useAppDispatch();
	useEffect(() => {
		const controller = new AbortController();
		dispatch(fetchUser({ controller }));
		return () => controller.abort();
	}, []); //eslint-disable-line

	useEffect(() => {
		if(user.type && user.type !== "admin") {
			clearToken();
			router.push("/login");
			handleToast("You are not authorized to access this page");
			return
		}
	}, [user, router]);

	if (user.type === "admin") {
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
