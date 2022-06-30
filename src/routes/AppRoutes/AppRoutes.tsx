import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from '../../components/ProtectedRoutes/ProtectedRoutes'
import constants from '../../constants'
import App from '../../containers/App/App'
import Create from '../../pages/Create/Create'
import Index from '../../pages/Index/Index'
import Login from '../../pages/Login/Login'
import Logout from '../../pages/Logout/Logout'

function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          {/* Public Login and logout routes */}
          <Route path={constants.pages.LOGIN.path} element={<Login />} />
          <Route path={constants.pages.LOGOUT.path} element={<Logout />} />

          {/* Protected routes */}
          <Route
            path={constants.pages.INDEX.path}
            element={<ProtectedRoutes />}>
            <Route index element={<Index />} />
            <Route path={constants.pages.CREATE.path} element={<Create />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
