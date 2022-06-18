import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.webp'
import constants from '../../constants'
import { selectAuth } from '../../features/auth/AuthSlice'
import {
  selectNavbar,
  closeIsMobileOpen,
} from '../../features/navbar/NavbarSlice'
import { useAppDispatch, useAppSelector } from '../../store'

function Navbar(): JSX.Element {
  const { isMobileOpen, currentPageKey } = useAppSelector(selectNavbar)
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector(selectAuth)

  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      className={isMobileOpen ? 'show-mobile' : ''}>
      <ul>
        <li className="logo">
          <Link
            to={constants.pages.INDEX.path}
            onClick={() => isMobileOpen && dispatch(closeIsMobileOpen())}>
            <img src={logo} alt="Logo of Tube2Drive" />
          </Link>
        </li>
        <li>
          <Link
            to={constants.pages.INDEX.path}
            onClick={() => isMobileOpen && dispatch(closeIsMobileOpen())}
            className={
              currentPageKey === constants.pages.INDEX.key ? 'active' : ''
            }>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <title>{constants.pages.INDEX.title}</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={`M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 
                  1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 
                  001 1m-6 0h6`}
                />
              </svg>
              <span className="sr-only">{constants.pages.INDEX.title}</span>
            </span>
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link
                to={constants.pages.CREATE.path}
                onClick={() => isMobileOpen && dispatch(closeIsMobileOpen())}
                className={
                  currentPageKey === constants.pages.CREATE.key ? 'active' : ''
                }>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2">
                    <title>{constants.pages.CREATE.title}</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <span className="sr-only">
                    {constants.pages.CREATE.title}
                  </span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={constants.pages.LOGOUT.path}
                onClick={() => isMobileOpen && dispatch(closeIsMobileOpen())}>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <title>{constants.pages.LOGOUT.title}</title>
                    <path
                      fillRule="evenodd"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 
                      3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">
                    {constants.pages.LOGOUT.title}
                  </span>
                </span>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              to={constants.pages.LOGIN.path}
              onClick={() => isMobileOpen && dispatch(closeIsMobileOpen())}
              className={
                currentPageKey === constants.pages.LOGIN.key ? 'active' : ''
              }>
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <title>{constants.pages.LOGIN.title}</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2
                     2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                <span className="sr-only">{constants.pages.LOGIN.title}</span>
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
export default Navbar
