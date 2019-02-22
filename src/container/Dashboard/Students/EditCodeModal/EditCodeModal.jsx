import React from 'react';
import { Input, Form, Modal } from 'antd';

class EditCodeModal extends React.Component {
  
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
    {/* Edit Code Modal */}
        <Modal
          title='Edit Code'
          visible={visible}
          onOk={this._handleSubmit}
          onCancel={this.props.onCancel}
          width={230}
          okText='Save'
        >

      {/* Input Book's Title */}
        <p> Input the new redemption code: </p>
        <Form>
          <Form.Item>
          {getFieldDecorator('code', {
            rules: [{ required: true, message: 'Enter the new code'}],
          })(
            <Input
              style={{ width:100 }}
            />
          )}
          </Form.Item>
        </Form> 
        </Modal>
      </div>
    )
  }
}

const EditCodeForm = Form.create()(EditCodeModal);
export default EditCodeForm;