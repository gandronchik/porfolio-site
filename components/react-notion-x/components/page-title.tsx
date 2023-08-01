import * as React from 'react'
import { Block, Decoration } from 'notion-types'
import { getBlockTitle } from 'notion-utils'

import { cs } from '../utils'
import { useNotionContext } from '../context'
import { Text } from './text'
import { PageIcon } from './page-icon'
import { cn } from '@utils'

export const PageTitleImpl: React.FC<{
  block: Block
  className?: string
  defaultIcon?: string
  hideIcon?: bool
}> = ({ block, className, defaultIcon, hideIcon = false, ...rest }) => {
  const { recordMap } = useNotionContext()

  if (!block) return null

  if (
    block.type === 'collection_view_page' ||
    block.type === 'collection_view'
  ) {
    const title = getBlockTitle(block, recordMap)
    if (!title) {
      return null
    }

    const titleDecoration: Decoration[] = [[title]]

    return (
      <span className={cn('flex w-full items-center', className)} {...rest}>
        {!hideIcon && <PageIcon
          block={block}
          defaultIcon={defaultIcon}
          className='flex items-center justify-center h-5 w-5 shrink-0'
        />}

        <span className='relative whitespace-nowrap overflow-hidden text-ellipsis font-bold line-clamp-3'>
          <Text value={titleDecoration} block={block} />
        </span>
      </span>
    )
  }

  if (!block.properties?.title) {
    return null
  }

  return (
    <span className={cn('flex w-full items-center', className)} {...rest}>
      {!hideIcon && <PageIcon
        block={block}
        defaultIcon={defaultIcon}
        className='flex items-center justify-center h-5 w-5 shrink-0'
      />}

      <span className='relative whitespace-nowrap overflow-hidden text-ellipsis font-bold'>
        <Text value={block.properties?.title} block={block} />
      </span>
    </span>
  )
}

export const PageTitle = React.memo(PageTitleImpl)
