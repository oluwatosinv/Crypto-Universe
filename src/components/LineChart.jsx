import React from 'react'
import { Line } from 'react-chartjs-2'
import { Typography, Row, Col } from 'antd'

const { Title } = Typography
const LineChart = ({ coinHistory, currentPrice, coinName, cryptoDetails }) => {
  const coinPrice = []
  const coinTimestamp = []
  // console.log('object: g', coinHistory?.prices)

  for (let i = 0; i < coinHistory?.prices.length; i += 1) {
    coinPrice.push(coinHistory?.prices[i][1])
    coinTimestamp.push(new Date(coinHistory?.prices[i][0]).toLocaleDateString())
  }
  //console.log('coin prices:', coinPrice)

  //console.log('coin dates:', coinTimestamp)
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  }
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <>
      <Row className='chart-header'>
        <Title className='chart-title' level={2}>
          {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title className='price-change' level={5}>
            {(cryptoDetails?.market_data?.price_change_percentage_24h).toFixed(
              2
            )}
            %
          </Title>
          <Title className='current-price' level={5}>
            Current {coinName} Price : {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart
