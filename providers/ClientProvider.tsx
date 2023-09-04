"use client"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

export default function ClientProvider({children} : {
    children: ReactNode
}) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5, cacheTime: 1000 * 60 * 20}}
  }))
  return (
    <div>
        <QueryClientProvider client={queryClient}>
            {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </div>
  )
}
