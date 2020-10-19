import React, {useContext} from 'react';
import {CartContext} from './CartContext';

export const Cart = ()=>{
    const [cart, setCart] = useContext(CartContext)
    const totalPrice = cart.reduce((acc, curr) => acc+curr.price, 0);
    const DishesInCart = cart.map(item => item.name);
    return(
        <div>
            <span>total price: {totalPrice}</span>
            <br/>
            <span> items in cart: {cart.length}</span>
            <br/>
            <span>names in cart: {[DishesInCart]}</span>


        </div>
    )
}