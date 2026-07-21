export function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-20 left-4 right-4 mx-auto flex max-w-sm items-center justify-between rounded-xl bg-niis-950 px-4 py-3 text-sm text-white shadow-xl">
      <span>{message}</span>
      <button className="ml-4 text-sky-100" onClick={onClose} type="button">Close</button>
    </div>
  )
}
