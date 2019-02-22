import React from 'react';
import { Button, Form, Icon, Input, } from 'antd';

import { auth } from '../firebase';
import './LoginPage.css';
import styles from './styles';
import { withRouter } from 'react-router-dom';

const FormItem = Form.Item;

// Normal login form class
class LoginForm extends React.Component {

  // Login function
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      // If its valid
      if (!err) {
        auth.signInWithEmailAndPassword(values.email, values.password)
        .then(user => {
          this.props.history.push('/data')
        })  
        .catch(function(error) {
          console.log(error);
        });
      }
    });
  }
  
  // Function for presssing register
  registerSubmit = () => {
    this.props.history.push('/register')
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (

    // White Box
      <div style={styles.whiteBox}>

        {/* Login Form */} 
        <Form onSubmit={this.handleSubmit} className="login-form">

          {/* Email Input */}
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please enter your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Email" />
            )}
          </FormItem>

          {/* Password Input */}
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>

          {/* Log In Button */}
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <div></div>

            {/* Forgot Password */}
            <a> Forgot password </a> 
            &nbsp; Or &nbsp;
            {/* Register Now */}
            <a style={{width: 100, textAlign: 'center'}} onClick={this.registerSubmit}> Register now! </a>

          </FormItem>
        </Form>

      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(withRouter(LoginForm));
export default WrappedLoginForm;