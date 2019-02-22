import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

import LoginBox from '../components/LoginBox';

class LoginPage extends Component {
	render() {
		return (
      <div>
        <div className='logoContainer'>
          <Image src="assets/logo.png" className="logo" />
          <LoginBox history={this.props.history}/>  
        </div>  
      </div>
		) 
	}
}

export default LoginPage;