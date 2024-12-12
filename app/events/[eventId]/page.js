
import EventDetailCard from "@/components/EventDetailCard";

const event = async ({params}) => {
    const response = await fetch(`https://qevent-backend.labs.crio.do/events/${params.eventId}`);
    const eventData = await response.json();

  return (
    <div>
      {
          eventData? (
           <div>
            <EventDetailCard eventData = {eventData}/>
           </div>
          ): (
            <h2>Data not available</h2>
          )
      }
    </div>
  )
}

export default event