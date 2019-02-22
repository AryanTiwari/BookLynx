import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

class ClassDropdown extends React.Component {
  render() {

    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a>Class 1</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a>Class 2</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className='classes-dropdown'>
            Class <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    )
  }
}

export default ClassDropdown;