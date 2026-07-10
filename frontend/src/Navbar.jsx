import { useEffect, useState } from "react";

function Navbar() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/user/", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setUser(data));

    }, []);

    return (

        <nav>

            <h2>Student OS</h2>

            {user && (
                <h3>Welcome, {user.name}</h3>
            )}

        </nav>

    );
}

export default Navbar;