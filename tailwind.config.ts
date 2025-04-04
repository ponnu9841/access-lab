import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		colors: {
    			background: 'hsla(var(--background))',
    			foreground: {
    				DEFAULT: 'hsla(var(--foreground))'
    			},
    			card: {
    				DEFAULT: 'hsla(var(--card))',
    				foreground: 'hsla(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsla(var(--popover))',
    				foreground: 'hsla(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsla(var(--primary))',
    				foreground: 'hsla(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsla(var(--secondary))',
    				foreground: 'hsla(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsla(var(--muted))',
    				foreground: 'hsla(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsla(var(--accent))',
    				foreground: 'hsla(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsla(var(--destructive))',
    				foreground: 'hsla(var(--destructive-foreground))'
    			},
    			border: 'hsla(var(--border))',
    			input: 'hsla(var(--input))',
    			ring: 'hsla(var(--ring))',
    			chart: {
    				'1': 'hsla(var(--chart-1))',
    				'2': 'hsla(var(--chart-2))',
    				'3': 'hsla(var(--chart-3))',
    				'4': 'hsla(var(--chart-4))',
    				'5': 'hsla(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		boxShadow: {
    			'2xl': '0 0px 50px -12px rgb(0 0 0 / 0.25)'
    		},
    		keyframes: {
    			scroll: {
    				to: {
    					transform: 'translateX(calc(-50% - 5rem))'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			scroll: 'scroll 10000ms linear infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [typography, tailwindcssAnimate],
} satisfies Config;
