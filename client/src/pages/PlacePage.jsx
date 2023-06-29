import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";

export default function Placepage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })

    }, [id])

    if (!place) return ''

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed top-4 flex gap-1 py-1 px-1 bg-white text-black rounded-lg shadow shadow-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close
                        </button>
                        <h2 className=" mt-5 text-3xl font-normal">Photos of {place.title}</h2>
                    </div>
                    <div className="flex flex-col gap-4 items-center">

                        {place?.photos?.length > 0 && place.photos.map(photo => (
                            <div>
                                <img src={'http://localhost:4000/uploads/' + photo} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="-mx-6 px-8 pt-8 xl:px-72 bg-gray-100">
            <h1 className="text-3xl font-semibold">{place.title}</h1>
            <a className="flex gap-1 my-2 pb-3 font-semibold underline" target="_blank" href={'https://maps.google.com/?q=' + place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

                {place.address}
            </a>

            <div className="relative">
                <div className="grid gap-3 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                        )}
                    </div>
                    <div className="grid ">
                        {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover " src={'http://localhost:4000/uploads/' + place.photos[1]} alt="" />
                        )}
                        <div className="overflow-hidden">

                            {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-3" src={'http://localhost:4000/uploads/' + place.photos[2]} alt="" />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-2 absolute bottom-3 right-2 px-4 py-2 bg-white rounded-lg shadow shadow-black font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>

                    Show all Photos
                </button>
            </div>
            <div className="mb-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8">
                <div>
                    <div className="my-3">
                        <h2 className="font-semibold text-2xl pb-2 ">Description</h2>
                        <span className="text-lg text-gray-700">{place.description}</span>
                    </div>
                    Check-in : {place.checkIn} <br />
                    Check-out : {place.checkOut} <br />
                    Max Guests Allowed : {place.maxGuests} <br />
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>

            </div>
            <div className="bg-white -mx-8 px-8 py-6 border-t rounded-xl">

                <div>
                    <h2 className="mt-4 font-semibold text-2xl">Extra Info</h2>

                </div>
                <div className="mb-4 mt-2 text-md text-gray-600 leading-6">
                    {place.extraInfo}
                </div>
            </div>

        </div>
    )
}