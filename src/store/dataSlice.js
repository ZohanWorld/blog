/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchArticlesApi,
  fetchArticleApi,
  createArticleApi,
  deleteArticleApi,
  updateArticleApi,
  addToFavouriteApi,
  fetchArticlesPrivateApi,
  fetchArticlePrivateApi,
  removeFromFavouriteApi,
} from '../requests/dataRequest'

export const fetchArticles = createAsyncThunk('data/fetchArticles', async (offset, { getState }) => {
  const state = getState()
  const { user } = state.auth
  if (user) {
    return await fetchArticlesPrivateApi(offset, user.token)
  }
  return await fetchArticlesApi(offset)
})

export const fetchArticle = createAsyncThunk('data/fetchArticle', async (slug, { getState }) => {
  const state = getState()
  const { user } = state.auth
  if (user) {
    return await fetchArticlePrivateApi(slug, user.token)
  }
  return await fetchArticleApi(slug)
})

export const createArticle = createAsyncThunk('data/createArticle', async (article, { getState }) => {
  const state = getState()
  const { token } = state.auth.user
  return await createArticleApi(article, token)
})

export const deleteArticle = createAsyncThunk('data/deleteArticle', async (slug, { getState }) => {
  const state = getState()
  const { token } = state.auth.user
  return await deleteArticleApi(slug, token)
})

export const updateArticle = createAsyncThunk('data/updateArticle', async ({ article, slug }, { getState }) => {
  const state = getState()
  const { token } = state.auth.user
  return await updateArticleApi(article, slug, token)
})

export const addToFavourite = createAsyncThunk('data/addToFavourite', async (slug, { getState }) => {
  const state = getState()
  const { token } = state.auth.user
  return await addToFavouriteApi(slug, token)
})

export const removeFromFavourite = createAsyncThunk('data/addToFavourite', async (slug, { getState }) => {
  const state = getState()
  const { token } = state.auth.user
  return await removeFromFavouriteApi(slug, token)
})

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    totalAticles: 0,
    currentPage: 1,
    currentArticle: null,
    articlesStatus: 'idle',
    articleStatus: 'idle',
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    clearCurrentArticles: (state) => {
      state.data = []
      state.articlesStatus = 'idle'
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null
      state.articleStatus = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.articlesStatus = 'loading'
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articlesStatus = 'succeeded'
        state.data = action.payload.articles
        state.totalAticles = action.payload.articlesCount
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.articlesStatus = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchArticle.pending, (state) => {
        state.articleStatus = 'loading'
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.articleStatus = 'succeeded'
        state.currentArticle = action.payload
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.articleStatus = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setCurrentPage } = dataSlice.actions

export default dataSlice.reducer
