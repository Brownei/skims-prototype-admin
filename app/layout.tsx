import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import "@uploadthing/react/styles.css";
import type { Metadata } from 'next'
import ClientOnly from '@/components/ClientOnly'
import ClientProvider from '@/providers/ClientProvider'


export const metadata: Metadata = {
  title: 'ADMIN',
  description: 'Generated for the admin of skim to maintain the products',
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {  

  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
          <ClientOnly>
            <Toaster />
          </ClientOnly>
        </ClientProvider>
      </body>
    </html>
  )
}
