import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Для каких классов подходит «Буквоёжка»?",
    answer:
      "Программа разработана для учеников 1–4 классов общеобразовательных школ. Задания соответствуют программам «Школа России», «Перспектива» и другим популярным учебникам. При регистрации вы указываете класс ребёнка, и программа автоматически подбирает актуальные темы.",
  },
  {
    question: "Сколько времени в день нужно заниматься?",
    answer:
      "Рекомендуем 15–20 минут в день — этого достаточно для заметного прогресса. Занятия можно разбить на несколько подходов. Главное — регулярность: программа напомнит ребёнку о задании и похвалит за серию дней без пропусков.",
  },
  {
    question: "Есть ли бесплатный период?",
    answer:
      "Да! Первые 7 дней — полностью бесплатно на любом тарифе. Карта не нужна для регистрации. Вы сможете оценить программу и убедиться, что она нравится ребёнку, прежде чем оплачивать.",
  },
  {
    question: "Можно ли заниматься с телефона или планшета?",
    answer:
      "Конечно! «Буквоёжка» работает на любых устройствах — смартфонах, планшетах и компьютерах. Интерфейс адаптирован для детей: крупные кнопки, яркие цвета, голосовые подсказки. Отдельное приложение скачивать не нужно.",
  },
  {
    question: "Как родители следят за успехами ребёнка?",
    answer:
      "В личном кабинете родителя вы видите полную статистику: выполненные задания, правильные и неправильные ответы, сложные темы, время занятий и заработанные медали. Можно настроить еженедельный отчёт на email.",
  },
  {
    question: "Можно ли отменить подписку?",
    answer:
      "Да, отменить подписку можно в любой момент в личном кабинете — без звонков и объяснений. Доступ сохраняется до конца оплаченного периода.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-sm text-muted-foreground">FAQ</div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-5 text-center">
            Частые вопросы
          </h2>
          <p className="text-center mt-5 text-muted-foreground">Всё, что нужно знать о программе «Буквоёжка».</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-display text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
