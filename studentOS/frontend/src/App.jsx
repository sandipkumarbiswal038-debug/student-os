import { useEffect, useState } from 'react'
import { BottomTabBar } from './components/BottomTabBar'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { EmptyState } from './components/EmptyState'
import { ErrorState } from './components/ErrorState'
import { Loader } from './components/Loader'
import { NavBar } from './components/NavBar'
import { Toast } from './components/Toast'

const navigationItems = ['Home', 'Events', 'Notes', 'Attendance']
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export default function App() {
  const [activeTab, setActiveTab] = useState(() => window.location.hash.slice(1) || 'Home')
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoadingSession, setIsLoadingSession] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true)
  const [subjectsError, setSubjectsError] = useState('')

  useEffect(() => {
    const handleHashChange = () => setActiveTab(window.location.hash.slice(1) || 'Home')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/accounts/`, { credentials: 'include' })
        const data = await response.json()
        if (data.authenticated) setCurrentUser(data.user)
      } finally {
        setIsLoadingSession(false)
      }
    }
    loadSession()
  }, [])

  useEffect(() => {
    async function loadSubjects() {
      if (!currentUser) {
        setIsLoadingSubjects(false)
        return
      }
      try {
        const response = await fetch(`${apiBaseUrl}/api/subjects/`, { credentials: 'include' })
        if (!response.ok) throw new Error('The server could not load subjects.')
        setSubjects(await response.json())
      } catch (error) {
        setSubjectsError(error.message)
      } finally {
        setIsLoadingSubjects(false)
      }
    }
    loadSubjects()
  }, [currentUser])

  const signIn = () => window.location.assign(`${apiBaseUrl}/accounts/google/login/?process=login`)
  const signOut = async () => {
    await fetch(`${apiBaseUrl}/api/accounts/logout/`, { credentials: 'include', method: 'POST' })
    setCurrentUser(null)
    setSubjects([])
  }
  const changeTab = (tab) => { window.location.hash = tab }

  return (
    <main className="min-h-screen bg-slate-50 pb-24 text-slate-900">
      <NavBar user={currentUser} onLogout={signOut} onSignIn={signIn} />
      <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <p className="text-sm font-semibold text-sky-700">Student OS / Spine</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Your student life, organised.</h1>
        <p className="mt-3 max-w-2xl text-slate-600">This shared shell gives every Student OS feature a consistent, mobile-first place to live.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card title="Google SSO" description={isLoadingSession ? 'Checking your session…' : currentUser ? `Signed in as ${currentUser.email}` : 'Sign in with your college Google account.'} />
          <Card title="Shared APIs" description="Subjects, classes, and notifications are ready for feature squads." />
          <Card title="Active section" description={activeTab} />
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Shared component preview</h2>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={() => setShowToast(true)}>Show toast</Button>
            {!currentUser && <Button variant="secondary" onClick={signIn}>Sign in with Google</Button>}
            {currentUser && <Button variant="secondary" onClick={signOut}>Log out</Button>}
            <Loader label="Loading" />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">My subjects</h2>
          <p className="mt-1 text-sm text-slate-600">{currentUser ? 'Live data from the Django Spine API.' : 'Sign in to view your MCA subjects.'}</p>
          {isLoadingSubjects && <div className="mt-4"><Loader label="Loading subjects" /></div>}
          {subjectsError && <div className="mt-4"><ErrorState message={subjectsError} /></div>}
          {!isLoadingSubjects && !subjectsError && currentUser && subjects.length === 0 && <div className="mt-4"><EmptyState title="No subjects yet" description="Run the pilot seed command or add MCA subjects in Django admin." /></div>}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => <Card description={`${subject.subject_code} / Semester ${subject.semester} / ${subject.batch}`} key={subject.id} title={subject.subject_name} />)}
          </div>
        </section>
      </section>
      <BottomTabBar items={navigationItems} activeItem={activeTab} onChange={changeTab} />
      {showToast && <Toast message="Shared component is working." onClose={() => setShowToast(false)} />}
    </main>
  )
}
