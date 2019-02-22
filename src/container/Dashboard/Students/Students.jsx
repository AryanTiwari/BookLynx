import React from 'react';
import { Button } from 'antd';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

import { AddClassModal } from './AddClassModal';
import { AddBookModal } from './AddBookModal';
import { AddStudentModal } from './AddStudentModal';
import { ClassDropdown } from './ClassDropdown';
import { db, auth } from '../../../firebase';
import { EditCodeModal } from './EditCodeModal';
import { EditStudentModal } from './EditStudentModal';
import { StudentBooksTable } from '../../../components/StudentBooksTable';

class Students extends React.Component {

// Start of loading
  constructor(props) {
    super(props)
    this.state = {
      studentId: null,
      studentName: null,
      studentGrade: null,
      dataStudents: [],
      oldCode: 0,
      showAddBookModal: false,
      showAddStudentModal: false,
      showEditCodeModal: false,
      showEditStudentModal: false
    }
  }

// Before mounting component
  componentWillMount() {
    if (!auth.currentUser) {
      this.props.history.push('/')
    }
  }

// When component mounts
  componentDidMount() {
    if (!auth.currentUser) {
      this.props.history.push('/')
    } else {
      this.unsubStudents = 
        db.collection('Classes').doc(auth.currentUser.email)
          .collection('Students').orderBy('name', 'asc')
          .onSnapshot((querySnapshot) => {
              var students = [];
              querySnapshot.forEach((doc) => {
                students.push(doc.data());
              });
              this.setState({ 
                dataStudents: students,
              });
          }, (error) => {
            console.log(error)
          });
      }
    
  }

// When you unmount component
  componentWillUnmount() { 
    if (this.unsubStudents) this.unsubStudents();
  }

// Add Student Methods
  _handleAddStudentCancel = () => {
    this.setState({ showAddStudentModal: false })
  }

  _handleAddStudentClick = () => {
    this.setState({ showAddStudentModal: true })
  }

  _handleAddStudentSubmit = (values) => {
    const docRef = db.collection('Classes').doc(auth.currentUser.email).collection('Students').doc();
    docRef.set({
      name: values.name,
      grade: values.grade,
      id: docRef.id
    })
    .then(docRef => { 
      this.setState({
        visible: false
      })
    })
    .catch(error => {
      console.error("Error adding document: ", error);
    });
  }

// Add Book Methods
  _handleAddBookCancel = () => {
    this.setState({ showAddBookModal: false });
  }

  _handleAddBookClick = student => {
    this.setState({studentId: student})
    this.setState({ showAddBookModal: true })
  }

  _handleAddBookSubmit = values => {
    const docRef = db.collection('Classes').doc(auth.currentUser.email)
      .collection('Students').doc(this.state.studentId); 
    docRef.update({
      booksOwned: firebase.firestore.FieldValue.arrayUnion({
        title: values.title,
        redemptionCode: values.redemptionCode
      })
    })  
    this.setState({ showAddBookModal: false });
  }

// Remove Book Methods
  _handleRemoveBook = async (student, code) => {
    const docRef = 
      db.collection('Classes')
        .doc(auth.currentUser.email)
        .collection('Students')
        .doc(student.id)
    const docSnap = await docRef.get();
    let booksOwned = docSnap.data().booksOwned;
    booksOwned.splice(booksOwned.indexOf(code),1);
    docRef.update({
      booksOwned: booksOwned
    })
  }

// Edit Book Methods
  _handleEditCodeCancel = () => {
    this.setState({ showEditCodeModal: false })
  }

  _handleEditCodeClick = (student, code) => {
    this.setState({ 
      showEditCodeModal: true,
      studentId: student.id,
      oldCode: code
    })
  }

  _handleEditCodeSubmit = async values => {
    const docRef = 
      db.collection('Classes')
        .doc(auth.currentUser.email)
        .collection('Students')
        .doc(this.state.studentId)
    const docSnap = await docRef.get();
    let newBooks = docSnap.data().booksOwned;
    const index = newBooks.findIndex(b => this.state.oldCode === b.redemptionCode);
    newBooks[index].redemptionCode = values.code;
    docRef.update({
      booksOwned: newBooks
    })
    this.setState({ showEditCodeModal: false })
  }

// Edit Student Methods
  _handleEditStudentCancel = () => {
    this.setState({ showEditStudentModal: false })
  }

  _handleEditStudentClick = student => {
    const { dataStudents } = this.state
    let studentName = dataStudents[dataStudents.findIndex(s => student === s.id)].name
    let studentGrade = dataStudents[dataStudents.findIndex(s => student === s.id)].grade
    this.setState({ 
      studentId: student,
      studentName: studentName,
      studentGrade: studentGrade,
      showEditStudentModal: true,
    })
  }

  _handleEditStudentSubmit = async values => {
    const docRef = 
      db.collection('Classes')
        .doc(auth.currentUser.email)
        .collection('Students')
        .doc(this.state.studentId)
    docRef.update({
      name: values.name,
      grade: values.grade
    })
    this.setState({ showEditStudentModal: false })
  }

// Add Class Methods
  _handleAddClass = className => {
    console.log(className);
  }


  render() {
    const { showAddBookModal, showAddStudentModal,  
            showEditCodeModal, showEditStudentModal,
            dataStudents,
          } = this.state;
    return(
      <div>
        <ClassDropdown/>
        <AddClassModal
          onSubmit={this._handleAddClass}
        />
        <StudentBooksTable 
          dataStudents={dataStudents}
          onAddBookClick={this._handleAddBookClick}
          onEditCodeClick={this._handleEditCodeClick}
          onEditStudentClick={this._handleEditStudentClick}
          onRemoveBookClick={this._handleRemoveBook}
        />
        <Button type="primary" onClick={this._handleAddStudentClick}>
          Add Student
        </Button>
        <AddBookModal
          onCancel={this._handleAddBookCancel}
          onClick={this._handleAddBookClick}
          onSubmit={this._handleAddBookSubmit}
          visible={showAddBookModal}
        />
        <AddStudentModal
          studentId={this.state.studentId}
          onCancel={this._handleAddStudentCancel}
          onClick={this._handleAddStudentClick}
          onSubmit={this._handleAddStudentSubmit}
          visible={showAddStudentModal}
        />
        <EditCodeModal
          onCancel={this._handleEditCodeCancel}
          onClick={this._handleEditCodeClick}
          onSubmit={this._handleEditCodeSubmit}
          visible={showEditCodeModal}
        />
        <EditStudentModal
          studentName={this.state.studentName}
          studentGrade={this.state.studentGrade}
          onCancel={this._handleEditStudentCancel}
          onClick={this._handleEditStudentClick}
          onSubmit={this._handleEditStudentSubmit}
          visible={showEditStudentModal}
        />

      </div>
    )
  }
}

export default withRouter(Students);