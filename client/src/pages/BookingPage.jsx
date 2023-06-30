import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }

            })
        }
    }, [id])

    if (!booking) {
        return ''
    }
    return (
        <div className="my-6 xl:px-72">
            <h1 className="text-3xl font-semibold ">{booking.place.title}</h1>
            <AddressLink >{booking.place.address}</AddressLink>
            <div className="flex items-center justify-between border p-6 mt-2 mb-6 rounded-2xl shadow shadow-gray-700">
                <div>
                    <h2 className=" font-medium text-2xl mb-2">Your Booking Information :</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white font-semibold rounded-2xl">
                    <div className=" font-medium text-lg ">Total Price</div>
                    <div className="text-3xl">₹{booking.price}/-</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}