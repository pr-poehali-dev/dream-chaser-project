import { ShinyButton } from "@/components/ui/shiny-button"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export function Navigation() {
  const navigate = useNavigate()
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
            <a href="/" className="text-xl font-bold font-display flex items-center gap-2">
              <span className="text-2xl">🦔</span>
              <span className="text-primary">Буквоёжка</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Программа
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Как работает
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted"
            >
              <span className="text-lg">🦔</span>
              Профиль
            </button>
            <ShinyButton onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}>Попробовать демо</ShinyButton>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}