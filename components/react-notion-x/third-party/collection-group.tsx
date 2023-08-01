import * as React from 'react'

import { CollectionGroupProps } from '../types'
import { Property } from './property'

export const CollectionGroup: React.FC<CollectionGroupProps> = ({
  collectionViewComponent: CollectionViewComponent,
  collection,
  index,
  collectionGroup,
  schema,
  value,
  hidden,
  summaryProps,
  detailsProps,
  ...rest
}) => {
  
  const [isOpen, setIsOpen] = React.useState(index === 0 ? true : false)
  if (hidden || !(collectionGroup?.total || collectionGroup.blockIds.length)) return null
  
  return (
    <div className='notion-collection-group' {...detailsProps}>
      <div className='notion-collection-group-title' onClick={()=>setIsOpen(!isOpen)} {...summaryProps}>
        <div style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
          <Property schema={schema} data={[[value]]} collection={collection} />

          <div className='notion-board-th-count'>
          { ` ${collectionGroup?.total || collectionGroup.blockIds.length} items`}
          </div>
        </div>
      </div>

    {isOpen && <CollectionViewComponent
        collection={collection}
        collectionGroup={collectionGroup}
        {...rest}
      />}
    </div>
  )
}
