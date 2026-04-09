import { motion } from "framer-motion"

export function SocialProof() {
  const partners = [
    { name: "Учителя.рф", width: 140 },
    { name: "Школа №1", width: 120 },
    { name: "РосОбразование", width: 160 },
    { name: "Детский клуб", width: 140 },
  ]

  return (
    <section className="border-y border-border bg-secondary/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <p className="text-lg text-muted-foreground">
              Нам доверяют более <strong className="text-foreground">5 000</strong>
              <br />
              учеников и их родителей
            </p>
          </motion.div>

          <div className="flex items-center gap-8 md:gap-12 flex-wrap justify-center lg:justify-end flex-1">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                whileHover={{ opacity: 0.9, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-muted-foreground font-bold text-base tracking-wide"
                style={{ minWidth: partner.width }}
              >
                {partner.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
