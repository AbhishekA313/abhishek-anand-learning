import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { ROUTERS } from './Common/routers';

import './main.scss';

const Header = () => {
    const logout = () => {}

    const items = [
        { key: '0', label: <NavLink to="/login">Log In</NavLink>, icon: <UserOutlined /> },
        { key: '1', label: <NavLink to="/register">Sign Up</NavLink>, icon: <UserOutlined /> },
        { key: '2', label: <NavLink to="/my-account">My Account</NavLink>, icon: <UserOutlined /> },
        { key: '3', label: <span onClick={logout}>Logout</span>, icon: <LogoutOutlined /> }
    ];

    const RenderMenu = () => {
        return <>
            <Dropdown menu={{items}} trigger={['click']} placement="bottomRight" className="header-avatar" overlayClassName="header-account" arrow>
                <div className="profile-logo" onClick={(e) => e.preventDefault()}>{`AA`}</div>
            </Dropdown>
        </>
    }

    return <>
        <header className="header">
            <div className="logo">
                <a href="/">Node.js</a>
            </div>

            <ul className="main-nav">
                {
                    ROUTERS.map((nav, idx) => {
                        return nav.include_nav &&
                        <li key={idx}>
                            <NavLink to={nav.path}>{nav.label}</NavLink>
                        </li>
                    })
                }

                <li><RenderMenu /></li>
            </ul>
        </header>
    </>
}

export default Header;