import * as React from 'react'
import { LoadingIcon } from './LoadingIcon'

import styles from './styles.module.css'

export const Loading: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center min-h-[100vh]">
    <LoadingIcon />
  </div>
)
