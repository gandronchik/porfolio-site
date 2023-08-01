import * as React from 'react'
import { PageBlock } from 'notion-types'

import { CollectionViewProps } from '../types'
import { cs } from '../utils'
import { getCollectionGroups } from './collection-utils'
import { useNotionContext } from '../context'
import { CollectionCard } from './collection-card'
import { CollectionGroup } from './collection-group'

const defaultBlockIds = []

export const CollectionViewGallery: React.FC<CollectionViewProps> = ({
  collection,
  collectionView,
  collectionData
}) => {
  const isGroupedCollection = collectionView?.format?.collection_group_by

  if (isGroupedCollection) {
    const collectionGroups = getCollectionGroups(
      collection,
      collectionView,
      collectionData
    )

    return collectionGroups.map((group, index) => (
      <CollectionGroup
        key={index}
        index={index}
        {...group}
        collectionViewComponent={Gallery}
      />
    ))
  }

  const blockIds =
    (collectionData['collection_group_results']?.blockIds ??
      collectionData.blockIds) ||
    defaultBlockIds

  return (
    <Gallery
      collectionView={collectionView}
      collection={collection}
      blockIds={blockIds}
    />
  )
}

function Gallery({ blockIds, collectionView, collection }) {
  const { recordMap } = useNotionContext()
  const {
    gallery_cover = { type: 'none' },
    gallery_cover_size = 'medium',
    gallery_cover_aspect = 'cover'
  } = collectionView.format || {}

  return (
    <div className='self-center'>
      <div className='relative'>
        <div
          className='grid gap-6 md:gap-6vmin lg:grid-cols-3 min-h-300px'

        >
          {(blockIds && blockIds.length) ? blockIds.map((blockId) => {
            const block = recordMap.block[blockId]?.value as PageBlock
            if (!block) return null

            return (
              <CollectionCard
                collection={collection}
                block={block}
                cover={gallery_cover}
                coverSize={gallery_cover_size}
                coverAspect={gallery_cover_aspect}
                properties={collectionView.format?.gallery_properties}
                key={blockId}
              />
            )
          }) :
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center text-xl font-bold opacity-70">No Result</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
