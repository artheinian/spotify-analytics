import { useEffect, useState } from "react";


export default function Dashboard() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch("api/spotify/user")
            .then((res) => res.json())
            .then((data) => setProfile(data));
    }, []);

    if (!profile) return <p>Loading ...</p>;


    return (
        <div style={{ padding: 24 }}>
            <h1>Welcome, {profile.display_name}</h1>

            {profile.images?.[0] && (
                <img
                    src={profile.images[0].url}
                    alt="Profile"
                    width={120}
                    style={{ borderRadius: "50%" }}
                />
            )}
        </div>
    );
}
