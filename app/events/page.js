"use client";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Events = () => {
    const searchParams = useSearchParams();
    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const eventsAPI = "https://qevent-backend.labs.crio.do/events";
    const artist = searchParams.get("artist");
    const router = useRouter();

    const handleRouteEvent = (id) => {
        router.push(`/events/${id}`);
    }

    useEffect(() => {
        (async function fetchEvents() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(eventsAPI);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setEventsData(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Failed to fetch events.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filteredByArtist = artist
        ? eventsData.filter(event => event.artist === artist)
        : eventsData;

    return (
        <div className="grid grid-cols-4">
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>Error: {error}</h2>
            ) : filteredByArtist.length > 0 ? (
                filteredByArtist.map(eventData => (
                    <EventCard
                    onClick = {() => handleRouteEvent(eventData.id)}
                    key={eventData.id} eventData={eventData} />
                ))
            ) : (
                <h2>No Events Available</h2>
            )}
        </div>
    );
};

export default Events;
