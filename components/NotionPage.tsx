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
import styles from './styles.module.css'



const Collection = dynamic(() =>
  import('components/react-notion-x').then(
    (m) => m.Collection
  )
)
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

  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
    }),
    []
  )

  const { isDarkMode } = useDarkMode()

  const siteMapPageUrl = React.useMemo(() => {
    const params: any = {}

    const searchParams = new URLSearchParams(params)
    return mapPageUrl(site, recordMap, searchParams)
  }, [site, recordMap])

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  if (router.isFallback) {
    return <Loading />
  }

  if (error || !site || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

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
        fullPage={true}
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={true}
        defaultPageIcon={config.defaultPageIcon}
        defaultPageCover={config.defaultPageCover}
        defaultPageCoverPosition={config.defaultPageCoverPosition}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapImageUrl}
      />
    </>
  )
}
