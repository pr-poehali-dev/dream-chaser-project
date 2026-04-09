import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ShinyButton } from "@/components/ui/shiny-button"

const pricingTiers = [
  {
    name: "Старт",
    price: "299 ₽",
    period: "/мес",
    description: "Для знакомства с программой — попробуйте без риска",
    features: [
      "1 ребёнок",
      "50 заданий в месяц",
      "Основные правила",
      "Прогресс ребёнка",
      "Медали и звёзды",
      "Доступ с любого устройства",
    ],
    cta: "Попробовать бесплатно",
    popular: false,
  },
  {
    name: "Семейный",
    price: "699 ₽",
    period: "/мес",
    description: "Лучший выбор для регулярных занятий и роста успеваемости",
    features: [
      "До 3 детей",
      "Неограниченные задания",
      "Все темы 1–4 класса",
      "Диктанты с голосом",
      "Словарные слова",
      "Отчёт для родителей",
      "Поддержка в чате",
      "Подготовка к контрольным",
    ],
    cta: "Попробовать бесплатно",
    popular: true,
  },
  {
    name: "Школьный",
    price: "По запросу",
    period: "",
    description: "Для классов и учебных центров с расширенным контролем",
    features: [
      "Неограниченно учеников",
      "Кабинет учителя",
      "Назначение заданий классу",
      "Сводные отчёты",
      "Всё из тарифа Семейный",
      "Интеграция с дневником",
      "Персональный менеджер",
      "Обучение педагогов",
      "Приоритетная поддержка",
    ],
    cta: "Связаться с нами",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Выберите тариф</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Первые 7 дней — бесплатно. Никаких скрытых платежей.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`relative p-8 h-full flex flex-col ${
                  tier.popular ? "border-primary shadow-lg shadow-primary/20" : "border-border"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Популярный
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">{tier.price}</span>
                    {tier.period && <span className="text-muted-foreground ml-2">{tier.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ShinyButton className="w-full justify-center">{tier.cta}</ShinyButton>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
