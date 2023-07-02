import React from 'react'
import { VolumeHighIcon } from '@/icons/volume-high'
import { VolumeTracker } from './volume-tracker'

export const VolumeControl = () => {
  return (
    <div className='volume-controls'>
      <VolumeHighIcon />
      <VolumeTracker />
    </div>
  )
}
