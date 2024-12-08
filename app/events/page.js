"use client";
import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";

const Events = () => {
    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const eventsAPI = "https://qevent-backend.labs.crio.do/events"

    useEffect(() =>{
      (async function() {
        try {
          setLoading(true);
          const res = await fetch(eventsAPI);
          if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          setEventsData(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setLoading(false);
        }
      })();
    }, []);

return (
  <div className="grid grid-cols-4">
  { loading? (
      <h2>Loading...</h2>
    ) : eventsData.length > 0? (
        eventsData.map(eventData => <EventCard key={eventData.id} eventData = {eventData}/>)
      )
    : (
      <h2>No Events Available</h2>
    )
  }
  </div>
  )
};
  
export default Events;
  