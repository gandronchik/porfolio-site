import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import * as types from 'notion-types'
import * as React from 'react'
import { useNotionContext } from 'components/react-notion-x'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCanonicalPageUrl, mapPageUrl } from 'lib/map-page-url'
import { Collapse } from 'flowbite';

import { navigationLinks, navigationStyle, pageUrlOverrides, inversePageUrlOverrides } from 'lib/config'
import { useDarkMode } from 'lib/use-dark-mode'

import styles from './styles.module.css'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp size={21} /> : <IoSunnyOutline size={21} />}
    </div>
  )
}

export const Header = () => {

  const [showMobileMenu, setShowMobileMenu] = React.useState(false);



  return (
    <nav style={{}} className=" w-full m-auto white shadow-bottom shadow-zinc-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        <Link className='flex-shrink-0 font-bold tracking-wider' href="/">
          <Logo />
        </Link>

        <div className="hidden md:block ml-auto items-center">
          <Menu />
        </div>
        <div className="flex items-center ml-auto">
          <ToggleThemeButton />
        </div>
        <button
          type="button"
          className="ml-4 md:hidden inline-flex items-center justify-center p-2  transition duration-150 ease-in-out"
          onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <svg
            className="h-6 w-6"
            stroke="black"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="md:hidden border-t text-ellipsis">
        {showMobileMenu && <Menu />}
      </div>
      <div className="border-t text-ellipsis"></div>
    </nav>
  )
}

const Menu = () => {
  const pathname = usePathname();
  return <div className="px-2 md:px-0 py-3 space-y-2 md:space-y-0 md:space-x-2">
    {navigationLinks.map((link, index) => {
      const isActive = pathname === `/${inversePageUrlOverrides[link.pageId]}`

      return <Link
        key={index}
        href={`/${inversePageUrlOverrides[link.pageId]}`}
        className={` text-center block md:inline-block px-3 py-2 items-center  text-black  hover:font-extrabold hover:text-2xl ${isActive ? "font-extrabold text-2xl from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent" : ""}`}
      >
        {link.title}
      </Link>
    })}


  </div>
}
