"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { setFilters, setSortOrder } from "@/lib/features/chaptersSlice"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SortAsc, SortDesc } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MultiSelect } from "@/components/multi-select"

export function Header() {
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
    <div className="border-b border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{activeSubject} PYQs</h2>
            <p className="text-sm text-muted-foreground">Chapter-wise Collection of {activeSubject} PYQs</p>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-4 mb-4">
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

        <div className="flex items-center space-x-2">
          <Checkbox
            id="not-started"
            checked={filters.notStarted}
            onCheckedChange={(checked) => dispatch(setFilters({ ...filters, notStarted: checked as boolean }))}
          />
          <label htmlFor="not-started" className="text-sm font-medium">
            Not Started
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="weak-chapters"
            checked={filters.weakChapters}
            onCheckedChange={(checked) => dispatch(setFilters({ ...filters, weakChapters: checked as boolean }))}
          />
          <label htmlFor="weak-chapters" className="text-sm font-medium">
            Weak Chapters
          </label>
        </div>
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
  )
}
