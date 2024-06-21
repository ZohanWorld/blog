import { thunk } from 'redux-thunk'
import { applyMiddleware, configureStore } from '@reduxjs/toolkit'

import dataSlice from './dataSlice'
import authSlice from './authSlice'

/* eslint-disable import/prefer-default-export */
const middleware = (store) => (next) => (action) => {
  const result = next(action)
  console.log('Middleware', store.getState())
  return result
}

export const store = configureStore(
  {
    reducer: {
      data: dataSlice,
      auth: authSlice,
    },
  },
  applyMiddleware(middleware, thunk)
)
