import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import {
  Navbar,
  Homepage,
  Exchanges,
  CryptoDetails,
  Crytocurrencies,
  News,
} from './components'
import './App.css'

function App() {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/' element={<Homepage />} />
              {/* <Hompage />
              </Route> */}
              <Route exact path='/exchanges' element={<Exchanges />} />
              <Route
                exact
                path='/cryptocurrencies'
                element={<Crytocurrencies />}
              />

              <Route exact path='/crypto/:coinId' element={<CryptoDetails />} />

              <Route exact path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className='footer'>
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Cryto Universe
            <br />
            All right reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App
