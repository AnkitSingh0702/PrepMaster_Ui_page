"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { setActiveSubject, setFilters, setSortOrder } from "@/lib/features/chaptersSlice"
import { Button } from "@/components/ui/button"
import { ArrowLeft, SortAsc, SortDesc } from "lucide-react"
import { MultiSelect } from "@/components/multi-select"

const subjects = [
  { id: "Physics", name: "Phy", color: "bg-orange-500" },
  { id: "Chemistry", name: "Chem", color: "bg-green-500" },
  { id: "Mathematics", name: "Math", color: "bg-blue-500" },
]

export function MobileHeader() {
  const dispatch = useDispatch()
  const { chapters, activeSubject, filters, sortOrder } = useSelector((state: RootState) => state.chapters)

  const subjectChapters = chapters.filter((ch) => ch.subject === activeSubject)
  const uniqueClasses = [...new Set(subjectChapters.map((ch) => ch.class))]
  const uniqueUnits = [...new Set(subjectChapters.map((ch) => ch.unit))]

  const filteredCount = subjectChapters.filter((chapter) => {
    if (filters.classes.length > 0 && !filters.classes.includes(chapter.class)) return false
    if (filters.units.length > 0 && !filters.units.includes(chapter.unit)) return false
    if (filters.notStarted && chapter.status !== "Not Started") return false
    if (filters.weakChapters && !chapter.isWeakChapter) return false
    return true
  }).length

  return (
    <div className="bg-card border-b border-border">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">JEE Main</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">09:00</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-1 px-4 pb-4">
        {subjects.map((subject) => (
          <Button
            key={subject.id}
            variant={activeSubject === subject.id ? "default" : "outline"}
            size="sm"
            className={`flex-1 gap-2 ${activeSubject === subject.id ? subject.color : ""}`}
            onClick={() => dispatch(setActiveSubject(subject.id))}
          >
            <div className={`w-4 h-4 rounded ${subject.color}`}></div>
            {subject.name}
          </Button>
        ))}
      </div>

      <div className="px-4 pb-4 space-y-3">
        <div className="flex gap-2 overflow-x-auto">
          <MultiSelect
            placeholder="Class"
            options={uniqueClasses.map((cls) => ({ label: cls, value: cls }))}
            selected={filters.classes}
            onChange={(values) => dispatch(setFilters({ ...filters, classes: values }))}
          />

          <MultiSelect
            placeholder="Units"
            options={uniqueUnits.map((unit) => ({ label: unit, value: unit }))}
            selected={filters.units}
            onChange={(values) => dispatch(setFilters({ ...filters, units: values }))}
          />

          <Button
            variant={filters.notStarted ? "default" : "outline"}
            size="sm"
            onClick={() => dispatch(setFilters({ ...filters, notStarted: !filters.notStarted }))}
          >
            Not Started
          </Button>

          <Button
            variant={filters.weakChapters ? "default" : "outline"}
            size="sm"
            onClick={() => dispatch(setFilters({ ...filters, weakChapters: !filters.weakChapters }))}
          >
            Weak
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Showing all chapters ({filteredCount})</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"))}
            className="gap-2"
          >
            {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            Sort
          </Button>
        </div>
      </div>
    </div>
  )
}
