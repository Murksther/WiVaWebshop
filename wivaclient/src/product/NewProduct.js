import React, {Component} from "react";
import { createProduct, } from '../util/APIUtils';
import { getBase64 } from '../util/Utils';
import { PRODUCT_NAME_MAX_LENGTH } from '../constants';
import './NewProduct.css';
import { Form, Input, Button, Select, notification } from 'antd';
import { PicturesWall} from './PicturesWall';
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
            },
            fileList: [],
            images: {
                base64List:[]
            },
            loading: false,
        };
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleUsedMaterialChange = this.handleUsedMaterialChange.bind(this);
        this.handleAvailableUnitsChange = this.handleAvailableUnitsChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }
    validateProductName = (productName) => {
        if(productName.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Voer a.u.b. een naam in'
            }
        } else if(productName.length > PRODUCT_NAME_MAX_LENGTH) {
            return{
                validateStatus: 'error',
                errorMsg: `Naam is te lang (Maximaal ${PRODUCT_NAME_MAX_LENGTH} karakters toegestaan`
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
                errorMsg: 'Geef een hoeveelheid aan'
            }
        } else if(amount < 0) {
            return{
                validateStatus: 'error',
                errorMsg: 'Hoeveelheid moet 0 of hoger zijn'
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
                errorMsg: 'Geef een hoeveelheid aan'
            }
        } else if(price < 0) {
            return{
                validateStatus: 'error',
                errorMsg: 'Hoeveelheid moet 0 of hoger zijn'
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
        else if(this.state.images.validateStatus !== 'success') {
            return true;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState(state => ({...state, loading: true})); //TODO kijken waarom state niet wordt geupdate...

        const productData = {
            name: this.state.productName.text,
            description: this.state.description.text,
            usedMaterial: this.state.usedMaterial.text,
            availableUnits: this.state.availableUnits.amount,
            price: this.state.price.price,
            images: this.state.images.base64List
        };

        createProduct(productData)
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'Je bent uitgelogd. Log a.u.b. opnieuw in.');
            } else {
                notification.error({
                    message: 'WiVa Webshop',
                    description: error.message || 'Oeps! Er ging iets fout. Probeer opnieuw!'
                });
            }
        });
        this.setState({loading: false});
    }
    handleFileChange = ({ fileList }) => {this.setState({fileList});
        this.setState({
            images:{
                validateStatus: 'in progress'
            }
        });
        this.setBase64List({fileList});
    }

    async setBase64List({fileList}) {
        let counter;
        let loopAmount = Object.keys(fileList).length;
        let base64List = [];

            for(counter = 0; counter < loopAmount; counter++) {
            const base64String = await getBase64(fileList[counter].originFileObj);
            base64List.push(base64String)

        }
        this.setState({
            images:{
                base64List: base64List,
                validateStatus: 'success'
            }
        });
    }

    render() {
        return (
            <div className="new-product-container">
                <h1 className="page-title">Product toevoegen</h1>
                <div className="new-product-content">
                    <Form onSubmit={this.handleSubmit} className="create-product-form">
                        <FormItem validateStatus={this.state.productName.validateStatus}
                                  help={this.state.productName.errorMsg} className="product-form-row">
                            <Input
                                placeholder="Geef de naam van het product"
                                style = {{ fontSize: '16px' }}
                                name = "name"
                                value = {this.state.productName.text}
                                onChange = {this.handleProductNameChange} />
                        </FormItem>
                        <FormItem className="product-form-row">
                            <TextArea
                                placeholder="Voeg een korte omschrijving van het product toe"
                                style = {{ fontSize: '16px' }}
                                autoSize={{ minRows: 3, maxRows: 4 }}
                                name = "description"
                                value = {this.state.description.text}
                                onChange = {this.handleDescriptionChange} />
                        </FormItem>
                        <FormItem className="product-form-row">
                            <TextArea
                                placeholder="Welke materialen zijn er gebruikt?"
                                style = {{ fontSize: '16px' }}
                                autoSize={{ minRows: 2, maxRows: 4 }}
                                name = "used materials"
                                value = {this.state.usedMaterial.text}
                                onChange = {this.handleUsedMaterialChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.availableUnits.validateStatus}
                                  help={this.state.availableUnits.errorMsg} className="product-form-row">
                            <span style = {{ marginRight: '18px' }}>
                                Aantal beschikbaar voor verkoop: &nbsp;
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
                                </Select> &nbsp;units
                            </span>
                        </FormItem>
                        <FormItem validateStatus={this.state.price.validateStatus}
                                  help={this.state.price.errorMsg} className="product-form-row">
                            <Input
                                placeholder="Prijs?"
                                style = {{ fontSize: '16px' }}
                                name = "Price"
                                value = {this.state.price.price}
                                onChange = {this.handlePriceChange} />
                        </FormItem>
                        <PicturesWall
                            handleChange={this.handleFileChange}
                            fileList = {this.state.fileList}>
                        </PicturesWall>
                        <FormItem className="product-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    onClick={this.handleSubmit}
                                    loading={this.state.loading}
                                    className="create-product-form-button">Product toevoegen</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewProduct;