import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../services/crytoApi'
import Loader from './Loader'

const Crytocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  console.log(cryptoList)

  useEffect(() => {
    const filteredData = cryptoList?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setCryptos(filteredData)
  }, [searchTerm, cryptoList])

  if (isFetching) return <Loader />
  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='search cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className='crypto-card'
            key={currency.symbol}
          >
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.market_cap_rank}. ${currency.name}`}
                extra={
                  <img
                    className='crypto-image'
                    src={currency.image}
                    alt={`${currency.name} `}
                  />
                }
                hoverable
              >
                <p>Price : {millify(currency.current_price)}</p>
                <p>Market Cap : {millify(currency.market_cap)}</p>
                <p>
                  Daily Change : {millify(currency.price_change_percentage_24h)}
                  %
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Crytocurrencies
