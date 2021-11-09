import React from 'react'
import { Line } from 'react-chartjs-2'
import { Typography, Row, Col } from 'antd'

const { Title } = Typography
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  return (
    <>
      <Row className='chart-header'>
        <Title className='chart-title' level={2}>
          {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title className='price-change' level={5}>
            {coinHistory?.data?.change}
          </Title>
          <Title className='current-price' level={5}>
            Current {coinName} Price : {currentPrice}
          </Title>
        </Col>
      </Row>
    </>
  )
}

export default LineChart
