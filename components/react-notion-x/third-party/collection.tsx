import * as React from 'react'
import * as types from 'notion-types'
import {
  getBlockCollectionId,
  getBlockParentPage,
  getTextContent
} from 'notion-utils'
import { useLocalStorage, useWindowSize } from 'react-use'
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { CollectionRow } from './collection-row'
import { CollectionViewIcon } from '../icons/collection-view-icon'
// import CheckIcon from '../icons/check'
// import { ChevronDownIcon } from '../icons/chevron-down-icon'
import { CollectionView } from './collection-view'
import { PropertyImplMemo } from './property'
import { PageIcon } from '../components/page-icon'
import {
  NotionContext,
  NotionContextProvider,
  useNotionContext
} from '../context'
import { cs } from '../utils'

const isServer = typeof window === 'undefined'

export const Collection: React.FC<{
  block:
  | types.CollectionViewBlock
  | types.CollectionViewPageBlock
  | types.PageBlock
  className?: string
  ctx: NotionContext
}> = ({ block, className, ctx }) => {
  /**
   * NOTE: there is a weird side effect of us using multiple bundles for
   * collections, where `useNotionContext` returns a *different* context than for
   * the main bundle.
   *
   * This is due to `React.createContext` being called in each bundle which includes
   * `../context.ts`.
   *
   * To circumvent this issue, we're passing the context value directly to
   * `Collection` so all children have the correct context values.
   */
  // console.log('Collection', Object.keys(recordMap.block).length)

  const context: NotionContext = React.useMemo(
    () => ({
      ...ctx
    }),
    [ctx]
  )

  if (block.type === 'page') {
    if (block.parent_table !== 'collection') {
      return null
    }
    console.log(block);

    return (
      <NotionContextProvider {...context}>
        <div className='notion-collection-page-properties'>
          <CollectionRow
            block={block as types.PageBlock}
            pageHeader={true}
            className={className}
          />
        </div>
      </NotionContextProvider>
    )
  } else {

    return (
      <NotionContextProvider {...context}>
        <CollectionViewBlock block={block} className={className} />
      </NotionContextProvider>
    )
  }
}

const CollectionViewBlock: React.FC<{
  block: types.CollectionViewBlock | types.CollectionViewPageBlock
  className?: string
}> = ({ block, className }) => {
  const { recordMap, showCollectionViewDropdown } = useNotionContext()
  const [isMounted, setIsMounted] = React.useState(false)
  const { view_ids: viewIds } = block
  const defaultCollectionViewId = viewIds[0]
  const [collectionState, setCollectionState] = useLocalStorage(block.id, {
    collectionViewId: defaultCollectionViewId
  })

  const collectionViewId = (isMounted && viewIds.find((id) => id === collectionState.collectionViewId)) || defaultCollectionViewId

  const collectionView = recordMap.collection_view[collectionViewId]?.value
  const collectionId = collectionView.format?.collection_pointer?.id || block.collection_id || block.format?.collection_pointer?.id
  // getBlockCollectionId(block, recordMap)


  const collection = recordMap.collection[collectionId]?.value

  const collectionData =
    recordMap.collection_query[collectionId]?.[collectionViewId]
  const parentPage = getBlockParentPage(block, recordMap)


  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  React.useEffect(() => {
    Array.from(document.querySelectorAll('[data-tip]')).forEach((el: HTMLElement) => {
      if (el.querySelectorAll('.tooltip').length === 0) {
        const tip = document.createElement('div');
        tip.classList.add('tooltip');
        tip.innerHTML += `<div class='tooltip-header notion-text'>Preview</div>
                         <div class='tooltip-body'>
                          ${el.getAttribute('data-tip')}
                          <div class=''>...</div>
                         </div>
                         <div class='tooltip-footer notion-text'>Click to Read More</div>`
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
    return () => {
      Array.from(document.querySelectorAll('.tooltip')).forEach(el => {
        el.remove()
      })
    }
  }, [collectionState])

  const onChangeView = React.useCallback(
    (collectionViewId: string) => {
      console.log('change collection view', collectionViewId)

      setCollectionState({
        ...collectionState,
        collectionViewId
      })
    },
    [collectionState, setCollectionState]
  )

  let { width: windowWidth } = useWindowSize()
  if (isServer) {
    windowWidth = 1024
  }



  const { width, padding } = React.useMemo(() => {
    const style: React.CSSProperties = {}

    if (collectionView?.type !== 'table' && collectionView?.type !== 'board') {
      return {
        style,
        width: 0,
        padding: 0
      }
    }

    const width = windowWidth
    // TODO: customize for mobile?
    const maxNotionBodyWidth = 708
    let notionBodyWidth = maxNotionBodyWidth

    if (parentPage?.format?.page_full_width) {
      notionBodyWidth = (width - 2 * Math.min(96, width * 0.08)) | 0
    } else {
      notionBodyWidth =
        width < maxNotionBodyWidth
          ? (width - width * 0.02) | 0 // 2vw
          : maxNotionBodyWidth
    }

    const padding =
      isServer && !isMounted ? 96 : ((width - notionBodyWidth) / 2) | 0
    style.paddingLeft = padding
    style.paddingRight = padding

    return {
      style,
      width,
      padding
    }
  }, [windowWidth, parentPage, collectionView?.type, isMounted])

  if (!(collection && collectionView && collectionData)) {
    console.warn('skipping missing collection view for block', block.id, {
      collectionId,
      collectionViewId,
      collectionView,
      collectionData,
      recordMap
    })
    return null
  }

  const title = getTextContent(collection.name).trim()
  if (collection.icon) {
    block.format = {
      ...block.format,
      page_icon: collection.icon
    }
  }

  return (
    <div className={cs('self-center w-full', className)}>
      <div className='h-auto px-2 py-4'>
        {viewIds.length > 1 && showCollectionViewDropdown && (
          <CollectionViewTab
            collectionView={collectionView}
            collectionViewId={collectionViewId}
            viewIds={viewIds}
            onChangeView={onChangeView}
          />
        )}
      </div>

      <CollectionView
        collection={collection}
        collectionView={collectionView}
        collectionData={collectionData}
        padding={padding}
        width={width}
      />
    </div>
  )
}

const CollectionViewTab: React.FC<{
  collectionViewId: string
  collectionView: types.CollectionView
  viewIds: string[]
  onChangeView: (viewId: string) => unknown
}> = ({ collectionViewId, viewIds, onChangeView }) => {
  const { recordMap } = useNotionContext()

  return (
    <div className='flex flex-wrap justify-center w-full'>
      {viewIds.map((viewId) => (
        <div
          key={viewId}
          onClick={() => onChangeView(viewId)}
          className={cs(
            'cursor-pointer px-1 py-2 hover:text-fuchsia-600 hover:text-lg hover:font-bold hover:text-shadow shadow-fuchsia-900 ',
            collectionViewId === viewId ?
              'text-fuchsia-600 text-shadow shadow-fuchsia-900 text-lg font-bold' : "text-zinc-500"
          )}
        >
          <CollectionViewColumnDesc
            collectionView={recordMap.collection_view[viewId]?.value}
          />
        </div>
      ))}
    </div>
  )
}

const CollectionViewColumnDesc: React.FC<{
  collectionView: types.CollectionView
  className?: string
  children?: React.ReactNode
}> = ({ collectionView, className, children, ...rest }) => {
  const { type } = collectionView
  const name =
    collectionView.name || `${type[0].toUpperCase()}${type.slice(1)} view`

  return (
    <div className={cs('flex items-center', className)} {...rest}>

      <span className='overflow-hidden whitespace-nowrap text-ellipsis'>{name}</span>

      {children}
    </div>
  )
}

export { PropertyImplMemo as Property }
