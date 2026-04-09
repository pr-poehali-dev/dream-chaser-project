import { motion } from "framer-motion"
import { CheckCircle2, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

export function HowItWorksSection() {
  const steps = [
    {
      iconName: "UserPlus",
      title: "Зарегистрируйтесь",
      description:
        "Создайте аккаунт за 1 минуту. Укажите класс ребёнка, и программа автоматически подберёт подходящие задания по русскому языку.",
      visual: (
        <div className="h-[280px] flex items-center justify-center">
          <Card className="w-full p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🦔</span>
                <div>
                  <p className="font-bold font-display">Привет! Я Ёжик</p>
                  <p className="text-sm text-muted-foreground">Буду помогать учиться</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-background/50 rounded-xl border border-primary/10">
                  <p className="text-xs text-muted-foreground mb-1">Имя ребёнка</p>
                  <p className="text-sm font-semibold">Маша</p>
                </div>
                <div className="p-3 bg-background/50 rounded-xl border border-primary/10">
                  <p className="text-xs text-muted-foreground mb-1">Класс</p>
                  <p className="text-sm font-semibold">2 класс</p>
                </div>
                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <p className="text-sm font-medium text-primary">Программа готова!</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      iconName: "BookOpen",
      title: "Выполняйте задания",
      description:
        "Каждый день — новые упражнения на правила, диктанты и работу над ошибками. Задания разнообразные и интересные — ребёнок не заскучает.",
      visual: (
        <div className="h-[280px] flex items-center justify-center">
          <Card className="w-full p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Сегодняшние задания</p>
                <span className="text-xs text-primary font-bold">2/5 выполнено</span>
              </div>
              {[
                { title: "Безударные гласные", done: true },
                { title: "Парные согласные", done: true },
                { title: "Мягкий знак", done: false },
                { title: "Разделительный ъ", done: false },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3 p-2.5 bg-background/50 rounded-xl">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-primary" : "bg-border"}`}>
                    {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <p className={`text-sm ${item.done ? "line-through text-muted-foreground" : "font-medium"}`}>{item.title}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ),
    },
    {
      iconName: "Trophy",
      title: "Получайте награды",
      description:
        "За правильные ответы ребёнок зарабатывает звёзды и медали. Следите за успехами и отмечайте достижения вместе с ребёнком!",
      visual: (
        <div className="h-[280px] flex items-center justify-center">
          <Card className="w-full p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Достижения Маши</p>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+3 сегодня</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["🏆", "⭐", "📚", "🎯", "🦔", "✨"].map((emoji, i) => (
                  <div key={i} className={`p-3 rounded-xl text-center text-2xl ${i < 4 ? "bg-primary/10" : "bg-background/30 opacity-40"}`}>
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-primary/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Звёзд собрано</p>
                  <p className="text-lg font-bold text-primary">142 ⭐</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Серия дней</p>
                  <p className="text-lg font-bold text-primary">7 🔥</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <section className="py-20 bg-background" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Как работает программа</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Три простых шага — и ребёнок уже занимается русским языком
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="mb-6">{step.visual}</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={step.iconName} className="h-5 w-5 text-primary" fallback="BookOpen" />
                </div>
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
