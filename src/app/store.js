import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/crytoApi'

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
})
