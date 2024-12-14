import EventCard from "@/components/EventCard";

const Events = async ({searchParams}) => {
    const eventsAPI = 'https://qevent-backend.labs.crio.do/events';
    const response = await fetch(eventsAPI);
    if(!response || !response.ok) throw new Error("Error: Failed to fetch error");
    const eventsData = await response.json();

    const artist = searchParams.artist;
    const hastag = searchParams.tag;

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
