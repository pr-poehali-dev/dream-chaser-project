import { motion } from "framer-motion"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

const testimonials = [
  {
    text: "Моя дочь раньше терпеть не могла русский язык. Теперь сама просит позаниматься на «Буквоёжке»! За месяц исправила четвёрку на пятёрку.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Анна Петрова",
    role: "Мама ученицы 2 класса",
  },
  {
    text: "Очень удобно следить за прогрессом. Вижу, какие темы даются трудно, и могу помочь ребёнку именно там, где нужно.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Дмитрий Соколов",
    role: "Папа ученика 3 класса",
  },
  {
    text: "Использую «Буквоёжку» как домашнее задание для своего класса. Дети в восторге, а я вижу, кто выполнил работу и как.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Елена Васильева",
    role: "Учитель начальных классов",
  },
  {
    text: "Сыну 7 лет, и он с удовольствием занимается каждый день. Медальки и звёздочки — отличная мотивация. Рекомендую всем родителям!",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Игорь Новиков",
    role: "Папа первоклассника",
  },
  {
    text: "Очень нравится, что задания разные и не скучные. Мой сын занимается сам, без напоминаний — это просто чудо!",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Марина Козлова",
    role: "Мама ученика 4 класса",
  },
  {
    text: "За три месяца дочь перестала делать ошибки в словарных словах. Программа действительно работает, проверено на собственном ребёнке.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Ольга Морозова",
    role: "Мама ученицы 2 класса",
  },
  {
    text: "Удобный интерфейс, понятный даже для первоклашек. Ёжик-проводник помогает не теряться в заданиях.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Артём Лебедев",
    role: "Папа ученика 1 класса",
  },
  {
    text: "Отличная альтернатива скучным рабочим тетрадям. Ребёнок учится и одновременно играет — именно то, что нужно в начальной школе.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Светлана Попова",
    role: "Мама ученицы 3 класса",
  },
  {
    text: "Рекомендую родителям, чьи дети учатся в 1–4 классе. Регулярные занятия заметно улучшают грамотность и уверенность ребёнка.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Павел Орлов",
    role: "Папа ученика 2 класса",
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
            Родители и учителя о нас
          </h2>
          <p className="text-center mt-5 text-muted-foreground">Более 5 000 семей уже занимаются с «Буквоёжкой».</p>
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
