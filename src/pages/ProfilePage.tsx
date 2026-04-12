import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { useProfile } from "@/hooks/useProfile"
import type { Grade } from "@/hooks/useProfile"

const gradeEmojis: Record<Grade, string> = { 1: "🔤", 2: "✏️", 3: "📖", 4: "🎓" }

function ScoreBadge({ score, total }: { score: number; total: number }) {
  const pct = score / total
  const color = pct >= 0.8 ? "text-green-600 bg-green-100" : pct >= 0.5 ? "text-yellow-600 bg-yellow-100" : "text-red-500 bg-red-100"
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>
      {score}/{total}
    </span>
  )
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const { history, stars, totalScore, totalTasks, accuracy, streak, clearHistory } = useProfile()
  const [activeTab, setActiveTab] = useState<"history" | "medals">("history")

  const medals = [
    { emoji: "🏆", title: "Знаток 1 класса", desc: "Пройдено задание за 1 класс", earned: history.some(h => h.grade === 1) },
    { emoji: "✏️", title: "Знаток 2 класса", desc: "Пройдено задание за 2 класс", earned: history.some(h => h.grade === 2) },
    { emoji: "📖", title: "Знаток 3 класса", desc: "Пройдено задание за 3 класс", earned: history.some(h => h.grade === 3) },
    { emoji: "🎓", title: "Знаток 4 класса", desc: "Пройдено задание за 4 класс", earned: history.some(h => h.grade === 4) },
    { emoji: "⭐", title: "Отличник", desc: "Получено 10/10 в одном задании", earned: history.some(h => h.score === h.total) },
    { emoji: "🔥", title: `Серия ${streak} дней`, desc: "Занимался несколько дней подряд", earned: streak >= 2 },
    { emoji: "📚", title: "Прилежный", desc: "Выполнено 5 заданий", earned: history.length >= 5 },
    { emoji: "🦔", title: "Буквоёжка", desc: "Пройдены все 4 класса", earned: [1, 2, 3, 4].every(g => history.some(h => h.grade === g as Grade)) },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="text-xl font-bold font-display flex items-center gap-2">
            <span className="text-2xl">🦔</span>
            <span className="text-primary">Буквоёжка</span>
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ChevronLeft" className="h-4 w-4" />
            На главную
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-3xl">

        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-5xl shrink-0">🦔</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-display">Мой профиль</h1>
            <p className="text-muted-foreground text-sm">
              {history.length > 0 ? `${history.length} заданий выполнено` : "Ещё нет выполненных заданий"}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-3xl">⭐</span>
            <span className="text-2xl font-bold font-display text-amber-500">{stars}</span>
            <span className="text-xs text-amber-600 font-medium">звёзд</span>
          </div>
        </motion.div>

        {/* Empty state */}
        {history.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Card className="p-10 text-center border-dashed border-2">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold font-display mb-2">История пуста</h3>
              <p className="text-muted-foreground mb-6">Выполни задания в демо — они появятся здесь</p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Перейти к заданиям
              </button>
            </Card>
          </motion.div>
        )}

        {history.length > 0 && (
          <>
            {/* Stats row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Заданий выполнено", value: history.length, icon: "BookOpen" },
                { label: "Правильных ответов", value: `${totalScore}/${totalTasks}`, icon: "CheckCircle2" },
                { label: "Точность", value: `${accuracy}%`, icon: "Target" },
              ].map((stat, i) => (
                <Card key={i} className="p-4 text-center">
                  <Icon name={stat.icon} className="h-5 w-5 text-primary mx-auto mb-2" fallback="Star" />
                  <div className="text-2xl font-bold font-display text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </Card>
              ))}
            </motion.div>

            {/* Streak */}
            {streak >= 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="mb-6">
                <Card className="p-4 flex items-center gap-4 bg-primary/5 border-primary/20">
                  <span className="text-4xl">🔥</span>
                  <div>
                    <p className="font-bold font-display">Серия: {streak} {streak === 1 ? "день" : streak < 5 ? "дня" : "дней"}!</p>
                    <p className="text-sm text-muted-foreground">Продолжай заниматься каждый день</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {Array.from({ length: Math.min(streak, 7) }).map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">✓</div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <div className="flex gap-2 mb-6">
                {(["history", "medals"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "history" ? "📋 История заданий" : "🏅 Медали"}
                  </button>
                ))}
              </div>

              {/* History */}
              {activeTab === "history" && (
                <div className="space-y-3">
                  {history.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                      <Card className="p-4 flex items-center gap-4 hover:border-primary/40 transition-colors">
                        <div className="text-2xl">{gradeEmojis[item.grade]}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{item.topic}</p>
                          <p className="text-xs text-muted-foreground">{item.grade} класс · {item.date} в {item.time}</p>
                        </div>
                        <ScoreBadge score={item.score} total={item.total} />
                      </Card>
                    </motion.div>
                  ))}
                  <button onClick={clearHistory} className="w-full mt-2 text-xs text-muted-foreground hover:text-destructive transition-colors py-2">
                    Очистить историю
                  </button>
                </div>
              )}

              {/* Medals */}
              {activeTab === "medals" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {medals.map((medal, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.06 }}>
                      <Card className={`p-5 text-center transition-all ${medal.earned ? "border-primary/30 bg-primary/5" : "opacity-40 grayscale"}`}>
                        <div className="text-4xl mb-2">{medal.emoji}</div>
                        <p className="font-bold font-display text-sm">{medal.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{medal.desc}</p>
                        {!medal.earned && <p className="text-xs text-muted-foreground mt-2">🔒</p>}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}