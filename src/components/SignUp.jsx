import React from 'react';
import { Form, Input, Button } from 'antd';
import { Redirect, Link } from 'react-router-dom';

import * as utils from './../utils';
import { signedIn } from "../context";
import { mutationSignUp } from './../action';


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5 },
};


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      redirect: ''
    };

    this.onFinish = this.onFinish.bind(this);
  }
  onFinish(values) {
    mutationSignUp(
      values.username,
      values.password
    ).then(res => {
      if (!res.data.signUp.success) {
        utils.showMessage('error', "The Username '" + values.username + "' is not avalible.");
      } else {
        signedIn(values.username, res.data.signUp.token);
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
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect} />);
    }
    return (
      <Form
        {...layout}
        name="signUpForm"
        initialValues={{ remember: true }}
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

        <Form.Item
          label="Confirm Password"
          name="rePassword"
          rules={[
            { required: true, message: 'Please input your password again!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Create Account
          </Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button>
            <Link to="signin">Already Had Account</Link>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}