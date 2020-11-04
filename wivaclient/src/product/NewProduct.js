import React, {Component} from "react";
import { createProduct } from '../util/APIUtils';
import { PRODUCT_NAME_MAX_LENGTH } from '../constants';
import './NewProduct.css';
import { Form, Input, Button, Select, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: {
                text: ''
            },
            description: {
                text: ''
            },
            usedMaterial: {
                text: ''
            },
            availableUnits: {
                amount: ''
            },
            price: {
                price: ''
            }
        };
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleUsedMaterialChange = this.handleUsedMaterialChange.bind(this);
        this.handleAvailableUnitsChange = this.handleAvailableUnitsChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateProductName = (productName) => {
        if(productName.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a name'
            }
        } else if(productName.length > PRODUCT_NAME_MAX_LENGTH) {
            return{
                validateStatus: 'error',
                errorMsg: `Name too long (Maximum of ${PRODUCT_NAME_MAX_LENGTH} characters allowed`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }
    handleProductNameChange(event) {
        const value = event.target.value;
        this.setState({
            productName: {
                text: value,
                ...this.validateProductName(value)
            }
        })
    }
    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({
            description: {
                text: value,
            }
        })
    }
    handleUsedMaterialChange(event) {
        const value = event.target.value;
        this.setState({
            usedMaterial: {
                text: value,
            }
        })
    }
    validateAvailableUnits = (amount) => {
        if(isNaN(amount)){
            return{
                validateStatus: 'error',
                errorMsg: 'Please enter an amount'
            }
        } else if(amount < 0) {
            return{
                validateStatus: 'error',
                errorMsg: 'Please enter an amount of 0 or higher'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }
    // Twee maal setState moeten doen anders krijg ik een white screen :S
    handleAvailableUnitsChange(value) {
        this.setState({
            availableUnits: {
                amount: value,
                ...this.validateAvailableUnits(value)
            }
        })
    }
    validatePrice = (price) => {
        if(isNaN(price)){
            return{
                validateStatus: 'error',
                errorMsg: 'Please enter an amount'
            }
        } else if(price < 0) {
            return{
                validateStatus: 'error',
                errorMsg: 'Please enter an amount of 0 or higher'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }
    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({
            price: {
                price: value,
                ...this.validatePrice(value)
            }
        })
    }
    isFormInvalid() {
        if(this.state.productName.validateStatus !== 'success') {
            return true;
        }
        else if(this.state.availableUnits.validateStatus !== 'success') {
            return true;
        }
        else if(this.state.price.validateStatus !== 'success') {
            return true;
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const productData = {
            name: this.state.productName.text,
            description: this.state.description.text,
            usedMaterial: this.state.usedMaterial.text,
            availableUnits: this.state.availableUnits.amount,
            price: this.state.price.price,
        };

        createProduct(productData)
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login add product.');
            } else {
                notification.error({
                    message: 'WiVa Webshop',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }
    render() {
        return (
            <div className="new-product-container">
                <h1 className="page-title">Add Product</h1>
                <div className="new-product-content">
                    <Form onSubmit={this.handleSubmit} className="create-product-form">
                        <FormItem validateStatus={this.state.productName.validateStatus}
                                  help={this.state.productName.errorMsg} className="product-form-row">
                            <Input
                                placeholder="Enter the name of the product"
                                style = {{ fontSize: '16px' }}
                                name = "name"
                                value = {this.state.productName.text}
                                onChange = {this.handleProductNameChange} />
                        </FormItem>
                        <FormItem className="product-form-row">
                            <TextArea
                                placeholder="Enter a short description of the product"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 4 }}
                                name = "description"
                                value = {this.state.description.text}
                                onChange = {this.handleDescriptionChange} />
                        </FormItem>
                        <FormItem className="product-form-row">
                            <TextArea
                                placeholder="What materials are used for this product?"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 2, maxRows: 4 }}
                                name = "used materials"
                                value = {this.state.usedMaterial.text}
                                onChange = {this.handleUsedMaterialChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.availableUnits.validateStatus}
                                  help={this.state.availableUnits.errorMsg} className="product-form-row">
                            <span style = {{ marginRight: '18px' }}>
                                Available for sale: &nbsp;
                                <Select
                                    name="AmountAvailable"
                                    onChange={this.handleAvailableUnitsChange}
                                    value={this.state.availableUnits.amount}
                                    style={{ width: 90 }} >
                                    {
                                        Array.from(Array(21).keys()).map(i =>
                                            <Option key={i}>{i}</Option>
                                        )
                                    }
                                </Select> &nbsp;Units
                            </span>
                        </FormItem>
                        <FormItem validateStatus={this.state.price.validateStatus}
                                  help={this.state.price.errorMsg} className="product-form-row">
                            <Input
                                placeholder="Price?"
                                style = {{ fontSize: '16px' }}
                                name = "Price"
                                value = {this.state.price.price}
                                onChange = {this.handlePriceChange} />
                        </FormItem>
                        <FormItem className="product-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-product-form-button">Add Product</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewProduct;