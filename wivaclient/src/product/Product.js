import React, { Component } from 'react';
import './Product.css';
import {Button, Row, Image, Carousel, Col } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons";

class Product extends Component {

    render() {
        const allInCar = this.props.product.availableUnits <= this.props.amountInCart;
        let buttonText = '';
        if(!allInCar){
            buttonText = "Toevoegen";
        } else(buttonText = "Maximaal aantal bereikt")
        const images = [];
        for (const [index] of this.props.product.images.entries()) {
            images.push(<div key={this.props.product.id + '-' + index} className="product-image-container">
                            <Image key={this.props.product.id + '-' + index} src={this.props.product.images[index]} className="product-image"/>
                        </div>)
        }
        const amountAvailable = this.props.product.availableUnits - this.props.amountInCart;

        return (
            <Row className="product-content">
                <Col span ={8} className="product-header">
                    <div>
                        <Carousel autoplay className="product-image-container">
                            {images}
                        </Carousel>
                    </div>
                </Col>
                <Col span={16} className="product-information-column">
                    <div className="product-question">
                        {this.props.product.name}
                    </div>
                    <div className="product-question">
                        Omschrijving:
                        {this.props.product.description.split('\n').map(str => <div key={(this.props.product.id + "-" +str)} >{str}</div>)}
                    </div>
                    <div className="product-question">
                        Gebruikt materiaal:
                        {this.props.product.usedMaterial.split('\n').map(str => <div key={(this.props.product.id + "-" +str)}>{str}</div>)}
                    </div>
                    <div className="product-question">
                        Prijs: {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(this.props.product.price)}
                    </div>
                    <div className="product-question">
                        Aantal beschikbaar: {amountAvailable}
                    </div>
                    <div>
                        <Button type="primary"
                                disabled={allInCar}
                                onClick={() => { this.props.handleAddToCart(this.props.product) }}
                                icon={<ShoppingCartOutlined/>}>
                            {buttonText}
                        </Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Product;