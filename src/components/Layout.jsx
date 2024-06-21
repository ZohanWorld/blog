import { Link, Outlet } from 'react-router-dom'
import '../style/header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { logout, setUser } from '../store/authSlice'

function Layout() {
  const user = useSelector((state) => state.auth.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    if (userInfo && userInfo.token) {
      dispatch(setUser(userInfo))
    }
  }, [dispatch])

  return (
    <>
      <header className="header">
        <Link to="/" className="header__title">
          Realworld Blog
        </Link>
        {user ? (
          <>
            <Link to="/new-article" className="header__new-article">
              Create article
            </Link>
            <Link to="/profile" className="header__profile">
              {user.username}
              <img src={user.image ? user.image : ''} alt="" className="header__profile-avatar" />
            </Link>
            <button type="button" className="header__sign-out" onClick={() => dispatch(logout())}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="header__sign-in">
              Sign in
            </Link>
            <Link to="/sign-up" className="header__sign-up">
              Sign up
            </Link>
          </>
        )}
      </header>
      <Outlet />
    </>
  )
}

export default Layout
