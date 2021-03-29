import React from "react";
import "./NavigationItems.css";

const NavigationItem = (props) => (
    <li className="NavigationItem">
        <a
            href={props.link}
            className={props.active ? "active" : null}
        >{props.linkText}
        </a>
    </li>
);


const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem linkText="Burger Builder" link="/" active />
        <NavigationItem linkText="Checkout" link="/" />
    </ul>
);

export default navigationItems;