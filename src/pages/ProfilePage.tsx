import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

type Grade = 1 | 2 | 3 | 4

const gradeEmojis: Record<Grade, string> = { 1: "🔤", 2: "✏️", 3: "📖", 4: "🎓" }

const mockHistory = [
  { id: 1, grade: 1 as Grade, topic: "Знакомство с буквами", score: 9, total: 10, date: "09.04.2026", time: "10:23" },
  { id: 2, grade: 1 as Grade, topic: "Гласные и согласные", score: 7, total: 10, date: "08.04.2026", time: "15:41" },
  { id: 3, grade: 2 as Grade, topic: "ЖИ-ШИ, ЧА-ЩА", score: 10, total: 10, date: "07.04.2026", time: "09:15" },
  { id: 4, grade: 2 as Grade, topic: "Безударные гласные", score: 6, total: 10, date: "06.04.2026", time: "17:02" },
  { id: 5, grade: 3 as Grade, topic: "Части речи", score: 8, total: 10, date: "05.04.2026", time: "11:30" },
  { id: 6, grade: 3 as Grade, topic: "Построение предложений", score: 5, total: 10, date: "04.04.2026", time: "14:55" },
  { id: 7, grade: 4 as Grade, topic: "Падежи", score: 7, total: 10, date: "03.04.2026", time: "16:10" },
]

const medals = [
  { emoji: "🏆", title: "Знаток 1 класса", desc: "Пройдено 10 заданий", earned: true },
  { emoji: "⭐", title: "Отличник", desc: "Все ответы верны", earned: true },
  { emoji: "🔥", title: "Серия 7 дней", desc: "Занимался 7 дней подряд", earned: true },
  { emoji: "📚", title: "Читатель", desc: "Пройдено 50 заданий", earned: true },
  { emoji: "🎯", title: "Меткий", desc: "10 заданий без ошибок", earned: false },
  { emoji: "🦔", title: "Буквоёжка", desc: "Пройдены все классы", earned: false },
]

const totalScore = mockHistory.reduce((a, b) => a + b.score, 0)
const totalTasks = mockHistory.reduce((a, b) => a + b.total, 0)
const accuracy = Math.round((totalScore / totalTasks) * 100)

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
  const [activeTab, setActiveTab] = useState<"history" | "medals">("history")

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-xl font-bold font-display flex items-center gap-2"
          >
            <span className="text-2xl">🦔</span>
            <span className="text-primary">Буквоёжка</span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ChevronLeft" className="h-4 w-4" />
            На главную
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-3xl">

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-5 mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-5xl shrink-0">
            🦔
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display">Маша</h1>
            <p className="text-muted-foreground text-sm">2 класс · занимается с марта 2026</p>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: "Заданий выполнено", value: mockHistory.length, icon: "BookOpen" },
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8"
        >
          <Card className="p-4 flex items-center gap-4 bg-primary/5 border-primary/20">
            <span className="text-4xl">🔥</span>
            <div>
              <p className="font-bold font-display">Серия: 7 дней подряд!</p>
              <p className="text-sm text-muted-foreground">Продолжай — до рекорда осталось 3 дня</p>
            </div>
            <div className="ml-auto flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${i < 7 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {i < 7 ? "✓" : ""}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex gap-2 mb-6">
            {(["history", "medals"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "history" ? "📋 История заданий" : "🏅 Медали"}
              </button>
            ))}
          </div>

          {/* History tab */}
          {activeTab === "history" && (
            <div className="space-y-3">
              {mockHistory.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
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
            </div>
          )}

          {/* Medals tab */}
          {activeTab === "medals" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {medals.map((medal, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <Card className={`p-5 text-center transition-all ${medal.earned ? "border-primary/30 bg-primary/5" : "opacity-40 grayscale"}`}>
                    <div className="text-4xl mb-2">{medal.emoji}</div>
                    <p className="font-bold font-display text-sm">{medal.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{medal.desc}</p>
                    {!medal.earned && (
                      <p className="text-xs text-muted-foreground mt-2">🔒 Не получена</p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
