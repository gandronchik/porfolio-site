import cs from 'classnames'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PageBlock } from 'notion-types'
import * as React from 'react'
import BodyClassName from 'react-body-classname'
import { useSearchParam } from 'react-use'

// core notion renderer
import { NotionRenderer } from 'components/react-notion-x'

// utils
import * as config from 'lib/config'
import { mapImageUrl } from 'lib/map-image-url'
import { getCanonicalPageUrl, mapPageUrl } from 'lib/map-page-url'
import * as types from 'lib/types'
import { useDarkMode } from 'lib/use-dark-mode'
import { getBlockTitle, getPageProperty } from 'notion-utils'

// components
import { Loading } from './Loading'
import { Page404 } from './Page404'
import { PageHead } from './PageHead'
//import { PageAside } from './PageAside'
// import { Footer } from './Footer'
// import { NotionPageHeader } from './NotionPageHeader'
// import { PageFooter } from './PageFooter'
//import { PageHeader } from './PageHeader'
//import { GitHubShareButton } from './GitHubShareButton'

import styles from './styles.module.css'


// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

// const Code = dynamic(() =>
//   import('react-notion-x/third-party/code').then(async (m) => {
//     // add / remove any prism syntaxes here
//     await Promise.all([
//       import('prismjs/components/prism-markup-templating.js'),
//       import('prismjs/components/prism-markup.js'),
//       import('prismjs/components/prism-bash.js'),
//       import('prismjs/components/prism-c.js'),
//       import('prismjs/components/prism-cpp.js'),
//       import('prismjs/components/prism-csharp.js'),
//       import('prismjs/components/prism-docker.js'),
//       import('prismjs/components/prism-java.js'),
//       import('prismjs/components/prism-js-templates.js'),
//       import('prismjs/components/prism-coffeescript.js'),
//       import('prismjs/components/prism-diff.js'),
//       import('prismjs/components/prism-git.js'),
//       import('prismjs/components/prism-go.js'),
//       import('prismjs/components/prism-graphql.js'),
//       import('prismjs/components/prism-handlebars.js'),
//       import('prismjs/components/prism-less.js'),
//       import('prismjs/components/prism-makefile.js'),
//       import('prismjs/components/prism-markdown.js'),
//       import('prismjs/components/prism-objectivec.js'),
//       import('prismjs/components/prism-ocaml.js'),
//       import('prismjs/components/prism-python.js'),
//       import('prismjs/components/prism-reason.js'),
//       import('prismjs/components/prism-rust.js'),
//       import('prismjs/components/prism-sass.js'),
//       import('prismjs/components/prism-scss.js'),
//       import('prismjs/components/prism-solidity.js'),
//       import('prismjs/components/prism-sql.js'),
//       import('prismjs/components/prism-stylus.js'),
//       import('prismjs/components/prism-swift.js'),
//       import('prismjs/components/prism-wasm.js'),
//       import('prismjs/components/prism-yaml.js')
//     ])
//     return m.Code
//   })
// )

const Collection = dynamic(() =>
  import('components/react-notion-x').then(
    (m) => m.Collection
  )
)
// const Equation = dynamic(() =>
//   import('react-notion-x/third-party/equation').then((m) => m.Equation)
// )
// const Pdf = dynamic(
//   () => import('react-notion-x/third-party/pdf').then((m) => m.Pdf),
//   {
//     ssr: false
//   }
// )
// const Modal = dynamic(
//   () =>
//     import('react-notion-x/third-party/modal').then((m) => {
//       m.Modal.setAppElement('.notion-viewport')
//       return m.Modal
//     }),
//   {
//     ssr: false
//   }
// )
// const Tweet = ({ id }: { id: string }) => {
//   return <TweetEmbed tweetId={id} />
// }

// const propertyLastEditedTimeValue = (
//   { block, pageHeader },
//   defaultFn: () => React.ReactNode
// ) => {
//   if (pageHeader && block?.last_edited_time) {
//     return `Last updated ${formatDate(block?.last_edited_time, {
//       month: 'long'
//     })}`
//   }

//   return defaultFn()
// }

// const propertyDateValue = (
//   { data, schema, pageHeader },
//   defaultFn: () => React.ReactNode
// ) => {
//   if (pageHeader && schema?.name?.toLowerCase() === 'published') {
//     const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date

//     if (publishDate) {
//       return `Published ${formatDate(publishDate, {
//         month: 'long'
//       })}`
//     }
//   }

//   return defaultFn()
// }

// const propertyTextValue = (
//   { schema, pageHeader },
//   defaultFn: () => React.ReactNode
// ) => {
//   if (pageHeader && schema?.name?.toLowerCase() === 'author') {
//     return <b>{defaultFn()}</b>
//   }

//   return defaultFn()
// }

function HeaderMock() {
  return null;
}

export const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId,
}) => {

  const router = useRouter()

  const lite = useSearchParam('lite')

  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      // Code,
      // Collection,
      // Equation,
      // Pdf,
      // Modal,
      // Tweet,
      // Header: HeaderMock,
      // propertyLastEditedTimeValue,
      // propertyTextValue,
      // propertyDateValue
    }),
    []
  )

  // tooltips
  React.useEffect(() => {
    const onPageLoad = () => {
      Array.from(document.querySelectorAll<HTMLElement>('[data-tip]')).forEach((el) => {
        if (el.querySelectorAll('.tooltip').length === 0) {
          const tip = document.createElement('div');
          tip.classList.add('tooltip');
          tip.innerHTML += `<div class='tooltip-header notion-text'>${("tk_preview")}</div>
                           <div class='tooltip-body'>
                            ${el.getAttribute('data-tip')}
                            <div class=''>...</div>
                           </div>
                           <div class='tooltip-footer notion-text'>${("tk_click_read_more")}</div>`
          el.appendChild(tip);
          el.onmousemove = e => {
            tip.style.left = e.clientX + 'px'
            tip.style.top = e.clientY + 'px';
  
            if (e.clientX > window.innerWidth / 2) {
              tip.style.transform = `translate(calc(-100% - 15px), ${e.clientY > window.innerHeight / 2 ? "calc(-100% - 15px)" : "15px"})`;
            }
            else {
              tip.style.transform = `translate(15px,${e.clientY > window.innerHeight / 2 ? "calc(-100% - 15px)" : "15px"})`;
            }
          };
        }

      });
    };
    setTimeout(onPageLoad, 1000)
    return () => {
      Array.from(document.querySelectorAll('.tooltip')).forEach(el => {
        el.remove()
      })
    }
  }, [router.isFallback, pageId])

  // lite mode is for oembed
  const isLiteMode = lite === 'true'

  const { isDarkMode } = useDarkMode()

  const siteMapPageUrl = React.useMemo(() => {
    const params: any = {}
    if (lite) params.lite = lite

    const searchParams = new URLSearchParams(params)
    return mapPageUrl(site, recordMap, searchParams)
  }, [site, recordMap, lite])

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  // const isRootPage =
  //   parsePageId(block?.id) === parsePageId(site?.rootNotionPageId)
  // const isBlogPost =
  //   block?.type === 'page' && block?.parent_table === 'collection'

  // const showTableOfContents = !!isBlogPost
  // const minTableOfContentsItems = 3

  // const pageAside = React.useMemo(
  //   () => (
  //     <PageAside block={block} recordMap={recordMap} isBlogPost={isBlogPost} />
  //   ),
  //   [block, recordMap, isBlogPost]
  // )


  //const footer = React.useMemo(() => <Footer />, [])
  //const pageFooter = <PageFooter />
 // const pageHeader = React.useMemo(() => <PageHeader />, [])

  if (router.isFallback) {
    return <Loading />
  }

  if (error || !site || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  console.log('notion page', {
    isDev: config.isDev,
    title,
    pageId,
    rootNotionPageId: site.rootNotionPageId,
    recordMap
  })

  // if (!config.isServer) {
  //   // add important objects to the window global for easy debugging
  //   const g = window as any
  //   g.pageId = pageId
  //   g.recordMap = recordMap
  //   g.block = block
  // }

  const canonicalPageUrl =
    !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId)

  const socialImage = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
    (block as PageBlock).format?.page_cover ||
    config.defaultPageCover,
    block
  )

  const socialDescription =
    getPageProperty<string>('Description', block, recordMap) ||
    config.description

  return (
    <>
      <PageHead
        pageId={pageId}
        site={site}
        title={title}
        description={socialDescription}
        image={socialImage}
        url={canonicalPageUrl}
      />

      {isLiteMode && <BodyClassName className='notion-lite' />}
      {isDarkMode && <BodyClassName className='dark-mode' />}

      <NotionRenderer
        bodyClassName={cs(
          styles.notion,
          pageId === site.rootNotionPageId && 'index-page'
        )}
        darkMode={isDarkMode}
        components={components}
        recordMap={recordMap}
        rootPageId={site.rootNotionPageId}
        rootDomain={site.domain}
        fullPage={!isLiteMode}
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={true}
        // showTableOfContents={showTableOfContents}
        // minTableOfContentsItems={minTableOfContentsItems}
        defaultPageIcon={config.defaultPageIcon}
        defaultPageCover={config.defaultPageCover}
        defaultPageCoverPosition={config.defaultPageCoverPosition}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapImageUrl}
        // searchNotion={config.isSearchEnabled ? searchNotion : null}
        // pageAside={pageAside}
        // footer={footer}
        // pageFooter={pageFooter}
        // pageHeader={pageHeader}
      />
    </>
  )
}
