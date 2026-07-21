export function BottomTabBar({ items, activeItem, onChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white shadow-lg">
      <div className="mx-auto flex max-w-md justify-around">
        {items.map((item) => (
          <button
            className={`min-w-20 px-3 py-3 text-sm font-semibold ${activeItem === item ? 'text-niis-700' : 'text-slate-500'}`}
            key={item}
            onClick={() => onChange(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  )
}
