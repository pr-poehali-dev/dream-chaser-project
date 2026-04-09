import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

type Task = {
  id: number
  type: "choice" | "input"
  label: string
  question: string
  hint?: string
  options?: string[]
  answer: string
  explanation: string
}

type Grade = 1 | 2 | 3 | 4

const tasksByGrade: Record<Grade, Task[]> = {
  1: [
    { id: 101, type: "choice", label: "Знакомство с буквами", question: "Какая это буква?  А", hint: "Посмотри внимательно", options: ["А", "О", "У"], answer: "А", explanation: "Это буква «А» — первая буква русского алфавита" },
    { id: 102, type: "choice", label: "Гласные и согласные", question: "Какой звук в слове «МАК» первый?", hint: "Произнеси слово вслух", options: ["[м]", "[а]", "[к]"], answer: "[м]", explanation: "Первый звук в слове «мак» — согласный [м]" },
    { id: 103, type: "choice", label: "Знакомство с буквами", question: "Буква «О» — это…", hint: "Попробуй произнести её", options: ["гласная", "согласная", "знак"], answer: "гласная", explanation: "«О» — гласная буква, она поётся и образует слог" },
    { id: 104, type: "choice", label: "Слоги", question: "Сколько слогов в слове «РЫБА»?", hint: "Хлопни в ладоши на каждый слог", options: ["1", "2", "3"], answer: "2", explanation: "РЫ-БА — два слога, потому что две гласных буквы" },
    { id: 105, type: "choice", label: "Ударение", question: "На какой слог падает ударение в слове «МАМА»?", hint: "Произнеси с ударением", options: ["МА-ма", "ма-МА"], answer: "МА-ма", explanation: "В слове «МАМА» ударение на первый слог: МА-ма" },
    { id: 106, type: "choice", label: "Гласные звуки", question: "Какая буква обозначает гласный звук?", hint: "Гласные можно петь!", options: ["М", "У", "С"], answer: "У", explanation: "«У» — гласная буква. Гласные: А, Е, Ё, И, О, У, Ы, Э, Ю, Я" },
    { id: 107, type: "choice", label: "Знакомство с буквами", question: "Какая буква здесь лишняя?  А  О  М  У", hint: "Найди согласную", options: ["А", "О", "М"], answer: "М", explanation: "«М» — согласная буква. Остальные (А, О, У) — гласные" },
    { id: 108, type: "input", label: "Звуки и буквы", question: "Напиши первую букву слова «ДОМ»", hint: "Из чего состоит слово?", options: [], answer: "д", explanation: "Слово «ДОМ» начинается с буквы «Д»" },
    { id: 109, type: "choice", label: "Слоги", question: "Раздели слово на слоги: «ЛУНА»", hint: "Сколько гласных — столько слогов", options: ["Л-У-Н-А", "ЛУ-НА", "ЛУН-А"], answer: "ЛУ-НА", explanation: "ЛУ-НА — два слога. В каждом слоге одна гласная" },
    { id: 110, type: "choice", label: "Твёрдые и мягкие звуки", question: "Звук [Н'] в слове «КОНЬ» — какой?", hint: "Мягкий знак делает звук мягким", options: ["твёрдый", "мягкий"], answer: "мягкий", explanation: "Мягкий знак смягчает предшествующий согласный, поэтому [Н'] — мягкий" },
  ],
  2: [
    { id: 201, type: "choice", label: "ЖИ-ШИ", question: "Как написать: жы или жи?", hint: "Вспомни правило ЖИ-ШИ", options: ["жы", "жи"], answer: "жи", explanation: "ЖИ-ШИ пиши с буквой И. Это правило надо запомнить!" },
    { id: 202, type: "choice", label: "ЖИ-ШИ", question: "Ёж_к (ежи или ежы?)", hint: "ЖИ-ШИ — запомни!", options: ["ежи", "ежы"], answer: "ежи", explanation: "После Ж всегда пишем И: ЖИ-ШИ пиши с И" },
    { id: 203, type: "choice", label: "ЧА-ЩА", question: "Как написать: чяшка или чашка?", hint: "ЧА-ЩА пиши с буквой А", options: ["чяшка", "чашка"], answer: "чашка", explanation: "ЧА-ЩА пишем с буквой А. «Чашка» — правильное написание" },
    { id: 204, type: "choice", label: "ЧУ-ЩУ", question: "Как написать: чюдо или чудо?", hint: "ЧУ-ЩУ пиши с буквой У", options: ["чюдо", "чудо"], answer: "чудо", explanation: "ЧУ-ЩУ пишем с буквой У. Запомни: ЧУ-ЩУ пиши с У!" },
    { id: 205, type: "choice", label: "ЧА-ЩА", question: "Вставь букву: «Гл_ша несла ч_шку»", hint: "Правило ЧА-ЩА и ЩА", options: ["я, я", "а, а", "а, я"], answer: "а, а", explanation: "ЧА-ЩА пишем с А: «Глаша несла чашку»" },
    { id: 206, type: "choice", label: "Безударные гласные", question: "Вставь букву: тр_ва", hint: "Подбери проверочное слово", options: ["а", "о", "е"], answer: "а", explanation: "«Травы» — проверочное слово, пишем «а»: трАва" },
    { id: 207, type: "choice", label: "Безударные гласные", question: "Вставь букву: гр_за", hint: "Проверочное слово: грозы", options: ["а", "о", "е"], answer: "о", explanation: "«Грозы» — проверочное слово, пишем «о»: грОза" },
    { id: 208, type: "choice", label: "Безударные гласные", question: "Вставь букву: з_мля", hint: "Проверочное слово: земли", options: ["а", "е", "и"], answer: "е", explanation: "«Земли» — проверочное слово, пишем «е»: зЕмля" },
    { id: 209, type: "choice", label: "ЧУ-ЩУ", question: "Как написать: щюка или щука?", hint: "ЧУ-ЩУ пиши с У", options: ["щюка", "щука"], answer: "щука", explanation: "ЩУ пишем с У: щУка. Правило ЧУ-ЩУ" },
    { id: 210, type: "choice", label: "Безударные гласные", question: "Вставь букву: д_ма (здание)", hint: "Проверочное слово: дом", options: ["а", "о", "е"], answer: "о", explanation: "«Дом» — проверочное слово, пишем «о»: дОма" },
  ],
  3: [
    { id: 301, type: "choice", label: "Части речи", question: "«Солнце» — это…", hint: "Отвечает на вопрос «что?»", options: ["существительное", "прилагательное", "глагол"], answer: "существительное", explanation: "«Солнце» отвечает на вопрос «что?» — это имя существительное" },
    { id: 302, type: "choice", label: "Части речи", question: "«Бежит» — это…", hint: "Что делает? Что делал?", options: ["существительное", "прилагательное", "глагол"], answer: "глагол", explanation: "«Бежит» отвечает на вопрос «что делает?» — это глагол" },
    { id: 303, type: "choice", label: "Части речи", question: "«Красивый» — это…", hint: "Какой? Какая? Какое?", options: ["существительное", "прилагательное", "глагол"], answer: "прилагательное", explanation: "«Красивый» отвечает на вопрос «какой?» — это имя прилагательное" },
    { id: 304, type: "choice", label: "Построение предложений", question: "Найди правильно составленное предложение", hint: "В предложении должен быть смысл", options: ["Бежит кот быстро", "Кот быстро бежит", "Быстро кот бежит"], answer: "Кот быстро бежит", explanation: "Правильный порядок: подлежащее → обстоятельство → сказуемое" },
    { id: 305, type: "choice", label: "Части речи", question: "«Весело» — это…", hint: "Как? Где? Когда?", options: ["существительное", "наречие", "глагол"], answer: "наречие", explanation: "«Весело» отвечает на вопрос «как?» — это наречие" },
    { id: 306, type: "choice", label: "Построение предложений", question: "Какое слово пропущено: «Маша ___ книгу»?", hint: "Что Маша делает с книгой?", options: ["читает", "красивая", "быстро"], answer: "читает", explanation: "Нужен глагол-сказуемое: «Маша читает книгу»" },
    { id: 307, type: "choice", label: "Части речи", question: "В слове «пять» это…", hint: "Сколько? Который?", options: ["числительное", "прилагательное", "существительное"], answer: "числительное", explanation: "«Пять» отвечает на вопрос «сколько?» — это имя числительное" },
    { id: 308, type: "choice", label: "Построение предложений", question: "С какой буквы начинается предложение?", hint: "Вспомни правило оформления предложений", options: ["со строчной", "с заглавной", "не важно"], answer: "с заглавной", explanation: "Каждое предложение начинается с заглавной (большой) буквы" },
    { id: 309, type: "choice", label: "Части речи", question: "«Я» — это…", hint: "Заменяет имя существительное", options: ["существительное", "местоимение", "глагол"], answer: "местоимение", explanation: "«Я» заменяет имя существительное — это местоимение" },
    { id: 310, type: "choice", label: "Построение предложений", question: "Что ставится в конце вопросительного предложения?", hint: "Ты знаешь...?", options: ["точка", "вопросительный знак", "восклицательный знак"], answer: "вопросительный знак", explanation: "В конце вопросительного предложения ставится знак «?»" },
  ],
  4: [
    { id: 401, type: "choice", label: "Части речи", question: "«Бегущий» — это…", hint: "Признак по действию", options: ["глагол", "причастие", "прилагательное"], answer: "причастие", explanation: "«Бегущий» — причастие, обозначает признак предмета по действию" },
    { id: 402, type: "choice", label: "Построение предложений", question: "Найди главные члены предложения: «Дети играют в парке»", hint: "Кто? Что делает?", options: ["Дети — подлежащее, играют — сказуемое", "Дети — сказуемое, играют — подлежащее", "в парке — подлежащее"], answer: "Дети — подлежащее, играют — сказуемое", explanation: "Дети (кто?) — подлежащее, играют (что делают?) — сказуемое" },
    { id: 403, type: "choice", label: "Части речи", question: "«Благодаря» в предложении — это…", hint: "Связывает слова", options: ["существительное", "предлог", "наречие"], answer: "предлог", explanation: "«Благодаря» — производный предлог, служит для связи слов" },
    { id: 404, type: "choice", label: "Построение предложений", question: "Какое предложение сложное?", hint: "В сложном — несколько основ", options: ["Кот спит на диване", "Кот спит, а пёс гуляет", "Большой пушистый кот"], answer: "Кот спит, а пёс гуляет", explanation: "Сложное предложение содержит две грамматические основы, соединённые союзом «а»" },
    { id: 405, type: "choice", label: "Части речи", question: "«Пятеро» — это…", hint: "Сколько? Который?", options: ["числительное", "наречие", "местоимение"], answer: "числительное", explanation: "«Пятеро» — собирательное числительное, отвечает на вопрос «сколько?»" },
    { id: 406, type: "choice", label: "Построение предложений", question: "Найди предложение с однородными членами", hint: "Однородные — одинаковые члены предложения", options: ["Маша читает книгу", "Маша читает и рисует", "Маша читает интересно"], answer: "Маша читает и рисует", explanation: "«Читает и рисует» — однородные сказуемые, соединены союзом «и»" },
    { id: 407, type: "choice", label: "Части речи", question: "Определи падеж: «вижу маму»", hint: "Вижу кого? что?", options: ["именительный", "винительный", "родительный"], answer: "винительный", explanation: "«Маму» отвечает на вопрос «кого?» — это винительный падеж" },
    { id: 408, type: "choice", label: "Построение предложений", question: "Какой знак ставится между однородными членами без союза?", hint: "Яблоко груша слива", options: ["точка", "запятая", "тире"], answer: "запятая", explanation: "Между однородными членами без союза ставится запятая: яблоко, груша, слива" },
    { id: 409, type: "choice", label: "Части речи", question: "«Ах!» — это…", hint: "Выражает чувства, не называя", options: ["наречие", "частица", "междометие"], answer: "междометие", explanation: "«Ах!» выражает эмоцию, не называя её — это междометие" },
    { id: 410, type: "choice", label: "Построение предложений", question: "В каком предложении есть обращение?", hint: "К кому обращаются?", options: ["Мама пришла домой", "Мама, иди сюда!", "Мама очень устала"], answer: "Мама, иди сюда!", explanation: "«Мама» — обращение, выделяется запятой. Обращение — это называние того, к кому обращаются" },
  ],
}

type AnswerState = "idle" | "correct" | "wrong"

const gradeLabels: Record<Grade, string> = {
  1: "1 класс",
  2: "2 класс",
  3: "3 класс",
  4: "4 класс",
}

const gradeEmojis: Record<Grade, string> = {
  1: "🔤",
  2: "✏️",
  3: "📖",
  4: "🎓",
}

export function DemoSection() {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)
  const [current, setCurrent] = useState(0)
  const [answerState, setAnswerState] = useState<AnswerState>("idle")
  const [inputValue, setInputValue] = useState("")
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const tasks = selectedGrade ? tasksByGrade[selectedGrade] : []
  const task = tasks[current]

  const handleAnswer = (answer: string) => {
    if (answerState !== "idle") return
    const correct = answer.trim().toLowerCase() === task.answer.toLowerCase()
    if (correct) setScore((s) => s + 1)
    setAnswerState(correct ? "correct" : "wrong")
    setTimeout(() => {
      setAnswerState("idle")
      setInputValue("")
      if (current + 1 >= tasks.length) setFinished(true)
      else setCurrent((c) => c + 1)
    }, 1800)
  }

  const restart = () => {
    setCurrent(0)
    setScore(0)
    setFinished(false)
    setAnswerState("idle")
    setInputValue("")
  }

  const backToGrades = () => {
    setSelectedGrade(null)
    restart()
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
            Выбери класс и реши 10 заданий — без регистрации!
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">

            {/* Grade selection */}
            {!selectedGrade && (
              <motion.div
                key="grades"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {([1, 2, 3, 4] as Grade[]).map((grade) => (
                    <motion.button
                      key={grade}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSelectedGrade(grade); restart() }}
                      className="group relative p-6 rounded-2xl border-2 border-border hover:border-primary bg-card hover:bg-primary/5 transition-all text-left shadow-sm"
                    >
                      <div className="text-4xl mb-3">{gradeEmojis[grade]}</div>
                      <div className="font-bold font-display text-lg mb-1">{gradeLabels[grade]}</div>
                      <div className="text-xs text-muted-foreground">
                        {grade === 1 && "Буквы и звуки"}
                        {grade === 2 && "ЖИ-ШИ, безударные"}
                        {grade === 3 && "Части речи, предложения"}
                        {grade === 4 && "Падежи, сложные темы"}
                      </div>
                      <div className="absolute top-4 right-4 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        10 заданий →
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Result screen */}
            {selectedGrade && finished && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-8 text-center border-primary/30 shadow-lg shadow-primary/10">
                  <div className="text-6xl mb-4">
                    {score === tasks.length ? "🏆" : score >= 7 ? "⭐" : score >= 4 ? "🦔" : "📚"}
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-2">
                    {score === tasks.length ? "Отлично! Все верно!" : score >= 7 ? "Очень хороший результат!" : score >= 4 ? "Неплохо, есть куда расти!" : "Стоит ещё позаниматься!"}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Правильных ответов: <strong className="text-primary text-xl">{score}</strong> из {tasks.length}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {gradeEmojis[selectedGrade]} {gradeLabels[selectedGrade]}
                  </p>
                  <div className="flex gap-3 flex-col sm:flex-row justify-center">
                    <button
                      onClick={backToGrades}
                      className="px-5 py-2.5 rounded-xl border border-border hover:border-primary/50 transition-colors font-medium text-sm"
                    >
                      Выбрать другой класс
                    </button>
                    <button
                      onClick={restart}
                      className="px-5 py-2.5 rounded-xl border border-primary/40 text-primary hover:bg-primary/5 transition-colors font-medium text-sm"
                    >
                      Попробовать снова
                    </button>
                    <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                      Начать учиться бесплатно
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Task card */}
            {selectedGrade && !finished && task && (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`p-8 border-2 transition-colors duration-300 ${
                    answerState === "correct" ? "border-green-400 bg-green-50/50"
                    : answerState === "wrong" ? "border-red-400 bg-red-50/50"
                    : "border-border"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={backToGrades} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                      <Icon name="ChevronLeft" className="h-3 w-3" />
                      {gradeLabels[selectedGrade]}
                    </button>
                    <span className="text-sm text-muted-foreground">{current + 1} / {tasks.length}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-muted rounded-full mb-5 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(current / tasks.length) * 100}%` }}
                    />
                  </div>

                  {/* Label */}
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {task.label}
                  </span>

                  {/* Question */}
                  <p className="text-2xl font-bold font-display text-center mt-5 mb-2 leading-snug">
                    {task.question}
                  </p>
                  {task.hint && (
                    <p className="text-center text-sm text-muted-foreground mb-5">💡 {task.hint}</p>
                  )}

                  {/* Feedback */}
                  <AnimatePresence>
                    {answerState !== "idle" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`text-center text-sm font-medium rounded-xl px-4 py-3 mb-4 ${
                          answerState === "correct" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {answerState === "correct" ? "✅ " : "❌ "}
                        {task.explanation}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Options */}
                  {task.type === "choice" && task.options && (
                    <div className={`grid gap-3 ${task.options.length === 2 ? "grid-cols-2" : task.options.length === 3 ? "grid-cols-3" : "grid-cols-1"}`}>
                      {task.options.map((opt) => (
                        <button
                          key={opt}
                          disabled={answerState !== "idle"}
                          onClick={() => handleAnswer(opt)}
                          className="py-3 px-2 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-center font-bold font-display disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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
                        placeholder="Напиши ответ..."
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

                  {/* Dots progress */}
                  <div className="flex items-center justify-center gap-1 mt-6">
                    {tasks.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i < current ? "w-5 bg-primary" : i === current ? "w-5 bg-primary/40" : "w-2 bg-muted-foreground/20"
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
