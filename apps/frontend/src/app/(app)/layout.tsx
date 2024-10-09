import * as React from "react"

import Sidebar from "@/src/components/Sidebar"
import { Toaster } from "@/src/components/ui/toaster"
import { AuthProvider } from "@/src/contexts/AuthContext"
import ModalProvider from "@/src/contexts/ModalProvider"
import QueryProvider from "@/src/contexts/QueryProvider"
import SearchBar from "@/src/components/Shortcut/SearchBar"
interface Props {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ModalProvider>
          <div>
            <SearchBar />
            <main className="flex h-screen bg-background">
              <div className="fixed inset-y-0 z-50 flex">
                <Sidebar />
              </div>
              <section className="flex-1">{children}</section>
              <Toaster />
            </main>
          </div>
        </ModalProvider>
      </QueryProvider>
    </AuthProvider>
  )
}

export default AppLayout
