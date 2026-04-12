import { ShinyButton } from "@/components/ui/shiny-button"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

export function HeroSection() {
  return (
    <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden">
      {/* Grid Background with Alpha Mask */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(139 92 246 / 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(139 92 246 / 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column - Content */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <span>🦔</span>
            <span>Для учеников 1–4 классов</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 font-display">
            Русский язык — легко и с удовольствием!
          </h1>

          <p className="text-lg text-muted-foreground text-balance mb-8 leading-relaxed max-w-xl">
            «Буквоёжка» — развивающая программа с сотнями заданий по русскому языку. Ребёнок учится играя, а родители видят прогресс в любой момент.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <ShinyButton className="text-base px-8" onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}>
              Попробовать демо
              <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
            </ShinyButton>
            <button
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
              className="text-base px-8 py-2.5 rounded-lg border border-border hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground font-medium"
            >
              Посмотреть задания
            </button>
          </div>

          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="CheckCircle2" className="h-4 w-4 text-primary" />
              <span>Без рекламы</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Task Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="space-y-4">
            {/* Task card */}
            <div className="bg-card border border-border rounded-2xl px-6 py-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-lg">📝</div>
                <span className="text-sm font-semibold text-primary">Задание 1 из 10</span>
              </div>
              <p className="text-sm font-medium mb-4">Вставь пропущенную букву:</p>
              <p className="text-xl font-bold font-display mb-4">
                М<span className="border-b-2 border-primary px-1 mx-0.5">_</span>локо
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["а", "о", "е"].map((letter) => (
                  <button
                    key={letter}
                    className="py-2 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-center font-bold text-lg font-display"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress card */}
            <div className="bg-card border border-border rounded-2xl px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Прогресс Маши</span>
                <span className="text-sm text-primary font-bold">7 из 10 ⭐</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-primary rounded-full" />
              </div>
            </div>

            {/* Badge */}
            <div className="bg-accent/20 border border-accent/30 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-sm font-bold">Молодец! Получена медаль</p>
                <p className="text-xs text-muted-foreground">«Знаток гласных букв»</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}