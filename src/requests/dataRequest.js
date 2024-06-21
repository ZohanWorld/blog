// Пофиксить фетч у незалогиненного пользователя
export const fetchArticlesApi = async (offset) => {
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=10&offset=${offset}`)
  const data = await response.json()
  return data
}

export const fetchArticlesPrivateApi = async (offset, token) => {
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=10&offset=${offset}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  const data = await response.json()
  return data
}

export const fetchArticleApi = async (slug) => {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
  const data = await response.json()
  return data.article
}

export const fetchArticlePrivateApi = async (slug, token) => {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  const data = await response.json()
  return data.article
}

export const deleteArticleApi = async (slug, token) => {
  await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}

export const createArticleApi = async (articleData, token) => {
  const response = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: { ...articleData },
    }),
  })
  const data = await response.json()
  return data.article
}

export const addToFavouriteApi = async (slug, token) => {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  const data = await response.json()
  return data.article
}

export const removeFromFavouriteApi = async (slug, token) => {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  const data = await response.json()
  return data.article
}

export const updateArticleApi = async (article, slug, token) => {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: { ...article },
    }),
  })
  const data = await response.json()
  return data.article
}
