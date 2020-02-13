import React, {Component} from 'react';
import './App.css';
import { Layout, notification } from 'antd';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Polling App',
            description: description,
        });
    }
    render() {

        return (
          <Layout className='app-container'>
              <AppHeader isAuthenticated={this.state.isAuthenticated}
                         currentUser={this.state.currentUser}
                         onLogout={this.handleLogout} />
          </Layout>
        );
    }
}

export default App;
