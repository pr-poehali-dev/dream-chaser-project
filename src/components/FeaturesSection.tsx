import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

export function FeaturesSection() {
  const features = [
    {
      icon: "BookOpen",
      title: "Сотни заданий",
      description: "Правила, диктанты, вставь букву, найди ошибку — задания охватывают всю программу 1–4 класса.",
    },
    {
      icon: "Star",
      title: "Игровой формат",
      description: "Медали, звёзды и уровни мотивируют ребёнка заниматься каждый день без принуждения.",
    },
    {
      icon: "BarChart3",
      title: "Прогресс ребёнка",
      description: "Родители видят, какие темы усвоены, где есть пробелы и сколько времени занимался ребёнок.",
    },
    {
      icon: "GraduationCap",
      title: "По программе школы",
      description: "Задания соответствуют ФГОС и темам учебников «Школа России», «Перспектива» и других.",
    },
    {
      icon: "Sparkles",
      title: "Адаптация под уровень",
      description: "Программа подстраивается под знания ребёнка — сложные задания появляются по мере освоения.",
    },
    {
      icon: "Smartphone",
      title: "Удобно везде",
      description: "Занимайтесь с планшета, телефона или компьютера — интерфейс удобен для детей с 6 лет.",
    },
  ]

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32" id="features">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-balance font-display">
          Всё для грамотности ребёнка
        </h2>
        <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          «Буквоёжка» — не скучные прописи, а настоящий помощник для освоения русского языка с первого по четвёртый класс.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors h-full">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={feature.icon} className="h-6 w-6 text-primary" fallback="BookOpen" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-display">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
