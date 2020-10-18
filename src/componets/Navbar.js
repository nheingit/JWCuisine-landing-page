import React from 'react';

export default function NavigationBar(){
    return(
        <NavBar>
            <NavItem icon ='😊'/>
            <NavItem icon ='😊'/>
            <NavItem icon ='😊'/>
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
    return(
        <li className='nav-item'>
            <a href='#' className='icon-button'>
                {props.icon}
            </a>
        </li>
    );
}

