import React from 'react';
import { Input, InputNumber, Form, Modal } from 'antd';

class EditStudentModal extends React.Component {
  
// Check inputs before submitting 
  _handleSubmit = (e) => {
    this.props.form.validateFields((err, values) => { 
      if (!err) {
        this.props.onSubmit(values); 
        this.props.form.resetFields();
      }
    })
  }

// Render 
  render() {
  // Setting consts
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    // Return
    return (
      <div>
    {/* Edit Student Modal */}
        <Modal
          title='Edit Student'
          visible={visible}
          onOk={this._handleSubmit}
          onCancel={this.props.onCancel}
          width={230}
          okText='Save'
        >

      {/* Input Student's Name */}
        <Form>
        <p> Input the student's name: </p>
          <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, 
                      message: 'Enter the new name'}],
            initialValue: this.props.studentName
          })(
            <Input
              style={{ width:100 }}
            />
          )}
          </Form.Item>
      {/* Input Student's Grade */}
        <p> Input the student's grade: </p>
          <Form.Item>
          {getFieldDecorator('grade', {
            rules: [{ required: true, 
                      message: 'Enter the new grade'}],
            initialValue: this.props.studentGrade
          })(
            <InputNumber
              min={1}
              max={12}
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

// Make modal into form
const EditStudentForm = Form.create()(EditStudentModal);
export default EditStudentForm;