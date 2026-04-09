import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

type Task = {
  id: number
  type: "choice" | "input" | "order"
  label: string
  question: string
  hint?: string
  options?: string[]
  answer: string | string[]
  explanation: string
}

const tasks: Task[] = [
  {
    id: 1,
    type: "choice",
    label: "Вставь букву",
    question: "М_локо",
    hint: "Подбери проверочное слово",
    options: ["а", "о", "е"],
    answer: "о",
    explanation: "«Молоко» — словарное слово, пишется через «о»",
  },
  {
    id: 2,
    type: "choice",
    label: "Парные согласные",
    question: "Моро_",
    hint: "Что бывает зимой?",
    options: ["з", "с"],
    answer: "з",
    explanation: "«Морозы» — проверочное слово, пишем «з»",
  },
  {
    id: 3,
    type: "input",
    label: "Словарное слово",
    question: "Как правильно написать слово?",
    hint: "Птица с хохолком",
    options: [],
    answer: "воробей",
    explanation: "«Воробей» — словарное слово, запомни написание",
  },
  {
    id: 4,
    type: "choice",
    label: "Мягкий знак",
    question: "Ноч_",
    hint: "Нужен ли мягкий знак?",
    options: ["ь", "—"],
    answer: "ь",
    explanation: "Существительные женского рода с шипящей на конце пишутся с «ь»",
  },
  {
    id: 5,
    type: "choice",
    label: "Заглавная буква",
    question: "Река _олга",
    hint: "Это имя собственное?",
    options: ["В", "в"],
    answer: "В",
    explanation: "Названия рек — имена собственные, пишутся с заглавной буквы",
  },
]

type AnswerState = "idle" | "correct" | "wrong"

export function DemoSection() {
  const [current, setCurrent] = useState(0)
  const [answerState, setAnswerState] = useState<AnswerState>("idle")
  const [inputValue, setInputValue] = useState("")
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const task = tasks[current]

  const handleAnswer = (answer: string) => {
    const correct =
      typeof task.answer === "string"
        ? answer.trim().toLowerCase() === task.answer.toLowerCase()
        : false

    if (correct) {
      setScore((s) => s + 1)
      setAnswerState("correct")
    } else {
      setAnswerState("wrong")
    }

    setTimeout(() => {
      setAnswerState("idle")
      setInputValue("")
      if (current + 1 >= tasks.length) {
        setFinished(true)
      } else {
        setCurrent((c) => c + 1)
      }
    }, 1800)
  }

  const restart = () => {
    setCurrent(0)
    setScore(0)
    setFinished(false)
    setAnswerState("idle")
    setInputValue("")
  }

  return (
    <section className="py-20 bg-secondary/30 border-y border-border" id="demo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <span>✏️</span>
            <span>Попробуй прямо сейчас</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">Интерактивное демо</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Реши несколько заданий — точно как в программе. Без регистрации!
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {finished ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-8 text-center border-primary/30 shadow-lg shadow-primary/10">
                  <div className="text-6xl mb-4">
                    {score === tasks.length ? "🏆" : score >= 3 ? "⭐" : "🦔"}
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-2">
                    {score === tasks.length
                      ? "Отлично! Все верно!"
                      : score >= 3
                      ? "Хороший результат!"
                      : "Есть куда расти!"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Правильных ответов: <strong className="text-primary text-lg">{score}</strong> из {tasks.length}
                  </p>
                  <div className="flex gap-3 flex-col sm:flex-row justify-center">
                    <button
                      onClick={restart}
                      className="px-6 py-2.5 rounded-xl border border-border hover:border-primary/50 transition-colors font-medium text-sm"
                    >
                      Попробовать ещё раз
                    </button>
                    <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                      Начать учиться бесплатно
                    </button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <Card
                  className={`p-8 border-2 transition-colors duration-300 ${
                    answerState === "correct"
                      ? "border-green-400 bg-green-50/50"
                      : answerState === "wrong"
                      ? "border-red-400 bg-red-50/50"
                      : "border-border"
                  }`}
                >
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {task.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {current + 1} / {tasks.length}
                    </span>
                  </div>

                  <div className="h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${((current) / tasks.length) * 100}%` }}
                    />
                  </div>

                  {/* Question */}
                  <p className="text-3xl font-bold font-display text-center mb-2 tracking-wide">
                    {task.question}
                  </p>
                  {task.hint && (
                    <p className="text-center text-sm text-muted-foreground mb-6">
                      💡 {task.hint}
                    </p>
                  )}

                  {/* Feedback */}
                  <AnimatePresence>
                    {answerState !== "idle" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`text-center text-sm font-medium rounded-xl px-4 py-3 mb-4 ${
                          answerState === "correct"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {answerState === "correct" ? (
                          <span>✅ Правильно! {task.explanation}</span>
                        ) : (
                          <span>❌ Неверно. {task.explanation}</span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Answer area */}
                  {task.type === "choice" && task.options && (
                    <div className={`grid gap-3 ${task.options.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                      {task.options.map((opt) => (
                        <button
                          key={opt}
                          disabled={answerState !== "idle"}
                          onClick={() => handleAnswer(opt)}
                          className="py-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-center font-bold text-2xl font-display disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {task.type === "input" && (
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && inputValue && handleAnswer(inputValue)}
                        disabled={answerState !== "idle"}
                        placeholder="Напиши слово..."
                        className="w-full border-2 border-border rounded-2xl px-5 py-4 text-center text-xl font-bold font-display focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                      />
                      <button
                        onClick={() => inputValue && handleAnswer(inputValue)}
                        disabled={!inputValue || answerState !== "idle"}
                        className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Проверить
                        <Icon name="ArrowRight" className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* Score */}
                  <div className="flex items-center justify-center gap-1 mt-6">
                    {tasks.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i < current ? "w-6 bg-primary" : i === current ? "w-6 bg-primary/40" : "w-2 bg-muted-foreground/20"
                        }`}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
