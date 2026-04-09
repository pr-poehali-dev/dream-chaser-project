import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { SocialProof } from "@/components/SocialProof"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { FeaturesSlideshowSection } from "@/components/FeaturesSlideshowSection"
import { TestimonialsSection } from "@/components/TestimonialsSection"
import { DemoSection } from "@/components/DemoSection"
import { FAQSection } from "@/components/FAQSection"

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <SocialProof />
        <FeaturesSection />
        <HowItWorksSection />
        <FeaturesSlideshowSection />
        <TestimonialsSection />
        <DemoSection />
        <FAQSection />
      </main>
      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-3 font-display text-lg flex items-center gap-2">
                <span>🦔</span>
                <span className="text-primary">Буквоёжка</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Развивающая программа по русскому языку для учеников 1–4 классов.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Программа</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Возможности</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">Как работает</a></li>
                <li><a href="#demo" className="hover:text-foreground transition-colors">Попробовать</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Классы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#demo" className="hover:text-foreground transition-colors">1 класс — буквы и звуки</a></li>
                <li><a href="#demo" className="hover:text-foreground transition-colors">2 класс — правописание</a></li>
                <li><a href="#demo" className="hover:text-foreground transition-colors">3–4 класс — части речи</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Документы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Конфиденциальность</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Условия использования</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            &copy; 2026 Буквоёжка. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  )
}