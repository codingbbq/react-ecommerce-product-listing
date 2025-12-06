import { render, screen, fireEvent } from '@testing-library/react';
import CartSidebar from './CartSidebar';
import { useCart } from '../../context/CartContext';
import { vi, describe, it, expect, Mock } from 'vitest';

// Mock the useCart hook
vi.mock('../../context/CartContext', () => ({
    useCart: vi.fn(),
}));

describe('CartSidebar', () => {
    const mockCloseCart = vi.fn();
    const mockRemoveFromCart = vi.fn();
    const mockUpdateQuantity = vi.fn();

    const mockCartItems = [
        {
            id: 1,
            title: 'Test Product',
            price: 50,
            description: 'Test Desc',
            image: 'test.jpg',
            quantity: 2,
            category: 'test',
        },
    ];

    it('should not render when isCartOpen is false', () => {
        (useCart as Mock).mockReturnValue({
            isCartOpen: false,
            closeCart: mockCloseCart,
            cartItems: [],
            removeFromCart: mockRemoveFromCart,
            updateQuantity: mockUpdateQuantity,
            totalPrice: 0,
        });

        const { container } = render(<CartSidebar />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render items when isCartOpen is true', () => {
        (useCart as Mock).mockReturnValue({
            isCartOpen: true,
            closeCart: mockCloseCart,
            cartItems: mockCartItems,
            removeFromCart: mockRemoveFromCart,
            updateQuantity: mockUpdateQuantity,
            totalPrice: 100,
        });

        render(<CartSidebar />);

        expect(screen.getByText('Shopping cart')).toBeInTheDocument();
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Qty 2')).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument();
    });

    it('should call closeCart when close button is clicked', () => {
        (useCart as Mock).mockReturnValue({
            isCartOpen: true,
            closeCart: mockCloseCart,
            cartItems: mockCartItems,
            removeFromCart: mockRemoveFromCart,
            updateQuantity: mockUpdateQuantity,
            totalPrice: 100,
        });

        render(<CartSidebar />);

        // There are two close triggers: the backdrop and the X button. 
        // Let's find the X button by its accessible name "Close panel"
        fireEvent.click(screen.getByRole('button', { name: /Close panel/i }));
        expect(mockCloseCart).toHaveBeenCalled();
    });

    it('should call updateQuantity when +/- buttons are clicked', () => {
        (useCart as Mock).mockReturnValue({
            isCartOpen: true,
            closeCart: mockCloseCart,
            cartItems: mockCartItems,
            removeFromCart: mockRemoveFromCart,
            updateQuantity: mockUpdateQuantity,
            totalPrice: 100,
        });

        render(<CartSidebar />);

        fireEvent.click(screen.getByText('+'));
        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);

        fireEvent.click(screen.getByText('-'));
        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
    });

    it('should call removeFromCart when remove button is clicked', () => {
        (useCart as Mock).mockReturnValue({
            isCartOpen: true,
            closeCart: mockCloseCart,
            cartItems: mockCartItems,
            removeFromCart: mockRemoveFromCart,
            updateQuantity: mockUpdateQuantity,
            totalPrice: 100,
        });

        render(<CartSidebar />);

        fireEvent.click(screen.getByText('Remove'));
        expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    });
});
