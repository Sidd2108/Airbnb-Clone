import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function Placepage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })

    }, [id])

    if (!place) return ''
    return (
        <div className="-mx-6 px-8 pt-8 xl:px-72 bg-gray-100">
            <h1 className="text-3xl font-semibold">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>

            <PlaceGallery place={place} />
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-[2fr_1fr] mt-8 gap-8">
                <div>
                    <div className="my-3">
                        <h2 className="font-semibold text-2xl pb-2 ">Description</h2>
                        <span className="text-lg text-gray-700">{place.description}</span>
                    </div>
                    <span className="text-lg font-medium">Check-in</span> : {place.checkIn} {place.checkIn < 12 ? "am" : "pm"}<br />
                    <span className="text-lg font-medium">Check-out</span> : {place.checkOut} {place.checkOut < 12 ? "am" : "pm"}<br />
                    <span className="text-lg font-medium">Max Guests Allowed</span> : {place.maxGuests} <br />
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

                <div>
                    <h2 className="mt-8 mb-3 font-semibold text-2xl">Perks :</h2>

                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 justify-items-start">
                    {place.perks.map(perk => (
                        <div className=" mb-3 flex gap-2 justify-center place-items-center">
                            <input type="checkbox" checked />
                            <span className="font-medium capitalize">{perk}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}