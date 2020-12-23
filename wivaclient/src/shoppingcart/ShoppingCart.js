import React, { Component } from 'react';
import ProductSummary from "./ProductSummary";
import {Button, notification, Switch} from 'antd';
import './ShoppingCart.css'
import {placeOrder} from "../util/APIUtils";

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInCart: this.calculateValueInCart(),
            deliveryCost: 0,
            delivery: false,
        }
    }

    handleDeliveryChange = (value) => {
        let calculatedCosts = 0
        if (value) {
            calculatedCosts = 50
        }
        this.setState({
            delivery: value,
            deliveryCost: calculatedCosts
        })
    }

    calculateValueInCart = () => {
        let value = 0;
        this.props.shoppingCart.products.forEach((product) => {
            value += (product.price * product.amountInCart)
        })
        return value
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const value = this.calculateValueInCart();
        if (prevState.valueInCart !== value) {
            this.setState({valueInCart: value})
        }
    }
    isOrderInvalid = () => {
        if (this.state.delivery){
            if (this.props.address.houseNumber === "" || this.props.address.postalCode === ""){
                return true
            }
        }
        else return false
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const orderData = {
            typeOfTransfer: this.state.delivery ? "DELIVERY" : "PICKUP",
            address: this.props.address,
            orderedProductSummary: this.props.shoppingCart.products.map(product => {
                return {
                    productId: product.id,
                    amountOrdered: product.amountInCart
                }
            }),
            pollLength: this.state.pollLength
        };
        console.log(JSON.stringify(orderData))
        placeOrder(orderData)
            .then(response => {
                window.location.replace(response.message);
            }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');
            } else {
                notification.error({
                    message: 'WiVa App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }

    render() {
        const productViews = [];
        this.props.shoppingCart.products.forEach((product) => {
            productViews.push(<ProductSummary
                key={product.id}
                product={product}
                disabled={false}
                handleChangeAmountInCart={this.props.handleChangeAmountInCart}/>)
        });

        return (
            this.props.shoppingCart.products.length > 0 ? (
                    <div className="shopping-cart">
                        <h1>Je huidige winkelwagen</h1>
                        {productViews}
                        <div className="delivery-costs">
                            <Switch checkedChildren="Bezorgen"
                                    unCheckedChildren="Afhalen"
                                    checked={this.state.delivery}
                                    onChange={this.handleDeliveryChange}
                                    className="delivery-switch"
                            />
                            Verzendkosten: {new Intl.NumberFormat('nl-NL', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(this.state.deliveryCost)}
                        </div>
                        <div className="totals-cart">
                            Prijs totale bestelling: {new Intl.NumberFormat('nl-NL', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(this.state.valueInCart + this.state.deliveryCost)}
                        </div>
                        {this.state.delivery ? (
                            <div className="delivery-info"> {
                                this.props.address.houseNumber !== "" && this.props.address.postalCode !== "" ? (
                                    <div className="address-summary">
                                        <h2>Leveringsadres: </h2>
                                        <div className="address-line">
                                            {this.props.currentUser.name} <br/>
                                            {this.props.address.streetName} {this.props.address.houseNumber}{this.props.address.suffix}
                                            <br/>
                                            {this.props.address.postalCode} {this.props.address.city}
                                        </div>
                                    </div>
                                ) :
                                <div className="no-address-line">
                                    We hebben helaas geen adres van je. <br/>
                                    Vul deze aan in je profiel of kies ervoor om het product gezellig bij ons op te halen.
                                </div>}
                            </div>
                        ) :
                        <div className="address-summary">
                            <h2>Contactgegevens voor afhaalafspraak: </h2>
                            <div className="address-line">
                                E-mail: {this.props.currentUser.email}
                            </div>
                        </div>}
                        <Button type="primary"
                                htmlType="submit"
                                size="large"
                                onClick={this.handleSubmit}
                                disabled={this.isOrderInvalid()}
                                className="place-order-button">Plaats bestelling</Button>
                    </div>) :
                <div className="no-products-found">
                    <span>Je Winkelwagen is helemaal leeg :'( </span>
                </div>
        );
    }
}

export default ShoppingCart;