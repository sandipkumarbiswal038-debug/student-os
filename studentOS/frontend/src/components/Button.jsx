export function Button({ children, onClick, variant = 'primary' }) {
  const styles = {
    primary: 'bg-niis-700 text-white hover:bg-niis-950',
    secondary: 'border border-niis-700 bg-white text-niis-700 hover:bg-niis-100',
  }

  return (
    <button className={`rounded-lg px-4 py-2 font-semibold transition ${styles[variant]}`} onClick={onClick} type="button">
      {children}
    </button>
  )
}
