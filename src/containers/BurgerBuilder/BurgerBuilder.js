import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 0.99,
    bacon: 0.5,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        purchasable: false,
        purchasing: false,
        loading: false,
        totalPrice: 4,
        error: false
    }

    componentDidMount() {
        axios.get("https://burgerbuilder-f77b4-default-rtdb.firebaseio.com/ingredients.json")
            .then(res => this.setState({ ingredients: res.data }))
            .catch(err => { this.setState({ error: true }) });
    }

    updatePurchaseState (newState) {
        const ingredients = {
            ...newState
        };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] - 1;
        if (this.state.ingredients[type] === 0){return}
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("Order Submitted!");
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Sean O'Donnell",
                address: {
                    street: "Test 1 Dr",
                    zipCode: "30144",
                    country: "USA"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false });
                console.log(err);
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        const orderSummary = this.state.ingredients ? (<OrderSummary
            ingredients={this.state.ingredients}
            cancelled={this.purchaseCancelHandler}
            continued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
        />) : null;

        const modalDisplay = this.state.loading ? <Spinner /> : orderSummary;

        let burger = this.state.ingredients ? (<Auxiliary>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordering={this.purchaseHandler}/>
        </Auxiliary>) : <Spinner />;

        if (this.state.error) {
            burger = <p>Ingredients could not be loaded</p>;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {modalDisplay}
                    {/*<OrderSummary*/}
                    {/*    ingredients={this.state.ingredients}*/}
                    {/*    cancelled={this.purchaseCancelHandler}*/}
                    {/*    continued={this.purchaseContinueHandler}*/}
                    {/*    price={this.state.totalPrice}*/}
                    {/*/>*/}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);