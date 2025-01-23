import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				pathname: "/uploads/**",
				port: "8000",
			},
			{
				protocol: "https",
				hostname: "**.accesstech.in",
				pathname: "/uploads/**",
			},
		],
	},
};

export default nextConfig;
