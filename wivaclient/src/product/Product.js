import React, { Component } from 'react';
import './Product.css';
import {Row, Image, Carousel, Col } from 'antd';

class Product extends Component {

    render() {
        const images = [];
        for (const [index] of this.props.product.images.entries()) {
            images.push(<div>
                            <Image key={this.props.product.id + '-' + index} src={this.props.product.images[index]} />
                        </div>)
        }

        return (
            <Row className="product-content">
                <Col span ={8} className="product-header">
                    <div className="product-image">
                        <Carousel autoplay>
                            {images}
                        </Carousel>
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
                        Prijs: {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(this.props.product.price)}
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