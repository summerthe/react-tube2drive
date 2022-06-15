import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import constants from '../../constants'
import App from '../../containers/App/App'
import Create from '../../pages/Create/Create'
import Index from '../../pages/Index/Index'
import Login from '../../pages/Login/Login'

function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={constants.pages.INDEX.path} element={<App />}>
          <Route index element={<Index />} />
          <Route path={constants.pages.LOGIN.path} element={<Login />} />
          <Route path={constants.pages.CREATE.path} element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
