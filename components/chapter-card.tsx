"use client"

import type { Chapter } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"
import { getRandomIcon } from "@/lib/utils"

interface ChapterCardProps {
  chapter: Chapter
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const Icon = getRandomIcon(chapter.chapter)
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)
  const progressPercentage = chapter.questionSolved > 0 ? (chapter.questionSolved / totalQuestions) * 100 : 0

  const currentYear = Object.values(chapter.yearWiseQuestionCount)[
    Object.values(chapter.yearWiseQuestionCount).length - 1
  ]
  const previousYear = Object.values(chapter.yearWiseQuestionCount)[
    Object.values(chapter.yearWiseQuestionCount).length - 2
  ]
  const trend = currentYear > previousYear ? "up" : currentYear < previousYear ? "down" : "same"

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Not Started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium truncate">{chapter.chapter}</h3>
          {chapter.isWeakChapter && (
            <Badge variant="destructive" className="text-xs">
              Weak
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{chapter.class}</span>
          <span>{chapter.unit}</span>
          <Badge className={getStatusColor(chapter.status)}>{chapter.status}</Badge>
        </div>

        {chapter.questionSolved > 0 && (
          <div className="mt-2">
            <Progress value={progressPercentage} className="h-1" />
            <div className="text-xs text-muted-foreground mt-1">
              {chapter.questionSolved}/{totalQuestions} questions solved
            </div>
          </div>
        )}
      </div>

      <div className="text-right">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">2025: {chapter.yearWiseQuestionCount["2025"]}q</span>
          <span className="text-xs text-muted-foreground">2024: {chapter.yearWiseQuestionCount["2024"]}q</span>
          {trend === "up" && <TrendingUp className="w-3 h-3 text-green-500" />}
          {trend === "down" && <TrendingDown className="w-3 h-3 text-red-500" />}
        </div>

        <div className="text-xs text-muted-foreground">{totalQuestions}/205 Qs</div>
      </div>
    </div>
  )
}
