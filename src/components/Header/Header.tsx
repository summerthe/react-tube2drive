import React from 'react'
import {
  selectNavbar,
  toggleIsMobileOpen,
} from '../../features/navbar/NavbarSlice'
import { useAppDispatch, useAppSelector } from '../../store'

function Header({ title }: { title: string }): JSX.Element {
  const dispatch = useAppDispatch()
  const { isMobileOpen } = useAppSelector(selectNavbar)

  return (
    <header>
      <h1>{title}</h1>
      <button
        className="mobile-only"
        aria-label="Toggle navigation menu"
        type="button"
        onClick={() => dispatch(toggleIsMobileOpen())}>
        <span className="icon">
          {!isMobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <title>Open navigation menu</title>
              <path
                fillRule="evenodd"
                d={`M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 
          011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 
          110 2H4a1 1 0 01-1-1z`}
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <title>Close navigation menu</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </span>
      </button>
    </header>
  )
}

export default Header
