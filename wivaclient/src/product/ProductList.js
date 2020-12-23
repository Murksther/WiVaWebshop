import React, { Component } from 'react';
import {getAllProducts} from '../util/APIUtils';
import Product from './Product';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button } from 'antd';
import { LoadingOutlined} from '@ant-design/icons';
import { PRODUCT_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import './ProductList.css';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
    }

    loadProductList = (page = 0, size = PRODUCT_LIST_SIZE) => {
        let promise = getAllProducts(page, size);

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                const products = this.state.products.slice();

                this.setState({
                    products: products.concat(response.content),
                    page: response.page,
                    size: response.size,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last,
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadProductList();
    }
    // To-Do: Kan weg?
    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                products: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadProductList();
        }
    }

    handleLoadMore = () => {
        this.loadProductList(this.state.page + 1);
    }


    render() {
        const productViews = [];
        this.state.products.forEach((product) => {
            let amountInCart =0;
            if(this.props.shoppingCart.products.find(({id}) => id === product.id)){
                amountInCart = this.props.shoppingCart.products.find(({id}) => id === product.id).amountInCart
            }
            productViews.push(<Product
                key={product.id}
                product={product}
                handleAddToCart={this.props.handleAddToCart}
                amountInCart={amountInCart}/>)
        });

        return (
            <div className="product-container">
                {productViews}
                {
                    !this.state.isLoading && this.state.products.length === 0 ? (
                        <div className="no-products-found">
                            <span>No Products Found.</span>
                        </div>
                    ): null
                }
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-products">
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <LoadingOutlined /> Load more
                            </Button>
                        </div>): null
                }
                {
                    this.state.isLoading ?
                        <LoadingIndicator />: null
                }
            </div>
        );
    }
}

export default withRouter(ProductList);