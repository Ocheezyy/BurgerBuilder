import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className="ContactData">
                <h4>Please enter your contact information</h4>
                <form>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" placeholder="John Doe"/>
                    <label htmlFor="email">E-Mail: </label>
                    <input type="text" name="email" placeholder="johndoe1@email.com"/>
                    <label htmlFor="street">Street: </label>
                    <input type="text" name="street" placeholder="123 Home St"/>
                    <label htmlFor="postal-code">Postal Code: </label>
                    <input type="text" name="postal-code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;