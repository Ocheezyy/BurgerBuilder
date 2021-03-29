import React from "react";
import burgerLogo from "../../assets/img/burger-logo.png";
import "./Logo.css";

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={burgerLogo} alt="Build-YO-Burger" />
    </div>
);

export default logo;