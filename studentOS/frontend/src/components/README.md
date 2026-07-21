# Shared Components

All Student OS feature squads should import these components instead of creating duplicate UI.

```jsx
import { Button } from './Button'
<Button onClick={saveChanges}>Save</Button>
```

```jsx
import { Input } from './Input'
<Input id="title" label="Title" placeholder="Assignment title" />
```

```jsx
import { Card } from './Card'
<Card title="DBMS" description="Semester 3 subject" />
```

```jsx
import { Modal } from './Modal'
<Modal title="Confirm" onClose={closeModal}>Continue?</Modal>
```

```jsx
import { NavBar } from './NavBar'
<NavBar />
```

```jsx
import { BottomTabBar } from './BottomTabBar'
<BottomTabBar items={['Home']} activeItem="Home" onChange={setTab} />
```

```jsx
import { Toast } from './Toast'
<Toast message="Saved" onClose={closeToast} />
```

```jsx
import { Loader } from './Loader'
<Loader label="Loading subjects" />
```

```jsx
import { EmptyState } from './EmptyState'
<EmptyState title="No notes" description="Upload the first note." />
```

```jsx
import { ErrorState } from './ErrorState'
<ErrorState message="Could not load subjects." />
```
