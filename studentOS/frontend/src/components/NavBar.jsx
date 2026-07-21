export function NavBar({ user, onLogout, onSignIn }) {
  return (
    <header className="bg-niis-950 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-lg font-bold">Student OS</span>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-sky-100">{user.name}</span>
            <button className="text-sm font-semibold text-white underline" onClick={onLogout} type="button">Log out</button>
          </div>
        ) : (
          <button className="text-sm font-semibold text-white underline" onClick={onSignIn} type="button">Sign in</button>
        )}
      </div>
    </header>
  )
}
