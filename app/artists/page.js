
import ArtistCard from "@/components/ArtistCard";

const Artists = async () => {
  const artistAPI = process.env.NEXT_PUBLIC_ARTIST_API_URL;

  try {
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
  } catch (error) {
    console.error(error.message);
    return <h2>Error Loading Artists</h2>
  }

}

export default Artists