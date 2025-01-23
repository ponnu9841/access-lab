import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import store from "@/redux/store";
import ReduxWrapper from "@/reduxWrapper";
import 'react-quill/dist/quill.snow.css';
import "@/styles/globals.css";

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
				{getLayout(
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Component {...pageProps} />
					</ThemeProvider>
				)}
				<Toaster />
			</ReduxWrapper>
		</Provider>
	);
}
