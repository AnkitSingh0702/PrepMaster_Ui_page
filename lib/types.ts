export interface Chapter {
  subject: string
  chapter: string
  class: string
  unit: string
  yearWiseQuestionCount: {
    [year: string]: number
  }
  questionSolved: number
  status: "Not Started" | "In Progress" | "Completed"
  isWeakChapter: boolean
}

export interface ChapterFilters {
  classes: string[]
  units: string[]
  notStarted: boolean
  weakChapters: boolean
}
