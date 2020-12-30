import React, {Component} from 'react';
import './App.css';
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

import {getCurrentUser, getCurrentUserAddress} from '../util/APIUtils'
import { ACCESS_TOKEN} from "../constants";

import Login from "../user/Login";
import Signup from "../user/Signup";
import Profile from "../user/Profile";
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import NewProduct from "../product/NewProduct";

import { Layout, notification } from 'antd';
import ProductList from "../product/ProductList";
import ShoppingCart from "../shoppingcart/ShoppingCart";
import Order from "../order/Order";

const { Content } = Layout;

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            userAddress: {
                streetName: '',
                houseNumber: '',
                suffix: '',
                postalCode: '',
                city: ''
            },
            isAuthenticated: false,
            isLoading: false,
            shoppingCart: {
                totalAmountInCart: 0,
                products: []
            }
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
                this.loadCurrentUserAddress();
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }
    loadCurrentUserAddress = () => {
        if(this.state.currentUser !== null) {
            this.setState({
                isLoading: true
            });
            getCurrentUserAddress()
                .then(response => {
                    this.setState({
                        userAddress: response,
                        isLoading: false
                    });
                }).catch(error => {
                this.setState({
                    isLoading: false
                });
            })
        }
    }

    componentDidMount() {
        this.loadCurrentUser()
    }

    handleOpenProfile = () => {
        this.props.history.push(`/user/me`);
    }

    handleLogout(redirectTo="/", notificationType="success", description="Je bent succesvol uitgelogd.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'WiVa WebShop',
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: 'WiVa WebShop',
            description: "Je bent succesvol ingelogd.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }
    isAdmin = () => {
        if (this.state.isAuthenticated){
            return this.state.currentUser.isAdmin;
        }
        else
            return false;
    }

    addToCart = (product) => {
        let newCart = this.state.shoppingCart;
        const productIndex = newCart.products.findIndex(({id}) => id === product.id);

        if (productIndex !== -1) {
            newCart.products[productIndex].amountInCart++;

        } else {
            product.amountInCart = 1;
        newCart.products.push(product);
        }
        newCart.totalAmountInCart++
        this.setState({shoppingCart: newCart});
        notification.success({
            message: 'WiVa WebShop',
            description: product.name + " aan wagen toegevoegd",
            duration: 1,
        });
    }
    setAmountInCart = (amount, product) => {
        let newCart = this.state.shoppingCart;
        const productIndex = newCart.products.findIndex(({id}) => id === product.id);
        if(amount > 0) {
                newCart.products[productIndex].amountInCart = amount;
        }else {
            const tempCart = [];
            for (let i = 0; i < newCart.products.length; i++) {
                if (i !== productIndex) {
                    tempCart.push(newCart.products[i]);
                }
            }
            newCart.products = tempCart;
        }
        newCart.totalAmountInCart = 0;
        newCart.products.forEach(product =>  newCart.totalAmountInCart += parseInt(product.amountInCart))
        this.setState(state => ({...state, shoppingCart: newCart}));
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />
        }
        return (
            <Layout className="app-container">
                <AppHeader isAuthenticated={this.state.isAuthenticated}
                           currentUser={this.state.currentUser}
                           onLogout={this.handleLogout}
                           openProfile={this.handleOpenProfile}
                           totalInCart ={this.state.shoppingCart.totalAmountInCart}
                />
                <Content className="app-content">
                    <div className="container">
                        <Switch>
                            <Route exact path="/"
                                   render={(props) =>
                                       <ProductList isAuthenticated={this.state.isAuthenticated}
                                                    currentUser={this.state.currentUser}
                                                    handleLogout={this.handleLogout} {...props}
                                                    shoppingCart={this.state.shoppingCart}
                                                    handleAddToCart={this.addToCart}
                                       />}/>
                            <Route path="/ShoppingCart"
                                   render={(props) =>
                                       <ShoppingCart
                                            currentUser={this.state.currentUser}
                                            shoppingCart={this.state.shoppingCart}
                                            address={this.state.userAddress}
                                            handleChangeAmountInCart={this.setAmountInCart}/>}/>
                            <Route path="/orders"
                                   render={(props) => <Order isAuthenticated={this.state.isAuthenticated}
                                                             currentUser={this.state.currentUser}{...props}  />}>
                            </Route>
                            <Route path="/login"
                                render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/user/me"
                                   render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                               currentUser={this.state.currentUser}
                                                               address={this.state.userAddress}
                                                               reloadAddress={this.loadCurrentUserAddress}
                                                               {...props} />}/>
                            <PrivateRoute authenticated={this.state.isAuthenticated}
                                          isAdmin={this.isAdmin}
                                          handleLogout={this.handleLogout}
                                          path="/product/new" component={NewProduct} />
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
