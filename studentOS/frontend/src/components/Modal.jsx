export function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-10 grid place-items-center bg-slate-950/40 p-4" role="dialog" aria-modal="true">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-niis-950">{title}</h2>
          <button className="text-slate-500" onClick={onClose} type="button">Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </section>
    </div>
  )
}
