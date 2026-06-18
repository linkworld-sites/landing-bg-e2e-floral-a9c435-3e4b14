'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CartItem, Product } from '@/lib/checkout'

interface CartEntry extends CartItem {
  name: string
  price_cents: number
  currency: string
}

interface CartContextValue {
  items: CartEntry[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (product_id: string) => void
  updateQuantity: (product_id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalCents: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>([])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [
        ...prev,
        {
          product_id: product.id,
          quantity,
          name: product.name,
          price_cents: product.price_cents,
          currency: product.currency,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((product_id: string) => {
    setItems((prev) => prev.filter((i) => i.product_id !== product_id))
  }, [])

  const updateQuantity = useCallback((product_id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product_id !== product_id))
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product_id === product_id ? { ...i, quantity } : i))
      )
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalCents = items.reduce((sum, i) => sum + i.price_cents * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalCents }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
