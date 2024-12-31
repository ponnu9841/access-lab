import "@/styles/globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactChildren } from "@/lib/types";
import { montserrat, nunito } from "./fonts";

export default function RootLayout({ children }: ReactChildren) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${nunito.variable} ${montserrat.variable}`}
		>
			<head />
			<body className="min-h-screen w-full">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Layout>{children}</Layout>
				</ThemeProvider>
			</body>
		</html>
	);
}
