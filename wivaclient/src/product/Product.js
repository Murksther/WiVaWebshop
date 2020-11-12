import React, { Component } from 'react';
import './Product.css';
import { Avatar } from 'antd';
import { getAvatarColor } from '../util/Colors';
import { Row, Col } from 'antd';

class Product extends Component {

    render() {

        return (
            <Row className="product-content">
                <Col span ={8} className="product-header">
                    <div className="product-image">
                        <Avatar className="product-creator-avatar"
                                style={{ backgroundColor: getAvatarColor(this.props.product.name)}} >
                            {this.props.product.name.toUpperCase()}
                        </Avatar>
                    </div>
                </Col>
                <Col span={16}>
                    <div className="product-question">
                        {this.props.product.name}
                    </div>
                    <div className="product-question">
                        Omschrijving:
                        {this.props.product.description.split('\n').map(str => <div>{str}</div>)}
                    </div>
                    <div className="product-question">
                        Gebruikt materiaal:
                        {this.props.product.usedMaterial.split('\n').map(str => <div>{str}</div>)}
                    </div>
                    <div className="product-question">
                        Prijs: € {this.props.product.price}
                    </div>
                    <div className="product-question">
                        Aantal beschikbaar: {this.props.product.availableUnits}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Product;