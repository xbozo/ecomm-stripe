import { CartProvider } from '@/components/cart-context'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'E-commerce Stripe',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt'>
			<body
				className={`${inter.className} bg-neutral-950 min-h-screen max-w-7xl p-4 flex items-center justify-center mx-auto text-neutral-100`}
			>
				<CartProvider>{children}</CartProvider>
			</body>
		</html>
	)
}
