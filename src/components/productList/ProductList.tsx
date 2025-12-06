import { useEffect, useState } from 'react';
import type { Product } from '../../models/Product';
import { useCart } from '../../context/CartContext';
import CartSidebar from '../cart/CartSidebar';

const ProductList = () => {
	const [data, setData] = useState<Product[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { addToCart } = useCart();

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(
					'https://equalexperts.github.io/frontend-take-home-test-data/products.json'
				);
				if (!response.ok) {
					throw new Error(`Http Error! status: ${response}`);
				}

				const jsonData = await response.json();
				setData(jsonData as Product[]);
			} catch (error) {
				setError(`Some error occurred, ${error}`);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, []);

	if (loading) {
		return <div className="mt-24 text-center">Loading data...</div>;
	}

	if (error) {
		return <div className="mt-24 text-center text-red-500">Error: {error}</div>;
	}

	return (
		<div className='flex justify-center flex-col items-center mt-24 mb-10'>
			<CartSidebar />
			{/* Render your fetched data here */}
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center px-4 max-w-7xl w-full">
				{data &&
					data?.map((product) => (
						<div key={product.id} className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col transition-transform hover:scale-105'>
							<a href='#' className="flex justify-center items-center h-48 sm:h-64 p-4">
								<img
									className='max-h-full max-w-full object-contain rounded-t-lg'
									src={product.image}
									alt={product.title}
								/>
							</a>
							<div className='px-5 pb-5 flex flex-col flex-grow'>
								<a href='#'>
									<h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2 min-h-[3.5rem]'>
										{product.title}
									</h5>
								</a>
								<p className="text-gray-500 text-sm mt-2 line-clamp-3 mb-4 flex-grow">{product.description}</p>

								<div className='flex items-center justify-between mt-auto pt-4'>
									<span className='text-2xl font-bold text-gray-900 dark:text-white'>
										${product.price}
									</span>
									<button
										onClick={() => addToCart(product)}
										className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									>
										Add to cart
									</button>
								</div>
							</div>
						</div>
					))}
			</ul>
		</div>
	);
};

export default ProductList;
