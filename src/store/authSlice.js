/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { createUserApi, loginUserApi, updateUserInfoApi } from '../requests/authRequest'

export const createUser = createAsyncThunk('auth/createUser', async (userData) => {
  return await createUserApi(userData)
})

export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  return await loginUserApi(userData)
})

export const updateUserInfo = createAsyncThunk('auth/updateUserInfo', async (userData, { getState }) => {
  const state = getState()
  const { token } = state.auth.user
  return await updateUserInfoApi(userData, token)
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setUser, logout } = authSlice.actions

export default authSlice.reducer
