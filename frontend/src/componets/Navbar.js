import React, {useState, useContext} from 'react';
import '../index.css'
import {CSSTransition} from 'react-transition-group';
import SortIcon from "@material-ui/icons/Sort";
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ShoppingBasket } from '@material-ui/icons';
import {CartContext}  from '../hook/CartContext';
import { Link } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const  NavigationBar= () => {
    return(
        
        
            <NavItem icon ={<SortIcon />}>
                <DropdownMenu></DropdownMenu>
            </NavItem>

        

    );
}
//Navbar functionality in case I want to add more than just the one Icon
//function NavBar(props){
    //return (
        //<nav>
            //<ul className='navbar-nav'>{ props.children }</ul>
        //</nav>
    //);
//}
function NavItem(props){
    const [open, setOpen] = useState(false);
    function clickHandle(e){
        e.preventDefault();
        setOpen(!open);
    }
    return(
        <li className='nav-item'>
            <a href='/' className='icon-button' onClick={clickHandle}>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    );
}



function DropdownMenu(){
    const [cart, setCart] = useContext(CartContext)
    const totalPrice = cart.reduce((acc, curr) => acc+curr.price, 0);
    const [activeMenu, setActiveMenu] = useState('main'); //main menu, can be profile, settings, etc.
    const [menuHeight, setMenuHeight] = useState('null');

    
const makePayment = token =>{
    const body = {
        token,
        cart
    }
    const headers = {
        "Content-Type": "application/json"
    }
    
    return fetch(`http://localhost:8282/checkout`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    }).then(response=> {
        console.log("RESPONSE", response)
        const{ status } = response
        console.log("STATUS", status)
    })
    .catch(error=> console.log(error))


}

    function calcHeight(el){
        const height= el.offsetHeight+16;
        setMenuHeight(height);
    }
    function DropdownItem(props){
        function clickHandle(e){
            e.preventDefault();
            props.goToMenu && setActiveMenu(props.goToMenu)
        }
        return( <a href='/' className='menu-item' onClick={clickHandle}>
            <span className='icon-button'>{props.leftIcon}</span>

            {props.children}

            <span className='icon-right'>{props.rightIcon}</span>
        </a>
        );
    }
     function DropdownItemProfile(props){
       
        return( <a href='/account' className='menu-item' onClick={<Link to="/account"/>}>
            <span className='icon-button'>{props.leftIcon}</span>

            {props.children}

            <span className='icon-right'>{props.rightIcon}</span>
        </a>
        );
    }
    return(
        <div className='dropdown' style={{height: menuHeight}}>
          <CSSTransition in={activeMenu === 'main'}
           unmountOnExit
           timeout={500}
           classNames='menu-primary'
           onEnter={calcHeight}
           >
            <div className='menu'>
            <DropdownItemProfile leftIcon={<PersonIcon /> }>
                <div>My Profile</div>
            </DropdownItemProfile>
            <DropdownItem
            leftIcon={<ShoppingCartIcon />}
            rightIcon={<ChevronRightIcon />}
            goToMenu='cart'> Cart
                
            </DropdownItem>
            <DropdownItem leftIcon={<AttachMoneyIcon/>}>
                <StripeCheckout
                shippingAddress
                billingAddress
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={makePayment}
                name="JWCusine"
                amount = {totalPrice * 100}
                />
            </DropdownItem>
            </div>
          </CSSTransition>

          <CSSTransition in={activeMenu === 'cart'}
           unmountOnExit
           timeout={500}
           classNames='menu-secondary'
           onEnter={calcHeight}
           >
            <div className='menu'>
               
            <DropdownItem leftIcon={<ChevronLeftIcon />} goToMenu='main'>Back</DropdownItem>
    <DropdownItem leftIcon={<ShoppingBasket/>} rightIcon = {<ChevronRightIcon/>}goToMenu='cartItems'>Items in cart </DropdownItem>
    <DropdownItem leftIcon={<ShoppingBasket/>}>Checkout price: {totalPrice}</DropdownItem>
    <DropdownItem leftIcon={<ShoppingBasket/>}>Total items: {cart.length}</DropdownItem>

            </div>
          </CSSTransition>
          <CSSTransition in={activeMenu === 'cartItems'}
           unmountOnExit
           timeout={500}
           classNames='menu-secondary'
           onEnter={calcHeight}
           >
                <div className = 'menu'>
    <DropdownItem leftIcon={<ChevronLeftIcon/>} goToMenu='cart'>Back</DropdownItem>
                        {cart.map(item => (
                            <DropdownItem leftIcon={<ShoppingBasket/>}>{item.name}</DropdownItem>
                        ))}
                </div>   
           </CSSTransition>
        </div>
    );
}
export default NavigationBar;

