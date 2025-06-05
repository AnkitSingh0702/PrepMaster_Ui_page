"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { setActiveSubject } from "@/lib/features/chaptersSlice"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Atom, FlaskConical, Calculator } from "lucide-react"

const subjects = [
  { id: "Physics", name: "Physics PYQs", icon: Atom, color: "bg-orange-500" },
  { id: "Chemistry", name: "Chemistry PYQs", icon: FlaskConical, color: "bg-green-500" },
  { id: "Mathematics", name: "Mathematics PYQs", icon: Calculator, color: "bg-blue-500" },
]

export function Sidebar() {
  const dispatch = useDispatch()
  const { activeSubject, chapters } = useSelector((state: RootState) => state.chapters)

  const getSubjectStats = (subject: string) => {
    const subjectChapters = chapters.filter((ch) => ch.subject === subject)
    const totalPapers = subjectChapters.length
    const totalQuestions = subjectChapters.reduce(
      (sum, ch) => sum + Object.values(ch.yearWiseQuestionCount).reduce((s, c) => s + c, 0),
      0,
    )
    return { totalPapers, totalQuestions }
  }

  return (
    <div className="w-64 bg-card border-r border-border p-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">J</span>
          </div>
          <h1 className="text-xl font-bold">JEE Main</h1>
        </div>
        <p className="text-sm text-muted-foreground">2025 - 2009 | 173 Papers | 15825 Qs</p>
      </div>

      <div className="space-y-2">
        {subjects.map((subject) => {
          const stats = getSubjectStats(subject.id)
          const Icon = subject.icon

          return (
            <Button
              key={subject.id}
              variant={activeSubject === subject.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12",
                activeSubject === subject.id && "bg-primary text-primary-foreground",
              )}
              onClick={() => dispatch(setActiveSubject(subject.id))}
            >
              <div className={cn("w-6 h-6 rounded flex items-center justify-center", subject.color)}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{subject.name}</div>
                <div className="text-xs opacity-70">
                  {stats.totalPapers} Papers | {stats.totalQuestions} Qs
                </div>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
