"use client"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "@/components/main-layout"

export default function Home() {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <MainLayout />
      </ThemeProvider>
    </Provider>
  )
}
