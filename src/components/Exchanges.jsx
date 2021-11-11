import React from 'react'
import millify from 'millify'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import HTMLReactParser from 'html-react-parser'

import { useGetExchangesQuery } from '../services/crytoApi'
import Loader from './Loader'

const { Text } = Typography
const { Panel } = Collapse

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery()
  console.log('exchanges:', data)
  const exchangesList = data

  if (isFetching) return <Loader />

  return (
    <>
      <Row>
        <Col span={8}>Exchanges</Col>
        <Col span={8}>24h Trade Volume</Col>
        <Col span={8}>Country</Col>
        {/* <Col span={6}>Change</Col> */}
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={8}>
                      <Text>
                        <strong>{exchange.trust_score_rank}.</strong>
                      </Text>
                      <Avatar className='exchange-image' src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={8}>
                      ${millify(exchange.trade_volume_24h_btc)}
                    </Col>
                    <Col span={8}>{exchange.country}</Col>
                    {/* <Col span={6}>{millify(exchange.marketShare)}%</Col> */}
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges
