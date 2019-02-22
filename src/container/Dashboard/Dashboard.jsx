import React from 'react';
import { Layout, Menu } from 'antd';

import firebase from 'firebase';
import { Students } from './Students';

const { Header, Content } = Layout;

class Dashboard extends React.Component {

// Logout function
  _logout = () => {
    firebase.auth().signOut()
    .then(() => {
      this.props.history.push('/');
      console.log("Logged out");
    })
    .catch((error) => {
      console.log(error);
    });
  }

	render() {
		return(
			<Layout className="layout" style={{height: '100vh'}}>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"> Student/Books </Menu.Item>
            <Menu.Item key="2" onClick={this._logout}> Log Out </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Students />
          </div>
        </Content>
      </Layout>
		)
	}
}

export default Dashboard;
