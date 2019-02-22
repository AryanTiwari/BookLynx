import React from 'react';
import { Form, Input, Button} from 'antd';

import { auth } from '../firebase';
import styles from './styles';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

// Validate fields then create an account using those values
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) { 
        console.log('Received values of form: ', values);
        auth.createUserWithEmailAndPassword(values.email, values.password)
        .then(userProfile => {
          this.props.history.push('/')
        })
      }
    });
  }

// Make password into dots
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ 
      confirmDirty: this.state.confirmDirty || !!value });
  }

// Check if the confirmation password is correct
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

      return (
        <div style={styles.registerBox}>
          <Form onSubmit={this.handleSubmit}>
          {/*Form for email*/}
            <FormItem
              {...formItemLayout}
              label='E-mail'
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', 
                  message: 'The input is not valid E-mail!',
                }, {
                  required: true, 
                  message: 'Please input your E-mail!',
                }],
              })(
                <Input />
              )}
            </FormItem>
          {/*Form for password*/}
            <FormItem
              {...formItemLayout}
              label='Password'
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, 
                  message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type='password' />
              )}
            </FormItem>
          {/*Form for confirming password*/}
            <FormItem
              {...formItemLayout}
              class='input'
              label='Confirm Password:'
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, 
                  message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type='password' 
                       onBlur={this.handleConfirmBlur} 
                       style={{width: 50}}
                />
              )}
            </FormItem>
          {/*Submit button*/}
            <FormItem {...tailFormItemLayout}>
              <Button type='primary' 
                      onClick={this.handleSubmit}>Register</Button>
            </FormItem>
          </Form>
        </div>
      );
    }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;