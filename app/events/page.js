import EventCard from "@/components/EventCard";

const Events = async ({searchParams}) => {
    const eventsAPI = 'https://qevent-backend.labs.crio.do/events';
   
    const fetchEvents = async () => {
        const res = await fetch(eventsAPI, { cache: 'no-store' });

        if (!res || !res.ok) {
            throw new Error('Failed to fetch data')
        }

        return await res.json();
    }

    let eventsData = [];
    try {
        eventsData = await fetchEvents();
    } catch (error) {
        console.error(error);
        return <h2>Error loading events</h2>;
    }

    const artist = searchParams?.artist || null;
    const hastag = searchParams?.tag || null;

    const filteredEvents = eventsData.filter((event) => {
        if (artist)
            return event.artist === searchParams.artist;
        if (hastag)
            return  event.tags ? event.tags.includes(searchParams.tag) : false;
        return eventsData;
    });
    
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            { filteredEvents.length > 0 ? (
                filteredEvents.map(eventData => (
                    <EventCard key={eventData.id} eventData={eventData} />
                ))
            ) : (
                <h2>No Events Available</h2>
            )}
        </div>
    );
};

export default Events;
