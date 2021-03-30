import React, {Component} from "react";

import Auxiliary from "../../../hoc/Auxilary";
import Btn from "../../UI/Button/Button";

class OrderSummary  extends Component {

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (this.props.ingredients[igKey] !== 0 ? <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}: </span>{this.props.ingredients[igKey]}x
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
                <p>Total Price: <strong>${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Btn btnType="Danger" clicked={this.props.cancelled}>CANCEL</Btn>
                <Btn btnType="Success" clicked={this.props.continued}>Continue</Btn>
            </Auxiliary>
        );
    }
}

export default OrderSummary;