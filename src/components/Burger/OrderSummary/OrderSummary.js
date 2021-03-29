import React from "react";

import Auxiliary from "../../../hoc/Auxilary";
import Btn from "../../UI/Button/Button";

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (props.ingredients[igKey] !== 0 ? <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}: </span>{props.ingredients[igKey]}x
                    </li> : null
            )
        });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Btn btnType="Danger" clicked={props.cancelled}>CANCEL</Btn>
            <Btn btnType="Success" clicked={props.continued}>Continue</Btn>
        </Auxiliary>
    );
};

export default orderSummary;