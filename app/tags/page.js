"use client"

import { hashtags } from "../../utils/tags";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
  return (
    <div className="w-[60%] max-w-auto mx-auto flex flex-wrap justify-center gap-2 my-4 md:text-lg text-xs">
        {
            hashtags.map(tag =>( 
            <p 
            className=" cursor-pointer bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md"
            onClick={() => router.push(`/events?tag=${tag}`)}
            >#{tag}
            </p>
            ))
        }
    </div>
  )
}

export default page