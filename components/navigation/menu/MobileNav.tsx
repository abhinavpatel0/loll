/* eslint-disable prettier/prettier */
import { HomeIcon, ShopIcon, PaletteIcon, MusicIcon, BlogIcon, MailIcon } from '../icons'
import { useState } from 'react'
import ThemeSwitcher from '../theme'
import { headerBlogLinks, dropdownlinks } from '@/config/headerLinks'

import Logo from '@/components/blog/Logo'
import Link from 'next/link'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [dropdownShow, setDropdownShow] = useState(false)

  const onToggleDropdown = () => {
    setDropdownShow((status) => !status)
  }

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
        // document.body.style.overflowX = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      <div
        className={`fixed right-0 top-0 h-screen w-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800 ${navShow ? 'translate-y-0' : '-inset-full -translate-y-full '}`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed h-full w-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>
        <nav className="fixed left-1/2 top-0 -translate-x-1/2 transform  px-6">
          <div className="mt-0 flex items-center justify-center">
            <Logo  />
          </div>

          <ul
            className="flex flex-col items-center  justify-center space-y-4"
            style={{ height: 'calc(100% - 6rem)' }}
          >
              <ThemeSwitcher className={''} />++++
            <Link
              href="/"
              className="link mt-12 rounded-md bg-white px-4 py-2 text-center text-2xl font-medium text-gray-900 shadow-md transition-colors duration-300 hover:text-blue-500 dark:bg-gray-800 dark:text-white"
              onClick={onToggleNav}
            >
              Home
            </Link>
            {headerBlogLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className="link rounded-md bg-white px-4 py-2 text-center text-2xl font-medium text-gray-900 shadow-md transition-colors duration-300 hover:text-blue-500 dark:bg-gray-800 dark:text-white"
                  onClick={onToggleNav}
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <button
                className="link flex items-center text-2xl font-medium text-gray-900 transition-colors duration-300 hover:text-blue-500 focus:outline-none dark:text-white"
                onClick={onToggleDropdown}
              >
                Categories <HomeIcon  />
              </button>
              {dropdownShow && (
                <div className="absolute left-0 mt-2 w-full rounded-lg bg-white shadow-lg dark:bg-gray-800">
                  {dropdownlinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="hover:text-bg-green-900 block px-20 py-3 text-base text-gray-900 transition-colors duration-300 hover:bg-blue-500 dark:text-white"
                      onClick={onToggleNav}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
