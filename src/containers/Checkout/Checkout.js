import React, { Component } from "react";
import { Route } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1]
        }
        this.setState({ ingredients: ingredients })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {

        return (
          <div>
              <CheckoutSummary
                  ingredients={this.state.ingredients}
                  onCheckoutCancelled={this.checkoutCancelledHandler}
                  onCheckoutContinued={this.checkoutContinuedHandler}
              />
              <Route path={this.props.match.url + "/contact-data"} component={ContactData} />
          </div>
        );
    }
}

export default Checkout;