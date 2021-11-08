import React from 'react'
import millify from 'millify'
import Link from 'react-router-dom'
import { Row, Col, Typography, Statistic } from 'antd'
import { Crytocurrencies } from '.'

const {Title} = Typography

const Homepage = () => {
    return (
        <>
        <Title level={2} className='Heading'>Global Crypto Stats</Title>
        <Row>
            <Col span={12}><Statistic title='Total Crytocurrencies' value={5}/></Col>
            <Col span={12}><Statistic title='Total Exchanges' value={5}/></Col>
            <Col span={12}><Statistic title='Market Cap' value={5}/></Col>
            <Col span={12}><Statistic title='Total 24h Volume' value={5}/></Col>
            <Col span={12}><Statistic title='Total Markets' value={5}/></Col>
        </Row>
        </>
    )
}

export default Homepage
