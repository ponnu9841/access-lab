import "@/styles/globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactChildren } from "@/lib/types";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: ReactChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={`${font.className} min-h-screen w-full`}>
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
