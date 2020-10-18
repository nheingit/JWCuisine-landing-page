import React, {useState} from 'react';
import '../index.css'
/*{this is the format how to to import svg files as react componets
import { ReactComponet as SvgIcon} from  './youriconfolder/yourpicture.svg';
}*/
import {CSSTransition} from 'react-transition-group';

function NavigationBar(){
    return(
        <NavBar>
            <NavItem icon ='😊'/>
            <NavItem icon ='😊'/>
            <NavItem icon ='drop'>
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
    const [activeMenu, setActiveMenu] = useState('main'); //main menu, can be profile, settings, etc.
    const [menuHeight, setMenuHeight] = useState('null');

    function calcHeight(el){
        const height= el.offsetHeight;
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
               
            <DropdownItem>
                myProfile
            </DropdownItem>
            <DropdownItem
            leftIcon='leftIcon'
            rightIcon='rightIcon'
            goToMenu='settings'> settings
                
            </DropdownItem>
            </div>
          </CSSTransition>

          <CSSTransition in={activeMenu === 'settings'}
           unmountOnExit
           timeout={500}
           classNames='menu-secondary'
           onEnter={calcHeight}
           >
            <div className='menu'>
               
            <DropdownItem leftIcon='leftIcon' goToMenu='main'/>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            </div>
          </CSSTransition>
        </div>
    );
}
export default NavigationBar;

