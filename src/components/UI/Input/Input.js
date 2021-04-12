import React from "react";
import "./Input.css";

const input = (props) => {
    let inputElement = null;
    let inputClasses = ["InputElement"];

    if (props.touched && props.valid && props.shouldvalidate){
        inputClasses.push("Invalid")
    }

    switch (props.inputtype) {
        case ('input'):
            inputElement = (<input
                className={inputClasses.join(' ')}
                placeholder={props.elementconfig.placeholder}
                onChange={props.changed}
                {...props} />)
            break;
        case ('textarea'):
            inputElement =(<textarea
                className={inputClasses.join(' ')}
                placeholder={props.elementconfig.placeholder}
                onChange={props.changed}
                {...props} />)
            break;
        case ('select'):
            inputElement = (
                <select
                    className="InputElement"
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementconfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (<input
                className={inputClasses.join(' ')}
                placeholder={props.elementconfig.placeholder}
                onChange={props.changed}
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