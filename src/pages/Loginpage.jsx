/* eslint-disable quotes */
/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom'
import '../style/form-page.scss'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { loginUser } from '../store/authSlice'

function Loginpage() {
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    dispatch(loginUser(data))
    reset()
  }

  return (
    <div className="form-page">
      <form className="user-form" aria-labelledby="user-title" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="user-form__title">Sign In</h2>
        <div className="user-form__inputs">
          <label className="user-form__label" htmlFor="email_input">
            Email address
            <input
              {...register('email', {
                required: 'Email can not be empty',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              className="user-form__input"
              id="email_input"
              type="email"
              placeholder="Email address"
              autoComplete="email"
            />
            <div>{errors.email && <p className="user-form__error">{errors?.email?.message || 'Error'}</p>}</div>
          </label>
          <label className="user-form__label" htmlFor="password_input">
            Password
            <input
              {...register('password', { required: "Password can't be empty" })}
              className="user-form__input"
              id="password_input"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <div>{errors.password && <p className="user-form__error">{errors?.password?.message || 'Error'}</p>}</div>
          </label>
        </div>
        <button className="user-form__submit" type="submit">
          user
        </button>
        <p className="user-form__question">
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  )
}

export default Loginpage
