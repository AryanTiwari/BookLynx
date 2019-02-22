import React from 'react';
import { Icon, Popconfirm, Table,  } from 'antd';

class StudentBooksTable extends React.Component {
  render() {
    const expandedRowRender = student => {
      // Columns for book rows
      const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Redemption Code', dataIndex: 'redemptionCode', 
          key: 'Redemption Code' },
        // Edit redemption code button
        {
          dataIndex: 'redemptionCode',
          key: 'editCode',
          render: redemptionCode => <a onClick={() => this.props.onEditCodeClick(student, redemptionCode)}>Edit Code</a>,
        },
        // Remove book button
        {
          dataIndex: 'redemptionCode',
          key: 'removeBook',
          render: code =>   
            <Popconfirm 
              title="Delete this book?"  
              okText="Yes" 
              cancelText="No"
              icon={<Icon type="question-circle-o" 
                style={{ color: 'red' }}
              />}
              onConfirm={() => this.props.onRemoveBookClick(student, code)}
            >
              <a style={{color: 'red'}}>Remove Book</a>
            </Popconfirm>
        }
      ];

      return (
        <Table
          columns={columns}
          dataSource={student.booksOwned}
          pagination={false}
        />
      );
    };

    // Columns for student rows
    const columns = [
      { title: 'Student Name', dataIndex: 'name', key: 'name' },
      { title: 'Grade', dataIndex: 'grade', key: 'grade' },
      // Add book button
      { key: 'addBook', 
        render: student => <a onClick={() => this.props.onAddBookClick(student.id)}>Add Book</a> },
      // Edit student button
      { key: 'editStudent', 
        render: student => <a onClick={() => this.props.onEditStudentClick(student.id)}>Edit Student</a> }
    ];
   
    return (
      <Table
        className='StudentBooksTable'
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={this.props.dataStudents}
      />
    );
  }
}

export default StudentBooksTable;