import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function Needauthpages() {
  const user = useSelector((state) => state.auth.user)
  if (!user) return <Navigate to="/" />
  return <Outlet />
}

export default Needauthpages
