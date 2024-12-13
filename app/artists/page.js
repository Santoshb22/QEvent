
import ArtistCard from "@/components/ArtistCard";

const Artists = async () => {
  const artistAPI = process.env.ARTIST_API_URL;
  const response = await fetch(artistAPI);
  const artistsData = await response.json();

  return (
    <div className="max-w-[100%] w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {
      artistsData.length > 0? (
        artistsData.map(artistData => <ArtistCard key={artistData.id} artistData = {artistData}/>)
      ) : (
        <h2>No Artist Available</h2>
      )
    }
    </div>
  )
}

export default Artists