import React from 'react';
import { Layout, Menu } from 'antd';
import { Redirect } from 'react-router-dom';

import { signOff, getUsername } from '../context';


export default class MainHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      redirect: ''
    };
  }

  onClickSignOff() {
    signOff();
    this.setState({
      redirect: '/'
    });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect} />);
    }
    return (
      <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">
          {this.props.isSignedIn ? (
            <span>Welcome {getUsername()}</span>
          ) : (
              <span>Interview Todo System</span>
            )}
        </div>
        {this.props.isSignedIn ? (
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="3" style={{ float: 'right' }} onClick={() => this.onClickSignOff()}>Sign Off</Menu.Item>
          </Menu>
        ) : (
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1" style={{ float: 'right' }}><a href="#/signin">Sign In</a></Menu.Item>
            <Menu.Item key="2" style={{ float: 'right' }}><a href="#/signup">Sign Up</a></Menu.Item>
          </Menu>
        )}
      </Layout.Header>
    );
  }
}