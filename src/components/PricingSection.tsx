import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ShinyButton } from "@/components/ui/shiny-button"

const pricingTiers = [
  {
    name: "Старт",
    price: "2 900 ₽",
    period: "/мес",
    description: "Идеально для индивидуальных пользователей и небольших команд",
    features: [
      "До 5 участников",
      "10 ГБ хранилища",
      "Базовая аналитика",
      "Поддержка по email",
      "Основные функции",
      "Мобильное приложение",
    ],
    cta: "Попробовать бесплатно",
    popular: false,
  },
  {
    name: "Про",
    price: "9 900 ₽",
    period: "/мес",
    description: "Для растущих команд с потребностью в расширенных функциях",
    features: [
      "До 25 участников",
      "100 ГБ хранилища",
      "Расширенная аналитика",
      "Приоритетная поддержка",
      "Все функции",
      "Доступ к API",
      "Кастомные интеграции",
      "Расширенная безопасность",
    ],
    cta: "Попробовать бесплатно",
    popular: true,
  },
  {
    name: "Бизнес",
    price: "По запросу",
    period: "",
    description: "Для крупных организаций с индивидуальными требованиями",
    features: [
      "Неограниченно участников",
      "Безлимитное хранилище",
      "Кастомная аналитика",
      "Поддержка 24/7",
      "Все функции",
      "Кастомный API",
      "White-label",
      "Гарантия SLA",
      "Персональный менеджер",
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
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Простые и прозрачные тарифы</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите идеальный план для вашей команды. Все тарифы включают 14 дней бесплатно.
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
