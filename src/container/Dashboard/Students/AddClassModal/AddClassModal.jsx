import React from 'react';
import { Button, Form, Input, Modal } from 'antd';

class AddClassModal extends React.Component {
  state = { visible: false }

  _handleSubmit = (e) => {
    this.props.form.validateFields((err, values) => { 
      if (!err) {
        this.props.onSubmit(values); 
        this.props.form.resetFields();
      }
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    return(
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Class
        </Button>
        <Modal
          title='Add Class'
          visible={this.state.visible}
          onOk={this._handleSubmit}
          onCancel={this.handleCancel}
          width={250}
        >
        <Form>
          <Form.Item>
            {getFieldDecorator('className', {
              rules: [{ required: true, 
                        message: 'Enter the class name' }],
            })(
              <Input
                style={{ width:150 }}
              />
            )}
          </Form.Item>
        </Form>
        </Modal>
      </div>
    )
  }
}

const AddClassForm = Form.create()(AddClassModal);
export default AddClassForm;