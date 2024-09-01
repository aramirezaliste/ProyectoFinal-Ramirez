import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        const newCart = cart.filter((e) => e.id != product.id)
        setCart([...newCart, product])
    }

    const removeFromCart = (id) => {
        const newCart = cart.filter((e) => e.id != id)
        setCart(newCart)
    }

    const cartItemCount = () => {
        return cart.reduce((acc, cur) => acc + cur.count, 0)
    }
    const count = cartItemCount()

    const cartTotalPrice = () => {
        return cart.reduce((acc, cur) => acc + (cur.price * cur.count), 0)
    }
    const totalPrice = cartTotalPrice()

    const isInCart = (id) => {
        return cart.some(el => el.id == id )
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, count, removeFromCart, totalPrice, isInCart }}>
            {children}
        </CartContext.Provider>
    )
}