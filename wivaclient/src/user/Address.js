import {Button, Col, Form, Input, Row, notification} from "antd";
import React, {Component} from "react";
import { getAddressAPI, saveAddress } from '../util/APIUtils';
import './Address.css';

const FormItem = Form.Item;

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitButtonText: 'Dit is je huidige adres',
            streetName: this.props.address.streetName,
            houseNumber: {
                input: this.props.address.houseNumber,
            },
            suffix: this.props.address.suffix,
            postalCode: {
                input: this.props.address.postalCode,
            },
            city: this.props.address.city
        }
    }
    handlePostalCodeChange = (event) => {
        const value = event.target.value.toUpperCase();
        this.setState(()=>({
            postalCode: {
                input: value,
                ...this.validatePostalCode(value)
            }
        }), () => {
            if (this.state.postalCode.validateStatus === 'success' && this.state.houseNumber.validateStatus !== 'error'){
                this.fillAddress();
            }
        })
    }

    handleHouseNumberChange = (event) => {
        const value = event.target.value;
        this.setState(()=>({
            houseNumber: {
                input: value,
                ...this.validateHouseNumber(value)
            }
        }), () => {
            if (this.state.houseNumber.validateStatus === 'success' && this.state.postalCode.validateStatus !== 'error'){
                this.fillAddress();
            }
        })

    }
    handleSuffixChange = (event) => {
        const value = event.target.value;
        this.setState(()=>({
            suffix: value,
        }), () => {this.validateAddress()});
    }
    validateHouseNumber(value){
        if(isNaN(value)){
            return{
                validateStatus: 'error',
                errorMsg: `HuisNUMMER`
            }
        }
        else if(value === ''){
            return{
                validateStatus: 'warning'
            }
        }
        else if(value < 1){
            return{
                validateStatus: 'error',
                errorMsg: 'Huisnummer moet positief zijn'
            }
        }
        else {return {validateStatus: 'success'}
        }
    }
    validatePostalCode(value){
        const postalCodeNr = value.slice(0, 4);
        const postalCodeLt = value.slice(-2);
        if(isNaN(postalCodeNr)){
            return{
                validateStatus: 'error',
                errorMsg: 'Eerst vier cijfers'
            }
        }
        if(value.length === 6){
            if(!/[A-Z][A-Z]/.test(postalCodeLt)){
                return{
                    validateStatus: 'error',
                    errorMsg: 'Eindig met twee letters'
                }
            }
            else {
                return{
                    validateStatus: 'success',
                }
            }
        }
        else {return {validateStatus: 'warning'}}
    }

    fillAddress = () =>{
        if (this.props.address.housenumber !== this.state.houseNumber.input || this.props.address.postalCode !== this.state.postalCode.input){
            getAddressAPI(this.state.postalCode.input, this.state.houseNumber.input).then( response => {
                if (response.status === 200){
                    response.json().then(data => {
                        this.setState((state) => ({
                            streetName: data.street,
                            houseNumber: {
                                validateStatus: 'success',
                                ...state.houseNumber
                            },
                            postalCode: {
                                validateStatus: 'success',
                                ...state.postalCode
                            },
                            city: data.city,
                        }), () => {this.validateAddress()});
                    });                       
                }
                else if (response.status === 404){
                    this.setState((state)=>({
                        submitButtonText: 'Geen adres gevonden',
                    }));
                }
                else {
                    notification.error({
                        message: 'WiVa Webshop',
                        description: 'Oeps! Er ging iets fout bij het ophalen van je nieuwe adress. Probeer opnieuw!'
                    });
                    this.setState((state)=>({
                        submitButtonText: 'Error',
                    }))
                }
            }).catch((error) => {
                console.error('Error:', error);
                notification.error({
                    message: 'WiVa Webshop',
                    description: error.message || 'Oeps! Er ging iets fout bij het ophalen van je nieuwe adress. Probeer opnieuw!'
                });
                this.setState((state)=>({
                    submitButtonText: 'Error',
                }))
            });                              
        }
    }
    validateAddress = () => {
        if (parseInt(this.state.houseNumber.input) === this.props.address.houseNumber && this.state.postalCode.input === this.props.address.postalCode &&
            this.state.suffix === this.props.address.suffix){
                this.setState(()=>({
                    submitButtonText: 'Dit is je huidige adres'
                }));
            }
        else{ 
            this.setState(()=>({
            submitButtonText: 'Adres wijzigen' 
            }));
        }
    }

    isNewAddressInvalid = () => {
        if (this.state.submitButtonText === 'Error' || this.state.submitButtonText === 'Geen adres gevonden' || this.state.submitButtonText === 'Dit is je huidige adres'){
            return true;
        }
        else if(this.state.postalCode.validateStatus !== 'success'){
            return true;
        } else if (this.state.houseNumber.validateStatus !== 'success'){
            return true;
        }
        else {
            return false;}         
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const productData = {
            streetName: this.state.streetName,
            houseNumber: this.state.houseNumber.input,
            suffix: this.state.suffix,
            postalCode: this.state.postalCode.input,
            city: this.state.city
        };

        saveAddress(productData)
            .then(response => {
                notification.success({
                    message: 'WiVa Webshop',
                    description: 'Je nieuwe adres is gekoppeld. Lekker shoppen nu!'
                });
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
    }

    render() {
        return(
            <div className="address-container">
                <h1>Adres wijzigen</h1>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Row gutter={[10, 0]} wrap={false}>
                            <Col flex="auto">
                                <FormItem>
                                    Straatnaam: <Input
                                    placeholder="Vult zichzelf :)"
                                    style={{fontSize: '16px'}}
                                    name="streetName"
                                    value={this.state.streetName}
                                    disabled={true}/>
                                </FormItem>
                            </Col>
                            <Col span={4} className="address-housenumber-column">
                                <FormItem 
                                    validateStatus={this.state.houseNumber.validateStatus}
                                    help={this.state.houseNumber.errorMsg}>
                                    Huisnr:
                                    <Input
                                        style={{fontSize: '16px'}}
                                        name="houseNumber"
                                        placeholder="666"
                                        value={this.state.houseNumber.input}
                                        onChange={this.handleHouseNumberChange}/>
                                </FormItem>
                            </Col>
                            <Col span={4} className="address-suffix-column">
                                <FormItem>
                                    Toevoeging:
                                    <Input
                                        style={{fontSize: '16px'}}
                                        name="Suffix"
                                        value={this.state.suffix}
                                        onChange={this.handleSuffixChange}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={[10, 0]} wrap={false}>
                            <Col span={4} className="address-postalcode-column">
                                <FormItem
                                    validateStatus={this.state.postalCode.validateStatus}
                                    help={this.state.postalCode.errorMsg}>
                                    Postcode: 
                                    <Input
                                        placeholder="1234XX"
                                        style={{fontSize: '16px'}}
                                        name="streetName"
                                        value={this.state.postalCode.input}
                                        maxLength={6}
                                        onChange={this.handlePostalCodeChange}/>
                                </FormItem>
                            </Col>
                            <Col flex="auto">
                                <FormItem>
                                    Woonplaats:
                                    <Input
                                        style={{fontSize: '16px'}}
                                        name="city"
                                        placeholder="Zoeken we ook voor je op"
                                        value={this.state.city}
                                        disabled={true}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    onClick={this.handleSubmit}
                                    disabled={this.isNewAddressInvalid()}
                                    className="set-address-form-button">{this.state.submitButtonText}</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Address;