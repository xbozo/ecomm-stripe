'use client'

import { useRouter } from 'next/navigation'
import { useCart } from './cart-context'

export const Cart = () => {
	const { cart, decrementQuantity, incrementQuantity, removeFromCart } = useCart()

	const router = useRouter()

	const totalCostAmount = cart
		.reduce((total, cartItem) => {
			return total + cartItem.price * cartItem.quantity
		}, 0)
		.toLocaleString('pt-BR', {
			currency: 'BRL',
			style: 'currency',
		})

	const handleDecrement = (productId: string) => {
		decrementQuantity(productId)

		const product = cart.find((cartItem) => {
			return cartItem.id === productId
		})

		if (product && product.quantity === 0) {
			removeFromCart(productId)
		}
	}

	const checkout = async () => {
		await fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ products: cart }),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res)

				if (res.url) {
					router.push(res.url)
				}
			})
	}

	return (
		<div className='border rounded-lg border-neutral-400 shadow-md p-5'>
			<h2 className='text-lg font-semibold text-center mb-4'>Seu carrinho</h2>
			{cart.length === 0 ? (
				<p className='text-center text-neutral-400'>Seu carrinho está vazio</p>
			) : (
				<ul>
					{cart.map((product) => {
						return (
							<li
								className='flex justify-between items-center mb-2'
								key={product.id}
							>
								<div>
									<p className='font-semibold'>{product.name}</p>
									<p className='text-neutral-400'>
										{product.price.toLocaleString('pt-BR', {
											currency: 'BRL',
											style: 'currency',
										})}{' '}
										x {product.quantity}
									</p>
								</div>

								<div className='flex space-x-2 '>
									<button
										onClick={() => handleDecrement(product.id)}
										className='px-2 py-1 bg-red-500 text-neutral-100 hover:bg-red-600 w-8 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
									>
										-
									</button>

									<button
										onClick={() => incrementQuantity(product.id)}
										className='px-2 py-1 bg-blue-500 text-neutral-100 hover:bg-blue-600 w-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
									>
										+
									</button>
								</div>
							</li>
						)
					})}
				</ul>
			)}

			{cart.length > 0 && (
				<>
					<div className='mt-4'>
						<p className='text-lg font-semibold'>Total: {totalCostAmount}</p>
					</div>

					<button
						onClick={checkout}
						className='mt-4 px-4 py-2 bg-emerald-600 text-neutral-100 hover:bg-emerald-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
					>
						Comprar
					</button>
				</>
			)}
		</div>
	)
}
