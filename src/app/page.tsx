import { Product } from '@/@types/product'
import { Cart } from '@/components/cart'
import { ProductItem } from '@/components/product-item'

const products: Product[] = [
	{
		id: '1',
		name: 'GoPro',
		price: 57,
		quantity: 0,
	},
	{
		id: '2',
		name: 'Mochila Nike',
		price: 120,
		quantity: 0,
	},
	{
		id: '3',
		name: 'Sapato Jordan',
		price: 150.99,
		quantity: 0,
	},
]

const Home = () => {
	return (
		<main className='flex flex-col items-center justify-between'>
			<div className='flex flex-col gap-8'>
				<h1 className='text-3xl'>Sistema de carrinho</h1>
				<div className='grid grid-cols-3 gap-4'>
					{products.map((product) => (
						<ProductItem
							key={product.id}
							product={product}
						/>
					))}
				</div>

				<Cart />
			</div>
		</main>
	)
}

export default Home
