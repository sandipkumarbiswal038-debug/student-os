export function Input({ id, label, placeholder, type = 'text' }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-slate-700" htmlFor={id}>
      {label}
      <input
        className="rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-niis-700 focus:ring-2 focus:ring-niis-100"
        id={id}
        placeholder={placeholder}
        type={type}
      />
    </label>
  )
}
