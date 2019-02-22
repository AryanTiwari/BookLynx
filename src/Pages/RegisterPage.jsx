import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

import RegisterBox from '../components/RegisterBox';

class RegisterPage extends Component {
  render() {
    return (
      <div>
        <div className='logoContainer'>
          <Image src="assets/logo.png" className="logo" />
          <RegisterBox history={this.props.history}/>  
        </div>
      </div>
    )
  }
}

export default RegisterPage;