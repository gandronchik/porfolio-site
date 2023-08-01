import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import * as types from 'notion-types'
import * as React from 'react'
import { useNotionContext } from 'components/react-notion-x'
import Logo from './Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getCanonicalPageUrl, mapPageUrl } from 'lib/map-page-url'

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
  const router = useRouter();
  const [hoveredNavLink, setHoveredNavLink] = React.useState();
  console.log('pageUrlOverrides', pageUrlOverrides);
  console.log('navigationLinks', navigationLinks);
  console.log('inversePageUrlOverrides', inversePageUrlOverrides);
  console.log('router.pathname', router, router.pathname);
  console.log('hoveredNavLink', hoveredNavLink);


  return (
    <>
      <div className='bg-zinc-800 w-full h-4 fixed z-10'></div>
      <header data-aos="fade-in" data-aos-duration="1000" style={{ backgroundImage: "radial-gradient(circle,rgba(16 18 27 / 30%), #27272a" }} className=" bg-zinc-800 fixed top-4 h-14 shadow-bottom left-0 right-0 z-10 shadow-zinc-900">
        <div className="mx-auto flex h-full items-center px-4 xl:container">
          <div className="mr-5 flex shrink-0 items-center">
            {/* <Link href="/"> */}
              <Logo />
            {/* </Link> */}
          </div>
          <ul className="ml-auto h-full  hidden sm:flex items-center">
            <li
              onMouseEnter={() => setHoveredNavLink("portfolio")}
              onMouseLeave={() => setHoveredNavLink("")}
              className={`font-medium flex h-full items-center px-5  text-purple-500 ${(hoveredNavLink === "portfolio" || router.asPath === "/") && 'from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent font-extrabold text-2xl'
                }`}
            >
              <Link

                href="/"
              >
                Portfolio
              </Link>
            </li>
            {navigationLinks.map((link, index) => {
              const isActive = (hoveredNavLink === link.pageId || router.asPath === `/${inversePageUrlOverrides[link.pageId]}`)
              console.log(router.asPath, `/${inversePageUrlOverrides[link.pageId]}`);
              console.log(router.asPath === `/${inversePageUrlOverrides[link.pageId]}`);
              console.log((hoveredNavLink === link.pageId || router.asPath === `/${inversePageUrlOverrides[link.pageId]}`));

              return <li
                onMouseEnter={() => setHoveredNavLink(link.pageId)}
                onMouseLeave={() => setHoveredNavLink("")}
                className={`font-medium flex h-full items-center px-5 text-purple-500 ${(hoveredNavLink === link.pageId || router.asPath === `/${inversePageUrlOverrides[link.pageId]}`) && 'from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent font-extrabold text-2xl'
                  }`}
                key={index}
              >
                <Link
                  href={`/${inversePageUrlOverrides[link.pageId]}`}
                >
                  {link.title}
                </Link>
              </li>
            })}
          </ul>
          <div className="flex items-center ml-auto">
            <ToggleThemeButton />
          </div>
        </div>
      </header >
      <ul className="ml-auto h-full mt-5 flex sm:hidden  justify-center items-center">
        <li
          onMouseEnter={() => setHoveredNavLink("portfolio")}
          className={`font-medium flex h-full items-center px-5  text-purple-500 ${(hoveredNavLink === "portfolio" || router.asPath === "/") && 'from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent font-extrabold text-2xl'
            }`}
        >
          <Link

            href="/"
          >
            Portfolio
          </Link>
        </li>
        {navigationLinks.map((link, index) => {
          console.log(router.asPath, `/${inversePageUrlOverrides[link.pageId]}`);
          console.log(router.asPath === `/${inversePageUrlOverrides[link.pageId]}`);

          return <li
            onMouseEnter={() => setHoveredNavLink(link.pageId)}
            className={`font-medium flex h-full items-center px-5 text-purple-500 ${(hoveredNavLink === link.pageId || router.asPath === `/${inversePageUrlOverrides[link.pageId]}`) && 'from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent font-extrabold text-2xl'
              }`}
            key={index}
          >
            <Link
              href={`/${inversePageUrlOverrides[link.pageId]}`}
            >
              {link.title}
            </Link>
          </li>
        })}
      </ul>
    </>
  )
}