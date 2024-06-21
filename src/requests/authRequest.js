/* eslint-disable import/prefer-default-export */

export const createUserApi = async ({ username, email, password }) => {
  const response = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.errors ? JSON.stringify(error.errors) : 'Failed to create user')
  }

  const res = await response.json()
  const userData = { ...res.user }
  localStorage.setItem('user', JSON.stringify(userData))
  return res.user
}

export const loginUserApi = async ({ email, password }) => {
  const response = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.errors ? JSON.stringify(error.errors) : 'Failed to create user')
  }

  const res = await response.json()
  const userData = { ...res.user }

  localStorage.setItem('user', JSON.stringify(userData))
  return res.user
}

export const updateUserInfoApi = async (userData, token) => {
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: {
        ...userData,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.errors ? JSON.stringify(error.errors) : 'Failed to update user info')
  }

  const res = await response.json()
  const data = { ...res.user }

  localStorage.setItem('user', JSON.stringify(data))
  return res.user
}
