/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import '../style/form-page.scss'
import { useDispatch, useSelector } from 'react-redux'

import { updateUserInfo } from '../store/authSlice'

function Profilepage() {
  const { username, email } = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username,
      email,
    },
  })

  const onSubmit = (data) => {
    const newData = { ...data }
    for (const key in newData) {
      if (!newData[key]) {
        delete newData[key]
      }
    }
    dispatch(updateUserInfo(newData))
    reset()
  }

  return (
    <div className="form-page">
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="user-form__title">Edit Profile</h2>
        <div className="user-form__inputs">
          <label htmlFor="username" className="user-form__label">
            Username
            <input
              {...register('username', { required: 'Username can not be empty' })}
              type="text"
              id="username"
              className="user-form__input"
            />
            <div>{errors.username && <p className="user-form__error">{errors?.username?.message || 'Error'}</p>}</div>
          </label>
          <label htmlFor="email" className="user-form__label">
            Email adress
            <input
              {...register('email', {
                required: 'Email can not be empty',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              id="email"
              className="user-form__input"
            />
            <div>{errors.email && <p className="user-form__error">{errors?.email?.message || 'Error'}</p>}</div>
          </label>
          <label htmlFor="password" className="user-form__label">
            New Password
            <input
              {...register('password', {
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                maxLength: { value: 40, message: 'Password must be less than 40 characters' },
              })}
              type="password"
              id="password"
              className="user-form__input"
              placeholder="New Password"
            />
            <div>{errors.password && <p className="user-form__error">{errors?.password?.message || 'Error'}</p>}</div>
          </label>
          <label htmlFor="avatar" className="user-form__label">
            Avatar image (URL)
            <input
              {...register('image', {
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  message: 'Invalid URL',
                },
              })}
              type="url"
              id="avatar"
              className="user-form__input"
              placeholder="Avatar image"
            />
            <div>{errors.image && <p className="user-form__error">{errors?.image?.message || 'Error'}</p>}</div>
          </label>
        </div>
        <button type="submit" className="user-form__submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default Profilepage
