import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StudentEventsContext = createContext(null);

const sourceEvents = [
  { id: "EVT001", emoji: "\u{1F389}", title: "Hackathon 2026", startsAt: "2026-08-10T10:00:00", endsAt: "2026-08-10T17:00:00", date: "10 Aug 2026", time: "10:00 AM - 5:00 PM", venue: "Computer Lab", organizer: "Computer Science Department", description: "A 24-hour innovation challenge where students build solutions, collaborate with mentors, and present their ideas.", capacity: 100, signedUp: 78, waitlist: 0 },
  { id: "EVT002", emoji: "\u{1F916}", title: "AI Workshop", startsAt: "2026-08-15T11:00:00", endsAt: "2026-08-15T14:00:00", date: "15 Aug 2026", time: "11:00 AM - 2:00 PM", venue: "Seminar Hall", organizer: "AI Club", description: "Learn the foundations of artificial intelligence and machine learning through practical demonstrations from industry experts.", capacity: 80, signedUp: 80, waitlist: 2 },
  { id: "EVT003", emoji: "\u{1F3C6}", title: "Sports Meet", startsAt: "2026-08-22T09:00:00", endsAt: "2026-08-22T16:00:00", date: "22 Aug 2026", time: "9:00 AM - 4:00 PM", venue: "College Ground", organizer: "Sports Committee", description: "The annual college sports competition with indoor and outdoor games for all students.", capacity: 200, signedUp: 145, waitlist: 0 },
];

export function StudentEventsProvider({ children }) {
  const [signups, setSignups] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("student-event-signups")) || {}; } catch { return {}; }
  });
  const [notifications, setNotifications] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("student-event-notifications")) || []; } catch { return []; }
  });
  useEffect(() => { sessionStorage.setItem("student-event-signups", JSON.stringify(signups)); }, [signups]);
  useEffect(() => { sessionStorage.setItem("student-event-notifications", JSON.stringify(notifications)); }, [notifications]);
  const events = useMemo(() => sourceEvents.slice().sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt)), []);
  const getStatus = (id) => signups[id] || null;
  const getEvent = (id) => events.find((event) => event.id === id);
  const signupCount = (event) => event.signedUp + (getStatus(event.id)?.state === "signed_up" ? 1 : 0);

  const signUp = (id) => {
    const event = getEvent(id);
    const current = getStatus(id);
    if (!event || current?.state === "signed_up" || current?.state === "waitlisted") return current;
    const next = event.signedUp < event.capacity
      ? { state: "signed_up" }
      : { state: "waitlisted", position: event.waitlist + 1 };
    setSignups((existing) => ({ ...existing, [id]: next }));
    return next;
  };

  const cancelSignup = (id) => setSignups((existing) => ({ ...existing, [id]: { state: "cancelled" } }));
  const addNotification = (message) => setNotifications((current) => [
    { id: `${Date.now()}-${Math.random()}`, message, createdAt: new Date().toLocaleString() },
    ...current,
  ]);
  const value = { events, getEvent, getStatus, signupCount, signUp, cancelSignup, notifications, addNotification };
  return <StudentEventsContext.Provider value={value}>{children}</StudentEventsContext.Provider>;
}

export function useStudentEvents() {
  const context = useContext(StudentEventsContext);
  if (!context) throw new Error("useStudentEvents must be used within StudentEventsProvider");
  return context;
}