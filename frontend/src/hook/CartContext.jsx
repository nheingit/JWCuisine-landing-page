import React, {useState} from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
    const [cart,  setCart] = useState([]);
    React.useEffect(()=>{
        const data = localStorage.getItem('user-cart');
        if(data){
            setCart(JSON.parse(data));
        }
      }, []);

      React.useEffect(()=> {
        localStorage.setItem('user-cart', JSON.stringify(cart))
      }, [cart]);
    return(
        <CartContext.Provider value={[cart,  setCart]}>
        {props.children}
        </CartContext.Provider>
    )
}