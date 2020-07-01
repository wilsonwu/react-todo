import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import * as utils from './../utils';
import { signedIn } from '../context';
import { mutationSignIn } from './../action';


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 5 },
};


export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      redirect: ''
    };

    this.onFinish = this.onFinish.bind(this);
  }

  onFinish(values) {
    mutationSignIn(
      values.username,
      values.password
    ).then(res => {
      console.log(res)
      if (!res.data.signIn.success) {
        utils.showMessage('error', "Wrong Username and/or Password.");
      } else {
        signedIn(values.username, res.data.signIn.token);
        this.setState({
          ...this.state,
          redirect: '/'
        });
      }
    });
  }

  onFinishFailed(errorInfo) {
    utils.showOopsMessage();
    console.log('Failed:', errorInfo);
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect} />);
    }
    return (
      <Form
        {...layout}
        name="signInForm"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button>
            <Link to="signup">Create New Account</Link>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}