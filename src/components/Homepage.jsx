import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Row, Col, Typography, Statistic } from 'antd'
// import { Crytocurrencies } from '.'

import { useGetCryptosQuery } from '../services/crytoApi'
import { Crytocurrencies, News } from '.'

const { Title } = Typography

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10)

  const globalStats = data?.data?.stats

  if (isFetching) return 'Loading ....'

  return (
    <>
      <Title level={2} className='Heading'>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title='Total Crytocurrencies' value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Exchanges'
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Market Cap'
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total 24h Volume'
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Markets'
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Top 10 Crytocurrencies in the world
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/crytocurrencies'>Show more</Link>
        </Title>
      </div>
      <Crytocurrencies simplified />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Latest Cryptocurrency News
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/news'>Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage
