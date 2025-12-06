import { useCart } from '../../context/CartContext';

const CartSidebar = () => {
    const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 overflow-hidden z-50">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeCart}></div>

                <div className="fixed inset-y-0 right-0 pl-10 maximum-w-full flex">
                    <div className="w-screen max-w-md">
                        <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                                    <div className="ml-3 h-7 flex items-center">
                                        <button
                                            type="button"
                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                            onClick={closeCart}
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {cartItems.length === 0 ? (
                                                <li className="py-6 text-center text-gray-500">Your cart is empty.</li>
                                            ) : (
                                                cartItems.map((product) => (
                                                    <li key={product.id} className="py-6 flex">
                                                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                            <img
                                                                src={product.image}
                                                                alt={product.title}
                                                                className="w-full h-full object-center object-cover"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex-1 flex flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>{product.title}</h3>
                                                                    <p className="ml-4">${product.price}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                                            </div>
                                                            <div className="flex-1 flex items-end justify-between text-sm">
                                                                <div className="flex items-center space-x-2">
                                                                    <button className="px-2 py-1 border rounded" onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
                                                                    <p className="text-gray-500">Qty {product.quantity}</p>
                                                                    <button className="px-2 py-1 border rounded" onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                                                                </div>

                                                                <div className="flex">
                                                                    <button
                                                                        type="button"
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                        onClick={() => removeFromCart(product.id)}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${totalPrice.toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Checkout
                                    </a>
                                </div>
                                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                    <p>
                                        or{' '}
                                        <button
                                            type="button"
                                            className="text-indigo-600 font-medium hover:text-indigo-500"
                                            onClick={closeCart}
                                        >
                                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar; // Corrected export
