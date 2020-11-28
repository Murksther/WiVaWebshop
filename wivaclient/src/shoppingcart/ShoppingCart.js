import React, { Component } from 'react';
import ProductSummary from "./ProductSummary";
import './ShoppingCart.css'

class ShoppingCart extends Component {

    render() {
        const productViews = [];
        let totalOrderPrice = 0;
        this.props.shoppingCart.products.forEach((product) => {
            totalOrderPrice += (product.price * product.amountInCart);
            productViews.push(<ProductSummary
                key={product.id}
                product={product}
                handleChangeAmountInCart ={this.props.handleChangeAmountInCart}/>)
        });

        return (
            <div className="shopping-cart">
                {productViews}
                {
                    this.props.shoppingCart.products.length > 0 ? (
                            <div className="totals-cart">
                                Prijs totale bestelling: {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(totalOrderPrice)}
                            </div>

                    ): null
                }
                {
                    this.props.shoppingCart.products.length === 0 ? (
                        <div className="no-products-found">
                            <span>Je Winkelwagen is helemaal leeg :'( </span>
                        </div>
                    ): null
                }
            </div>

        );
    }
}

export default ShoppingCart;