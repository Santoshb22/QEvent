import Tag from "./Tag";

const EventDetailCard = ({eventData}) => {
  return (
    <div className="max-w-[100%] w-[90%] mx-auto">
        <div className="flex justify-center items-center m-2 rounded-md">
            <img className="rounded-md w-3/6" src={eventData.image} alt="event card img" />
        </div>

        <div className=" mt-4 mb-8 text-xl font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
            <p className="text-3xl">{eventData.date} {eventData.time}</p>
            <p>{eventData.location}</p>
            <p>{eventData.name}</p>
        </div>

        <div>
            <div className="flex gap-4 my-2">
                {
                eventData?.tags?.map(tag => <Tag key = {tag} text={tag}/>)
                }
            </div>

            <p>{eventData.description}</p>

            <div className="flex justify-between  items-center my-2">
                <p className="text-xl font-bold bg-gradient-to-l from-orange-500 to-green-500 bg-clip-text text-transparent">${eventData.price}</p>
                <button className="bg-red-500 hover:bg-red-600 cursor-pointer py-2 px-6 rounded-md text-white">Buy Tickets</button>
            </div>
        </div>
    </div>
  )
}

export default EventDetailCard