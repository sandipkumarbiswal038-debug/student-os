export function EmptyState({ title, description }) {
  return (
    <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <h2 className="font-bold text-slate-800">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </section>
  )
}
