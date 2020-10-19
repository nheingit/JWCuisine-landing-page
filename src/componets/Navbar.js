import React, {useState, useContext} from 'react';
import '../index.css'
/*{this is the format how to to import svg files as react componets
import { ReactComponet as SvgIcon} from  './youriconfolder/yourpicture.svg';
}*/
import {CSSTransition} from 'react-transition-group';
import SortIcon from "@material-ui/icons/Sort";
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ShoppingBasket } from '@material-ui/icons';
import {CartContext} from './CartContext';
const  NavigationBar= () => {
    return(
        
        <NavBar>
            <NavItem icon ={<SortIcon />}>
                <DropdownMenu></DropdownMenu>
            </NavItem>

        </NavBar>

    );
}

function NavBar(props){
    return (
        <nav className='navbar'>
            <ul className='navbar-nav'>{ props.children }</ul>
        </nav>
    );
}
function NavItem(props){
    const [open, setOpen] = useState(false);
    return(
        <li className='nav-item'>
            <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    );
}
function DropdownMenu(){
    const [cart, setCart] = useContext(CartContext)
    const totalPrice = cart.reduce((acc, curr) => acc+curr.price, 0);
    const DishesInCart = cart.map(item => item.name);
    const [activeMenu, setActiveMenu] = useState('main'); //main menu, can be profile, settings, etc.
    const [menuHeight, setMenuHeight] = useState('null');

    function calcHeight(el){
        const height= el.offsetHeight+16;
        setMenuHeight(height);
    }
    function DropdownItem(props){
        return( <a href='#' className='menu-item' onClick={()=>props.goToMenu && setActiveMenu(props.goToMenu)}>
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
               
            <DropdownItem leftIcon={<PersonIcon />}>
                My Profile
            </DropdownItem>
            <DropdownItem
            leftIcon={<ShoppingCartIcon />}
            rightIcon={<ChevronRightIcon />}
            goToMenu='cart'> Cart
                
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
    <DropdownItem leftIcon={<ShoppingBasket/>}>Items in cart: {DishesInCart}</DropdownItem>
    <DropdownItem leftIcon={<ShoppingBasket/>}>Checkout price: {totalPrice}</DropdownItem>
    <DropdownItem leftIcon={<ShoppingBasket/>}>Total items: {cart.length}</DropdownItem>

            </div>
          </CSSTransition>
        </div>
    );
}
export default NavigationBar;

