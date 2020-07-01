import React from 'react';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import TodoList from './components/TodoList';
import { isSignedIn } from './context';


export default class Home extends React.Component {
  render() {
    if (!isSignedIn()) {
      return (
        <Redirect to="/signin" />
      )
    }
    return (
      <Layout>
        <MainHeader isSignedIn={isSignedIn()} />
        <Layout.Content className="site-layout">
          <div className="site-layout-content" style={{ marginTop: 64 }}>
            <TodoList />
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}