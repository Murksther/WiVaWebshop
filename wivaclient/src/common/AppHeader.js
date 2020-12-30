import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Menu, Layout, Dropdown } from 'antd';
import {
    HomeOutlined,
    PlusCircleOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from "@ant-design/icons";
const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({ key }) {
        if(key === "logout") {
            this.props.onLogout();
        }
        if(key === "profile") {
            this.props.openProfile();
        }
    }

    render() {
        let cartLink = '';
        if (this.props.totalInCart > 0){
            cartLink = "/ShoppingCart"
        } else{
            cartLink = "/"
        }
        let menuItems;
        if(this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <HomeOutlined/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ];
            if(this.props.currentUser.isAdmin){
                menuItems.splice(1,0,
                    <Menu.Item key="/product/new">
                        <Link to="/product/new">
                            <PlusCircleOutlined/>
                        </Link>
                    </Menu.Item>,
                )
            }
        } else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Inloggen</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup">Registeren</Link>
                </Menu.Item>
            ];
        }

        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title" >
                        <Link to="/">WiVa Design</Link>
                    </div>
                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{ lineHeight: '64px' }} >
                        {menuItems}
                        <Menu.Item className="menuItem" key="/ShoppingCart">
                            <Link to={cartLink}>
                                <ShoppingCartOutlined/>
                                <div className="cartInfo">
                                    {this.props.totalInCart}
                                </div>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="profile" className="dropdown-item">Profiel</Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">Uitloggen</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
            <div className="ant-dropdown-link">
                <UserOutlined style={{marginRight: 0}} />
            </div>
        </Dropdown>
    );
}

export default withRouter(AppHeader);