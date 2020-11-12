import React, { Component } from 'react';
import './Product.css';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';

class Product extends Component {

    render() {

        return (
            <div className="product-content">
                <div className="product-header">
                    <div className="product-creator-info">
                        <Link className="creator-link" to={`/products/${this.props.product.name}`}>
                            <Avatar className="product-creator-avatar"
                                    style={{ backgroundColor: getAvatarColor(this.props.product.name)}} >
                                {this.props.product.name.toUpperCase()}
                            </Avatar>
                        </Link>
                    </div>
                </div>
                <div className="product-question">
                    {this.props.product.description}
                    <div className="product-question">
                    </div>
                    {this.props.product.usedMaterial}
                </div>
                <div className="product-question">
                    {this.props.product.price}
                </div>
                <div className="product-question">
                    {this.props.product.availableUnits}
                </div>
            </div>
        );
    }
}

export default Product;