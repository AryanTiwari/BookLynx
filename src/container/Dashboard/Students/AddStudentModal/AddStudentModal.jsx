import React from 'react';
import { Input, InputNumber, Form, Modal } from 'antd';

class AddStudentModal extends React.Component { 

// Validate fields before submitting to main function
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

    {/* Add Student Modal */}
        <Modal
          onCancel={this.props.onCancel}
          onOk={this._handleSubmit}
          okText='Add Student'
          title='Add Student'
          visible={visible}
          width={300}
        >

      {/* Input Student's Name */}
        <p> Input the student's name: </p>
        <Form>
          <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, 
                      message: "Enter the student's name" }],
          })(
            <Input
              style={{ width:150 }}
            />
          )}
          </Form.Item>
          <Form.Item>
      {/* Input Student's Grade */}
            <p> Input the student's grade: </p>  
            {getFieldDecorator('grade', {
              rules: [{ required: true, 
                        message: "Enter the student's grade"  }],
            })(
              <InputNumber min={1} max={12}
               style={{ width: 50 }} />
            )}
          </Form.Item>
        </Form> 
        </Modal>
      </div>
    );
  }
}

const AddStudentForm = Form.create()(AddStudentModal);
export default AddStudentForm;