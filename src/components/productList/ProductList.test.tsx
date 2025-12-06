import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductList from './ProductList'; // Verify path
import { useCart } from '../../context/CartContext';
import { vi, describe, it, expect, Mock } from 'vitest';
import type { Product } from '../../models/Product';

// Mock the useCart hook
vi.mock('../../context/CartContext', () => ({
    useCart: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

const mockProducts: Product[] = [
    {
        id: 1,
        title: 'Test Product 1',
        price: 100,
        description: 'Description 1',
        image: 'img1.jpg',
        category: 'cat1'
    },
    {
        id: 2,
        title: 'Test Product 2',
        price: 200,
        description: 'Description 2',
        image: 'img2.jpg',
        category: 'cat2'
    }
];

describe('ProductList', () => {
    const mockAddToCart = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useCart as Mock).mockReturnValue({
            addToCart: mockAddToCart,
            isCartOpen: false, // Mock other properties if needed by CartSidebar which is rendered inside
            cartItems: [],
            closeCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateQuantity: vi.fn(),
            totalPrice: 0,
        });

        // Mock CartSidebar to avoid complex rendering in unit test
        vi.mock('../cart/CartSidebar', () => ({
            default: () => <div data-testid="cart-sidebar">Cart Sidebar</div>,
        }));
    });

    it('should render loading state initially', () => {
        (global.fetch as Mock).mockReturnValue(new Promise(() => { })); // pending promise
        render(<ProductList />);
        expect(screen.getByText('Loading data...')).toBeInTheDocument();
    });

    it('should render products after fetch', async () => {
        (global.fetch as Mock).mockResolvedValue({
            ok: true,
            json: async () => mockProducts,
        });

        render(<ProductList />);

        await waitFor(() => {
            expect(screen.getByText('Test Product 1')).toBeInTheDocument();
            expect(screen.getByText('Test Product 2')).toBeInTheDocument();
        });
    });

    it('should render error state on fetch failure', async () => {
        (global.fetch as Mock).mockRejectedValue(new Error('Fetch failed'));

        render(<ProductList />);

        await waitFor(() => {
            expect(screen.getByText('Error: Some error occurred, Error: Fetch failed')).toBeInTheDocument();
        });
    });

    it('should call addToCart when button is clicked', async () => {
        (global.fetch as Mock).mockResolvedValue({
            ok: true,
            json: async () => mockProducts,
        });

        render(<ProductList />);

        await waitFor(() => {
            expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        });

        const addButtons = screen.getAllByText('Add to cart');
        fireEvent.click(addButtons[0]);

        expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
    });
});
