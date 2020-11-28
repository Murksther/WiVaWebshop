import React, { Component } from 'react';
import './ProductSummary.css';
import {Row, Image, Col, Select, } from 'antd';

const Option = Select.Option;

class Product extends Component {

    changeAmountInCart = (value) => {
        this.props.handleChangeAmountInCart(value, this.props.product);
    }

    render() {
        const totalPrice= this.props.product.price * this.props.product.amountInCart

        return (
            <Row>
                <Col span ={8}>
                    <div className="image-container">
                       <Image className="image" key={this.props.product.id + '-' + 0} src={this.props.product.images[0]} height={70} width={70} />
                    </div>
                </Col>
                <Col span={16}>
                    <div className="title-container">
                        {this.props.product.name}
                    </div>
                    <Row>
                        <Col span={6}>
                            <div className="price-container">
                                Prijs: {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(this.props.product.price)}
                            </div>
                        </Col>
                        <Col span={4}>
                            <Select
                                name="amountOfUnits"
                                onChange={this.changeAmountInCart}
                                value={this.props.product.amountInCart}
                                style={{ width: 60 }} >
                                {
                                    Array.from(Array(this.props.product.availableUnits + 1).keys()).map(i =>
                                        <Option key={i}>{i}</Option>
                                    )
                                }
                            </Select> &nbsp;stuks
                        </Col>
                        <Col span={6}>
                            <div className="total-price-container">
                                Totaal prijs: {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(totalPrice)}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Product;