import { motion } from "framer-motion"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

const testimonials = [
  {
    text: "Платформа произвела революцию в наших операциях, оптимизировала рабочие процессы и повысила продуктивность. Интуитивный интерфейс поддерживает эффективность команды.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Анна Петрова",
    role: "Директор по операциям",
  },
  {
    text: "Внедрение прошло гладко, а результаты были мгновенными. Команда быстро адаптировалась благодаря удобному дизайну.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Михаил Родригес",
    role: "IT-менеджер",
  },
  {
    text: "Команда поддержки великолепна. Они сопровождали нас на каждом этапе и продолжают оказывать исключительную помощь.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Елена Васильева",
    role: "Руководитель успеха клиентов",
  },
  {
    text: "Это решение изменило то, как мы работаем. Бесшовная интеграция и мощные функции превзошли наши ожидания.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Дмитрий Ким",
    role: "Генеральный директор",
  },
  {
    text: "Надежные функции и отзывчивая поддержка сделали наш рабочий процесс значительно более эффективным и упорядоченным.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Юлия Мартинес",
    role: "Проект-менеджер",
  },
  {
    text: "Внедрение превзошло ожидания. Оно оптимизировало процессы и значительно улучшило общую эффективность бизнеса.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Алиса Фостер",
    role: "Бизнес-аналитик",
  },
  {
    text: "Удобный дизайн и мощные возможности изменили то, как наша команда сотрудничает и достигает результатов.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Артем Волков",
    role: "Директор по маркетингу",
  },
  {
    text: "Они предоставили решение, которое действительно поняло наши потребности и улучшило работу сверх того, что мы могли представить.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Рита Томпсон",
    role: "Менеджер по продажам",
  },
  {
    text: "Наша продуктивность и эффективность резко возросли. Эта платформа стала незаменимой для повседневной работы.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Даниил Парк",
    role: "Операционный менеджер",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export function TestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-sm text-muted-foreground">Отзывы</div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-5 text-center">
            Что говорят клиенты
          </h2>
          <p className="text-center mt-5 text-muted-foreground">Узнайте, что наши клиенты говорят о нас.</p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  )
}
