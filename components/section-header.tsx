interface SectionHeaderProps {
  title: string
  subtitle: string
  centered?: boolean
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={`space-y-4 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">{subtitle}</p>
    </div>
  )
}
