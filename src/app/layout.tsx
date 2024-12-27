import "@/styles/globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactChildren } from "@/lib/types";
import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
const myFont = localFont({
	src: [
		{
			path: "../../public/font/Nunito/Nunito-VariableFont_wght.ttf",
			style: "normal",
		},
		{
			path: "../../public/font/Nunito/Nunito-Italic-VariableFont_wght.ttf",
			style: "italic",
		},
	],
});

// const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({ children }: ReactChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={`${myFont.className} min-h-screen w-full`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<Layout>{children}</Layout>
				</ThemeProvider>
			</body>
		</html>
	);
}
