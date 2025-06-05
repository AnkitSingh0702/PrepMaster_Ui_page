"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { setChapters } from "@/lib/features/chaptersSlice"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ChapterList } from "@/components/chapter-list"
import { MobileHeader } from "@/components/mobile-header"
import type { Chapter } from "@/lib/types"

export function MainLayout() {
  const dispatch = useDispatch()
  const { chapters, activeSubject, filters, sortOrder } = useSelector((state: RootState) => state.chapters)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Load chapters data
    fetch("/data/chapters.json")
      .then((res) => res.json())
      .then((data: Chapter[]) => {
        dispatch(setChapters(data))
      })
      .catch((error) => console.error("Error loading chapters:", error))
  }, [dispatch])

  const filteredChapters = chapters.filter((chapter) => {
    if (chapter.subject !== activeSubject) return false

    if (filters.classes.length > 0 && !filters.classes.includes(chapter.class)) return false
    if (filters.units.length > 0 && !filters.units.includes(chapter.unit)) return false
    if (filters.notStarted && chapter.status !== "Not Started") return false
    if (filters.weakChapters && !chapter.isWeakChapter) return false

    return true
  })

  const sortedChapters = [...filteredChapters].sort((a, b) => {
    const totalA = Object.values(a.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)
    const totalB = Object.values(b.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)

    return sortOrder === "asc" ? totalA - totalB : totalB - totalA
  })

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />
        <div className="p-4">
          <ChapterList chapters={sortedChapters} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <ChapterList chapters={sortedChapters} />
        </main>
      </div>
    </div>
  )
}
