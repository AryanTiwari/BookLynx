import React from 'react';
import { Input, Form, Modal } from 'antd';

class AddBookModal extends React.Component {

  _handleSubmit = (e) => {
    this.props.form.validateFields((err, values) => { 
      if (!err) {
        this.props.onSubmit(values); 
        this.props.form.resetFields();
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    return (
      <div>
    {/* Add Book Modal */}
        <Modal
          title='Add Book'
          visible={visible}
          onOk={this._handleSubmit}
          onCancel={this.props.onCancel}
          width={280}
          okText='Add Book'
        >

      {/* Input Book's Title */}
        <p> Input the book's title: </p>
        <Form>
          <Form.Item>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: "Enter the book's title" }],
          })(
            <Input
              style={{ width:100 }}
            />
          )}
          </Form.Item>
          <Form.Item>
          {/* Input Book's Redemption Code */}
          <p> Input the book's redemption code: </p>  
          {getFieldDecorator('redemptionCode', {
            rules: [{ required: true, message: "Enter the book's redemption code" }],
          })(
            <Input
             style={{ width: 100 }} />
          )}
          </Form.Item>
        </Form> 
        </Modal>
      </div>
    )
  }
}

const AddBookForm = Form.create()(AddBookModal); 
export default AddBookForm;