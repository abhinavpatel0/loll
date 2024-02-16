'use client'

import siteMetadata from '@/config/siteMetadata'
// css and third party libraries
import styles from './menu.module.css'
import 'react-accessible-accordion/dist/fancy-example.css'

import Logo from '@/components/blog/Logo'

// utility and hooks
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useDarkMode } from '@/hooks/useDarkmode'
import { useOuterClick } from '@/hooks/useOuterclick'
import { useContactModal } from '@/components/navigation/contact/store'
import { ContactModal } from '@/components/navigation/contact'
// custom components
import LangSwitch from '../lang/LangSwitch'
import ThemeSwitcher from '../theme'
import SearchButton from '../search/SearchButton'
import { Mobilesection } from './mobilesection'
import { Regularsection } from './regularsection'
import SocialIcons from '../icons/social'
// config
import { headerBlogLinks, dropdownlinks } from '@/config/headerLinks'
import { useTranslation } from '@/app/[locale]/i18n/client'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

export const Header = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'headerlinks')

  const pathname = usePathname()

  const [dropdownShow, setDropdownShow] = useState(false)
  const onToggleDropdown = () => {
    setDropdownShow((status) => !status)
  }

  const [menuclick, setClick] = useState<boolean>(false)
  const handleClick = (): void => setClick(!menuclick)
  const closeMenu = (): void => setClick(false)
  const menubarRef = useRef<HTMLDivElement>(null)

  useOuterClick(menubarRef, closeMenu)

  const contactModal = useContactModal()

  const handleContactClick = (): void => {
    contactModal.onOpen()
  }
  function ContactClick(): void {
    handleContactClick()
  }

  const { theme, mounted } = useDarkMode()

  if (!mounted) return null

  const menuClass =
    theme === 'light'
      ? `${menuclick ? styles.toggle2 : styles.toggle}`
      : `${menuclick ? styles.toggledark2 : styles.toggledark}`

  const handleMenuKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }

  return (
    <>
      <header className="blur-10 sticky top-0 z-[110] flex items-center justify-between border-b border-gray-200 bg-opacity-30 px-4 py-0 backdrop-blur-lg backdrop-filter dark:border-gray-700 sm:py-2 md:py-2">
        <div>
          <div className="sticky flex items-center justify-between">
            <div className="ml-3" style={{ color: '#00FF00' }}>
              <Logo />
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="ml-4 flex flex-1 items-center justify-end ">
            {headerBlogLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="link-underline rubikaaa dark:link-underline-black link rounded-xl p-1 font-medium text-gray-900 hover:bg-gray-400/10  dark:text-gray-100 sm:p-4"
              >
                {t(`${link.title}`, { ns: 'common' })}
              </Link>
            ))}
            <div className="relative">
              <button
                type="button"
                className="link-underline rubikaaa dark:link-underline-black link rounded-xl p-1 font-medium text-gray-900 hover:bg-gray-400/10  dark:text-gray-100 sm:p-4"
                aria-expanded="false"
                onClick={onToggleDropdown}
              >
                <span>Category pages</span>
              </button>
              {dropdownShow && (
                <div className="rubikaaa absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-2 shadow-lg">
                  {dropdownlinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="link block px-12  py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <ThemeSwitcher className="hover" />
            <div className="pl-12"></div>
          </div>
        </div>
      </header>
    </>
  )
}
