
import EventDetailCard from "@/components/EventDetailCard";

const event = async ({params}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EVENTS_API_URL}/${params.eventId}`);
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