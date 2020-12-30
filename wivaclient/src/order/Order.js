import React, { Component } from 'react';
import './Order.css'
import {getOrder} from "../util/APIUtils";
import LoadingIndicator from "../common/LoadingIndicator";
import {formatDateTime} from "../util/Helpers";
import ProductSummary from "../shoppingcart/ProductSummary";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        });
        getOrder(new URLSearchParams(this.props.location.search).get("orderId"))
            .then(response => {
                this.setState({
                    order: response,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />
        }
        const productViews = [];
        if (this.state.order !== null) {
            this.state.order.orderedProducts.forEach((product) => {
                productViews.push(<ProductSummary
                    key={product.id}
                    product={product}
                    disabled={true}
                    handleChangeAmountInCart={null}/>)
            });
        }

        return (
            this.state.order !== null ? (
                    <div className="order-overview">
                        <h1>Bestelling met ordernummer: {this.state.order.id}</h1>
                        <div className="order-summary">
                            Geplaatst op: {formatDateTime(this.state.order.momentOfOrder)} <br/>
                            Door: {this.state.order.customerName} <br/>
                            Status: {this.state.order.orderStatus}
                        </div>
                        <div className="address-summary">
                            <h2>Levering: </h2>
                            <div className="delivery-info"> {
                                this.state.order.typeOfTransfer === "DELIVERY" ? (
                                    <div className="order-delivered">
                                        De bestelling wordt verzonden naar:
                                        {this.state.order.customerName} <br/>
                                        {this.state.order.address.streetName} {this.state.order.address.houseNumber}{this.state.order.address.suffix}
                                        <br/>
                                        {this.state.order.address.postalCode} {this.state.order.address.city}
                                    </div>
                                ) : <div className="order-picked-up">
                                    De bestelling kan worden afgehaald zodra gereed.
                                </div>
                            }
                            </div>
                        </div>
                        <div className="ordered-products">
                            <h2>Bestelde producten: </h2>
                            {productViews}
                            <div className="order-product-costs">
                                Totaal producten: {new Intl.NumberFormat('nl-NL', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(this.state.order.orderPrice)}
                            <div className="order-delivery-costs">
                                Verzendkosten: {new Intl.NumberFormat('nl-NL', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(this.state.order.deliveryCosts)}
                            </div>
                            <div className="order-total-amount">
                                Prijs totale bestelling: {new Intl.NumberFormat('nl-NL', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(this.state.order.orderPrice + this.state.order.deliveryCosts)}
                            </div>
                        </div>
                        </div>
                    </div>) :
                <div className="no-order-found">
                    <span>We hebben geen bestelling kunnen vinden :'( </span>
                </div>
        );
    }
}

export default Order;