import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import constants from '../../constants'
import App from '../../containers/App/App'
import Index from '../../pages/Index/Index'

function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={constants.pages.INDEX.path} element={<App />}>
          <Route index element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
