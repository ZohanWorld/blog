/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom'
import '../style/form-page.scss'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { createUser } from '../store/authSlice'

function Registerpage() {
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    dispatch(createUser(data))
    reset()
  }

  const password = watch('password')

  return (
    <div className="form-page" onSubmit={handleSubmit(onSubmit)}>
      <form className="user-form">
        <h2 className="user-form__title">Create new account</h2>
        <div className="user-form__inputs">
          <label htmlFor="username" className="user-form__label">
            Username
            <input
              {...register('username', {
                required: 'Username can not be empty',
                minLength: { value: 3, message: 'Username must be at least 3 characters' },
                maxLength: { value: 20, message: 'Username must be less than 20 characters' },
              })}
              id="username"
              className="user-form__input"
              placeholder="username"
            />
            <div>{errors.username && <p className="user-form__error">{errors?.username?.message || 'Error'}</p>}</div>
          </label>
          <label htmlFor="email" className="user-form__label">
            Email
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
              placeholder="email"
            />
            <div>{errors.email && <p className="user-form__error">{errors?.email?.message || 'Error'}</p>}</div>
          </label>
          <label htmlFor="password" className="user-form__label">
            Password
            <input
              {...register('password', {
                required: 'Password can not be empty',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                maxLength: { value: 40, message: 'Password must be less than 40 characters' },
              })}
              type="password"
              id="password"
              className="user-form__input"
              placeholder="password"
            />
            <div>{errors.password && <p className="user-form__error">{errors?.password?.message || 'Error'}</p>}</div>
          </label>
          <label htmlFor="confirmPassword" className="user-form__label">
            Repeat password
            <input
              {...register('repeatPassword', {
                required: 'Please repeat your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              type="password"
              id="confirmPassword"
              className="user-form__input"
              placeholder="repeat password"
            />
            <div>
              {errors.repeatPassword && (
                <p className="user-form__error">{errors?.repeatPassword?.message || 'Error'}</p>
              )}
            </div>
          </label>
        </div>
        <label htmlFor="agreeToc" className="user-form__label-confirm">
          <div>
            <input
              {...register('agreeToc', { required: 'You must agree to the processing of your personal information' })}
              type="checkbox"
              id="agreeToc"
              className="user-form__checkbox"
            />
            I agree to the processing of my personal information
          </div>
          <div>{errors.agreeToc && <p className="user-form__error">{errors?.agreeToc?.message || 'Error'}</p>}</div>
        </label>
        <button type="submit" className="user-form__submit">
          Create
        </button>
        <p className="user-form__question">
          Already have an account?<Link to="/sign-in"> Sign in.</Link>
        </p>
      </form>
    </div>
  )
}

export default Registerpage
