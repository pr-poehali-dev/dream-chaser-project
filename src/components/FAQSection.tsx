import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Какая у вас модель ценообразования?",
    answer:
      "Мы предлагаем гибкие тарифные планы для бизнеса любого размера. Наши планы начинаются с бесплатного уровня для небольших команд и масштабируются в зависимости от ваших потребностей. Свяжитесь с нами для индивидуального корпоративного тарифа.",
  },
  {
    question: "Сколько времени занимает внедрение?",
    answer:
      "Большинство команд начинают работу в течение 24 часов. Наш оптимизированный процесс онбординга и выделенная команда поддержки обеспечивают плавный переход с минимальным влиянием на рабочий процесс.",
  },
  {
    question: "Есть ли у вас поддержка клиентов?",
    answer:
      "Да! Мы обеспечиваем круглосуточную поддержку по email, в чате и по телефону. Наша команда поддержки всегда готова помочь вам получить максимум от платформы.",
  },
  {
    question: "Могу ли я интегрироваться с существующими инструментами?",
    answer:
      "Безусловно. Мы предлагаем бесшовные интеграции с популярными инструментами, такими как Slack, Google Workspace, Microsoft 365 и многими другими. Наш API также позволяет создавать кастомные интеграции.",
  },
  {
    question: "Мои данные в безопасности?",
    answer:
      "Безопасность - наш главный приоритет. Мы используем шифрование корпоративного уровня, регулярные аудиты безопасности и соответствуем отраслевым стандартам, включая SOC 2, GDPR и HIPAA.",
  },
  {
    question: "Могу ли я отменить подписку в любое время?",
    answer:
      "Да, вы можете отменить подписку в любое время без штрафов. Мы верим в то, что должны заслуживать ваше доверие каждый месяц, а не привязывать вас долгосрочными контрактами.",
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
          <p className="text-center mt-5 text-muted-foreground">Все, что нужно знать о нашей платформе.</p>
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
