import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coingecko.p.rapidapi.com',
  'x-rapidapi-key': 'ab52b248f3msh1eae89cb302bcaep15d08djsn7ec4d07450c5',
  // 'x-access-token':
  //   'coinranking744c47e50e826568384576f9f391c7721f7b5b0d5c90d151',
}

const baseUrl = 'https://coingecko.p.rapidapi.com'

//const basesUrl = 'https://api.coinranking.com/v2'
// const proxyUrl = 'https://thingproxy.freeboard.io/fetch/'
// const baseUrl = proxyUrl + basesUrl

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) =>
        createRequest(
          `/coins/markets?vs_currency=usd&page=1&per_page=${count}&order=market_cap_desc?limit=${count}`
        ),
    }),
    getCryptosStats: builder.query({
      query: () => createRequest(`/global`),
    }),
    // getCryptos: builder.query({
    //   query: (count) => createRequest(`/coins?limit=${count}`),
    //}),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
  }),
})

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptosStatsQuery,
} = cryptoApi
