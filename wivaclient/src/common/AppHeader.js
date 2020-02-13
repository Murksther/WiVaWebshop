import React, { Component } from 'react';
import './AppHeader.css';

import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({ key }) {
        if(key === "logout"){
            this.props.onLogout();
        }
    }


}