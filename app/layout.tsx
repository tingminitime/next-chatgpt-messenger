import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Sidebar from '@/components/Sidebar'
import Login from '@/components/Login'
import SessionProvider from '@/contexts/SessionProvider'
import ToastProvider from '@/contexts/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html
      lang="en"
      className={inter.className}
    >
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login></Login>
          ) : (
            <div className="flex">
              {/* Sidebar */}
              <div className="h-screen max-w-xs overflow-y-auto bg-my-black-dark md:min-w-[20rem]">
                <Sidebar></Sidebar>
              </div>

              {/* ClientProvider - Notification */}
              <ToastProvider></ToastProvider>

              <main className="flex-grow bg-my-black">{children}</main>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
