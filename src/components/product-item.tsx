'use client'

import { Product } from '@/@types/product'
import clsx from 'clsx'
import { useCart } from './cart-context'

type ProductItemProps = {
	product: Product
}

export const ProductItem = ({ product }: ProductItemProps) => {
	const { cart, addToCart } = useCart()

	const isProductInCart = cart.some((cartItem) => cartItem.id === product.id)

	return (
		<div className='border rounded-lg border-neutral-400 p-5 shadow-md'>
			<h2 className='text-lg font-semibold'>{product.name}</h2>
			<p className='text-neutral-400'>
				{product.price.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</p>

			<button
				onClick={() => addToCart(product)}
				disabled={isProductInCart}
				className={clsx(
					'mt-2 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
					{
						'bg-neutral-400 text-neutral-600 cursor-not-allowed': isProductInCart,
						'bg-blue-500 text-neutral-100 hover:bg-blue-600': !isProductInCart,
					}
				)}
			>
				{isProductInCart ? 'Adicionado ao carrinho' : 'Adicionar ao carrinho'}
			</button>
		</div>
	)
}
