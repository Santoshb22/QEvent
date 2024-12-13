"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {addEventFormValidation} from "../../utils/addEventFormValidation";
import {v4 as uuidv} from "uuid";
const CreateEvent = () => {
  const randomNumber = Math.floor(Math.random() * 99) + 1;
  const [formData, setFormData] = useState({
    id: uuidv(), 
    tags: [],
    date: "",
    time: "",
    name: "",
    artist: "",
    price: "",
    location: "",
    image: `${process.env.NEXT_PUBLIC_RANDOMUSER_IMG}/${randomNumber}.jpg`
  })
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {data: session} = useSession();
  const router = useRouter();
  
  useEffect(() => {
      if(!session) router.push("/events");
  }, [router, session])


  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddTag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(tag) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
      setTag("");
    }
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const errors = addEventFormValidation(formData)
    if(Object.keys(errors).length > 0) {
      alert(Object.values(errors).map(err => ("-", err)).join("\n"));
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_EVENTS_API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
      if(!response.ok) throw new Error ("Error: ", response.status)
    } catch (error) {
      setError("Error:", error);
      alert("Event Creating Failed");
    } finally {
      setLoading(false);
      alert("Event Creation Success");
    }

    setFormData({
      tags: [],
      date: "",
      time: "",
      name: "",
      artist: "",
      price: "",
      location: "",
    })
  }

  return (
    <div className="max-w-[100%] w-[90%] mx-auto">
    <p>Welcome! Use this form to create your event.</p>
    <br />

    <div className="form md:w-2/4 w-full border p-4">
      <form onSubmit={handleCreateEvent}>
        <div className="my-2">
          <p>Image</p>
          <img 
          className="rounded"
          src={`${process.env.NEXT_PUBLIC_RANDOMUSER_IMG}/${randomNumber}.jpg`} alt = "Imgage"/>
        </div>

        <div className="my-2">
          <div>
          {formData.tags.length > 0 && formData.tags.map(tag => (
                <span className="mx-1" key={tag}>#{tag}</span>
            ))}
          </div>
          <label htmlFor="tag">Add tags: #</label>
          <input 
          onChange={(e) => setTag(e.target.value)}
          className="border rounded outline-none p-1"
          type="text" id="tag" name="tag" value={tag} placeholder="Add tags"/>
          <button 
          onClick={(e) => handleAddTag(e)}
          className="bg-blue-100 hover:bg-blue-200 py-1 px-2 rounded mx-1">
            Add
          </button>
        </div>

        <div className="my-2">
          <label htmlFor="date">Date:</label>
          <input className="border rounded outline-none p-1"
          onChange={(e) => handleInputChange(e)}
          type="date" id="date" name="date" value={formData.date}/>
        </div>

        <div className="my-2">
          <label htmlFor="time">Time:</label>
          <input
          onChange={(e) => handleInputChange(e)}
          type="time" id="time" name="time" value={formData.time}/>
        </div>
        
        <div className="my-2">
          <label htmlFor="location">Location:</label>
          <input className="border rounded outline-none p-1"
          onChange={(e) => handleInputChange(e)}
          type="text" placeholder="Add Location" id="location" name="location" value={formData.location}/>
        </div>
        
        <div className="my-2">
          <label htmlFor="name">Name:</label>
          <input className="border rounded outline-none p-1"
          onChange={(e) => handleInputChange(e)}
          type="text" placeholder="Event Name" id="name" name="name" value={formData.name}/>
        </div>

        <div className="my-2">
          <label htmlFor="artist">Artist:</label>
          <input className="border rounded outline-none p-1"
          onChange={(e) => handleInputChange(e)}
          type="text" placeholder="Artists Name" id="artist" name="artist" value={formData.artist}/>
        </div>

        <div className="my-2">
          <label htmlFor="price">Price:</label>
          <input className="border rounded outline-none p-1"
          onChange={(e) => handleInputChange(e)}
          type="number" placeholder="Amount" id="price" name="price" value={formData.price}/>
        </div>

        {
          <p className="text-red-600 font-mono ">{error}</p>
        }

        <button
        className="bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded"
        type="submit" disabled = {loading}>{loading? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  </div>
  )
}

export default CreateEvent