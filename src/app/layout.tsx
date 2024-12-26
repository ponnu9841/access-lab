import "@/styles/globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactChildren } from "@/lib/types";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({ children }: ReactChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={`${font.className} min-h-screen w-full`}>
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
