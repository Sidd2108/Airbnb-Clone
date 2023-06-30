import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data)
        })
    }, [])
    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (

                    <Link to={`/account/bookings/${booking._id}`} className=" mb-4 flex flex-col sm:flex-row gap-4 bg-gray-200 rounded-2xl px-3 pt-3 pb-2">
                        <div className="w-52">
                            <PlaceImg className="rounded-xl" place={booking.place} />
                        </div>
                        <div className="py-3 pr-2 grow">
                            <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                            <h2 className="text-md font-normal pb-1">{booking.place.address}</h2>

                            <div className="text-md font-medium">

                                <BookingDates booking={booking} className="my-2 text-gray-700" />
                                <div className="flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-lg">
                                        Total Price: ₹{booking.price} /-
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}