import React from 'react';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import SignUpForm from './components/SignUp';
import { isSignedIn } from './context';


export default class SignUp extends React.Component {
  render() {
    if (isSignedIn()) {
      return (<Redirect to="/" />);
    }
    return (
      <Layout>
        <MainHeader isSignedIn={isSignedIn()} />
        <Layout.Content className="site-layout" >
          <div className="site-layout-content" style={{ marginTop: 64 }}>
            <SignUpForm />
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}