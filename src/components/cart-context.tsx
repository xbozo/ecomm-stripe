'use client'

import { Product } from '@/@types/product'
import { ReactNode, createContext, useContext, useState } from 'react'

type CartContextType = {
	cart: Product[]
	addToCart: (product: Product) => void
	removeFromCart: (productId: string) => void
	incrementQuantity: (productId: string) => void
	decrementQuantity: (productId: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<Product[]>([])

	const addToCart = (product: Product) => {
		const existingProductIndex = cart.findIndex((cartItem) => cartItem.id === product.id)

		if (existingProductIndex !== -1) {
			const updatedCart = [...cart]

			updatedCart[existingProductIndex].quantity += 1
			setCart(updatedCart)

			return
		}

		setCart([...cart, { ...product, quantity: 1 }])
	}

	const removeFromCart = (productId: string) => {
		const updatedCart = cart.filter((cartItem) => cartItem.id !== productId)
		setCart(updatedCart)
	}

	const incrementQuantity = (productId: string) => {
		const updatedCart = cart.map((cartItem) =>
			cartItem.id === productId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
		)

		setCart(updatedCart)
	}

	const decrementQuantity = (productId: string) => {
		const updatedCart = cart.map((cartItem) =>
			cartItem.id === productId
				? { ...cartItem, quantity: cartItem.quantity > 0 ? cartItem.quantity - 1 : 0 }
				: cartItem
		)

		const filteredQuantity = updatedCart.filter((cartItem) => cartItem.quantity > 0)

		setCart(filteredQuantity)
	}

	const contextValue = {
		cart,
		addToCart,
		removeFromCart,
		incrementQuantity,
		decrementQuantity,
	}

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextType => {
	const context = useContext(CartContext)

	if (context === null) {
		throw new Error('useCart must be used within a CartProvider.')
	}

	return context
}
