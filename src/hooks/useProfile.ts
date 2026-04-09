import { useState, useCallback } from "react"

export type Grade = 1 | 2 | 3 | 4

export type HistoryEntry = {
  id: string
  grade: Grade
  topic: string
  score: number
  total: number
  date: string
  time: string
}

const STORAGE_KEY = "bukvoezhka_history"

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveHistory(history: HistoryEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

export function useProfile() {
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory)

  const addResult = useCallback((grade: Grade, topic: string, score: number, total: number) => {
    const now = new Date()
    const entry: HistoryEntry = {
      id: `${Date.now()}`,
      grade,
      topic,
      score,
      total,
      date: now.toLocaleDateString("ru-RU"),
      time: now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    }
    setHistory((prev) => {
      const updated = [entry, ...prev]
      saveHistory(updated)
      return updated
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const totalScore = history.reduce((a, b) => a + b.score, 0)
  const totalTasks = history.reduce((a, b) => a + b.total, 0)
  const accuracy = totalTasks > 0 ? Math.round((totalScore / totalTasks) * 100) : 0

  const streak = (() => {
    if (history.length === 0) return 0
    const dates = [...new Set(history.map((h) => h.date))].sort((a, b) => {
      const [da, ma, ya] = a.split(".").map(Number)
      const [db, mb, yb] = b.split(".").map(Number)
      return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime()
    })
    let count = 1
    for (let i = 1; i < dates.length; i++) {
      const [d1, m1, y1] = dates[i - 1].split(".").map(Number)
      const [d2, m2, y2] = dates[i].split(".").map(Number)
      const diff = (new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime()) / 86400000
      if (diff === 1) count++
      else break
    }
    return count
  })()

  return { history, addResult, clearHistory, totalScore, totalTasks, accuracy, streak }
}
