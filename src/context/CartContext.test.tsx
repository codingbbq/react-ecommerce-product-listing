import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Product } from '../models/Product';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    image: 'test.jpg',
    category: 'test'
};

describe('CartContext', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should start with an empty cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        expect(result.current.cartItems).toEqual([]);
        expect(result.current.totalItems).toBe(0);
        expect(result.current.totalPrice).toBe(0);
    });

    it('should add item to cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart(mockProduct);
        });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0]).toEqual({ ...mockProduct, quantity: 1 });
        expect(result.current.totalItems).toBe(1);
        expect(result.current.totalPrice).toBe(100);
    });

    it('should increment quantity when adding existing item', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart(mockProduct);
        });

        act(() => {
            result.current.addToCart(mockProduct);
        });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0].quantity).toBe(2);
        expect(result.current.totalPrice).toBe(200);
    });

    it('should remove item from cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart(mockProduct);
            result.current.removeFromCart(mockProduct.id);
        });

        expect(result.current.cartItems).toEqual([]);
    });

    it('should update quantity', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart(mockProduct);
            result.current.updateQuantity(mockProduct.id, 5);
        });

        expect(result.current.cartItems[0].quantity).toBe(5);
        expect(result.current.totalPrice).toBe(500);
    });

    it('should clear cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart(mockProduct);
            result.current.clearCart();
        });

        expect(result.current.cartItems).toEqual([]);
    });

    it('should persist to localStorage', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart(mockProduct);
        });

        const stored = localStorage.getItem('cartItems');
        expect(stored).toBeTruthy();
        expect(JSON.parse(stored!)[0].id).toBe(mockProduct.id);
    });
});
