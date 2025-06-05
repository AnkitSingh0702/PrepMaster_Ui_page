import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Chapter, ChapterFilters } from "@/lib/types"

interface ChaptersState {
  chapters: Chapter[]
  activeSubject: string
  filters: ChapterFilters
  sortOrder: "asc" | "desc"
}

const initialState: ChaptersState = {
  chapters: [],
  activeSubject: "Physics",
  filters: {
    classes: [],
    units: [],
    notStarted: false,
    weakChapters: false,
  },
  sortOrder: "desc",
}

const chaptersSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    setChapters: (state, action: PayloadAction<Chapter[]>) => {
      state.chapters = action.payload
    },
    setActiveSubject: (state, action: PayloadAction<string>) => {
      state.activeSubject = action.payload
      state.filters = {
        classes: [],
        units: [],
        notStarted: false,
        weakChapters: false,
      }
    },
    setFilters: (state, action: PayloadAction<ChapterFilters>) => {
      state.filters = action.payload
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload
    },
  },
})

export const { setChapters, setActiveSubject, setFilters, setSortOrder } = chaptersSlice.actions
export default chaptersSlice.reducer
