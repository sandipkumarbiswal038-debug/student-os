import { useEffect, useState } from "react";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/user/", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            {user ? (
                <>
                    <h2>Welcome, {user.name}</h2>
                    <p>{user.email}</p>
                </>
            ) : (
                <h2>Please Login</h2>
            )}
        </div>
    );
}

export default App;