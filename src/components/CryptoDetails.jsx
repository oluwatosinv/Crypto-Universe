import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import millify from 'millify'
import { Row, Col, Typography, Select } from 'antd'
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../services/crytoApi'
import LineChart from './LineChart'

const { Title, Text } = Typography
const { Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timeperiod, setTimeperiod] = useState('7')
  const [date1, setDate1] = useState('')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod })
  console.log(coinId)
  console.log(data)

  if (isFetching) return 'Loading ..'

  const cryptoDetails = data

  console.log('coin history', coinHistory.prices[0])
  console.log('coin history', coinHistory)
  const time = ['1', '3', '7', '31', '91', '186', '365', '1095', '1825']

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${
        cryptoDetails?.market_data?.ath?.usd &&
        millify(cryptoDetails?.market_data?.ath?.usd)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'Rank',
      value: cryptoDetails.market_cap_rank,
      icon: <NumberOutlined />,
    },
    // {
    //   title: '24h Volume',
    //   value: `$ ${
    //     cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])
    //   }`,
    //   icon: <ThunderboltOutlined />,
    // },
    {
      title: 'Market Cap',
      value: `$ ${
        cryptoDetails?.market_data?.market_cap?.usd &&
        millify(cryptoDetails?.market_data?.ath?.usd)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        cryptoDetails?.market_data?.high_24h?.usd &&
        millify(cryptoDetails?.market_data?.high_24h?.usd)
      }`,
      icon: <TrophyOutlined />,
    },
  ]

  const genericStats = [
    // {
    //   title: 'Number Of Markets',
    //   value: cryptoDetails.numberOfMarkets,
    //   icon: <FundOutlined />,
    // },
    // {
    //   title: 'Number Of Exchanges',
    //   value: cryptoDetails.numberOfExchanges,
    //   icon: <MoneyCollectOutlined />,
    // },
    {
      title: 'Highest Price Sold',
      value: `${millify(cryptoDetails?.market_data.ath.usd)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoDetails?.market_data?.max_supply &&
        millify(cryptoDetails?.market_data?.max_supply)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(cryptoDetails.market_data.circulating_supply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ]

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {data?.name} ({data?.symbol}) Price
        </Title>
        <p>
          {data?.name} live price in US Dollar (USD). View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select Timeperiod'
        onChange={(value) => setTimeperiod(value)}
      >
        {/* {time.map((date, i) => (
          <Option key={i} value={date}>
            {date}
          </Option>
        ))} */}
        {time.map((date, i) =>
          date === '1' ? (
            <Option key={i} value={date}>
              1 day
            </Option>
          ) : date === `3` ? (
            <Option key={i} value={date}>
              3 days
            </Option>
          ) : date === `7` ? (
            <Option key={i} value={date}>
              7 days
            </Option>
          ) : date === `31` ? (
            <Option key={i} value={date}>
              1 month
            </Option>
          ) : date === `91` ? (
            <Option key={i} value={date}>
              3 months
            </Option>
          ) : date === `186` ? (
            <Option key={i} value={date}>
              6 months
            </Option>
          ) : date === `365` ? (
            <Option key={i} value={date}>
              1 year
            </Option>
          ) : date === `1095` ? (
            <Option key={i} value={date}>
              3 years
            </Option>
          ) : (
            <Option key={i} value={date}>
              5 years
            </Option>
          )
        )}
      </Select>

      <LineChart
        cryptoDetails={cryptoDetails}
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.market_data?.current_price?.usd)}
        coinName={cryptoDetails.name}
      />
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {data?.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {data?.name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col>
        <div className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description.en)}
        </div>
        {/* <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links?.map((link, index) => (
            <Row className='coin-link' key={index}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col> */}
      </Col>
    </Col>
  )
}

export default CryptoDetails
