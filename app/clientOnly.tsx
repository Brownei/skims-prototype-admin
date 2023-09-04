//This component is to protect the app from hydration errors in the app.
"use client"

import { useEffect, useState } from 'react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const ClientOnly = ({children}: Props) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if(!hasMounted) {
        return null
    }
  return (
    <>
      {children}
    </>
  )
}

export default ClientOnly