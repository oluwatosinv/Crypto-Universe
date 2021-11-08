import React from 'react'
import {Button,Menu, Typography, Avatar} from 'antd'
import {Link} from 'react-router-dom'
import icon from '../images/cryptocurrency.png'
import {HomeOutlined,MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons';

const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className="logo-containe">
                <Avatar src={icon} size='large' />
                <Typography.Title level={2} className='logo'>
                    <Link to="/">Cryto Verse</Link>
                </Typography.Title>
                {/* <button className="menu-control-container"></button> */}
            </div>
            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />}>
                    <Link to='/Crytocurrencies'>Crytocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined />}>
                    <Link to='/exchanges'>Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />}>
                    <Link to='/news'>News</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Navbar
