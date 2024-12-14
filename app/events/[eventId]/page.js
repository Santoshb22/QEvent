
import EventDetailCard from "@/components/EventDetailCard";

const event = async ({params}) => {
    const eventsAPI = 'https://qevent-backend.labs.crio.do/events';
    const response = await fetch(`${eventsAPI}/${params.eventId}`);
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