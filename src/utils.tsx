import React, { Navigate } from 'react-router-dom'

const utils = {
  navigateTo: (path: string) => <Navigate to={path} replace />,
}
export default utils
