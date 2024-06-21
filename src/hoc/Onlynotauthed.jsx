import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function Onlynotauthed() {
  const user = useSelector((state) => state.auth.user)
  if (user) return <Navigate to="/" />
  return <Outlet />
}

export default Onlynotauthed
