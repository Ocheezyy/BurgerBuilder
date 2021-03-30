import React from "react";

import "./DrawerToggle.css";

const drawerToggle = (props) => (
    <div onClick={props.clicked} className="DrawerToggle HideToggle"><i className="fas fa-bars"></i></div>
);

export default drawerToggle;