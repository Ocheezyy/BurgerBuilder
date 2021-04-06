import React from "react";
import "./Input.css";

const input = (props) => {
    let inputElement = null;

    switch (props.inputtype) {
        case ('input'):
            inputElement = (<input
                className="InputElement"
                placeholder={props.elementConfig.placeholder}
                {...props} />)
            break;
        case ('textarea'):
            inputElement =(<textarea
                className="InputElement"
                placeholder={props.elementConfig.placeholder}
                {...props} />)
            break;
        case ('select'):
            inputElement = (
                <select
                    className="InputElement"
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (<input
                className="InputElement"
                placeholder={props.elementConfig.placeholder}
                {...props} />)
            break;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;