import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import store from "@/redux/store";
import ReduxWrapper from "@/reduxWrapper";

//eslint-disable-next-line
export type PageLayoutType<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: PageLayoutType;
};

export default function App(props: AppPropsWithLayout) {
	const { Component, pageProps } = props;
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<Provider store={store}>
			<ReduxWrapper>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{getLayout(
						<>
							<Component {...pageProps} />
							<Toaster />
						</>
					)}
				</ThemeProvider>
			</ReduxWrapper>
		</Provider>
	);
}
