import React from 'react'
import { AudioProvider } from './audio'

export const PlayerProvider = ({children}: React.PropsWithChildren) => {
  return (
    <AudioProvider>{children}</AudioProvider>
  )
}
