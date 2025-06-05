"use client"

import type { Chapter } from "@/lib/types"
import { ChapterCard } from "@/components/chapter-card"

interface ChapterListProps {
  chapters: Chapter[]
}

export function ChapterList({ chapters }: ChapterListProps) {
  return (
    <div className="space-y-2">
      {chapters.map((chapter, index) => (
        <ChapterCard key={`${chapter.subject}-${chapter.chapter}`} chapter={chapter} />
      ))}
    </div>
  )
}
