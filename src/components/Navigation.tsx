import { ShinyButton } from "@/components/ui/shiny-button"
import { motion } from "framer-motion"

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-bold font-display">
              LaunchPad
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Возможности
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Тарифы
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                О нас
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShinyButton variant="secondary" className="hidden sm:inline-flex">
              Войти
            </ShinyButton>
            <ShinyButton>Начать</ShinyButton>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
