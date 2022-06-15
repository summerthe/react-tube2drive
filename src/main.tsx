import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './assets/scss/reset.scss'
import './assets/scss/main.scss'
import AppRoutes from './routes/AppRoutes/AppRoutes'
import { store } from './store'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}
