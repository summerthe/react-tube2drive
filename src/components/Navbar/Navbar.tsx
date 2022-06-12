import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.webp'
import constants from '../../constants'
import { selectNavbar } from '../../features/navbar/NavbarSlice'
import { useAppSelector } from '../../store'

function Navbar(): JSX.Element {
  const { isMobileOpen } = useAppSelector(selectNavbar)
  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      className={isMobileOpen ? 'show-mobile' : ''}>
      <ul>
        <li className="logo">
          <Link to={constants.pages.INDEX.path}>
            <img src={logo} alt="Logo of Tube2Drive" />
          </Link>
        </li>
        <li>
          <Link to={constants.pages.INDEX.path} className="active">
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={`M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 
                  1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 
                  001 1m-6 0h6`}
                />
              </svg>
            </span>
          </Link>
        </li>
        <li>
          <Link to={constants.pages.CREATE.path}>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </span>
          </Link>
        </li>
        <li>
          <Link to={constants.pages.LOGIN.path}>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={`M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0
                  01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z`}
                />
              </svg>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
