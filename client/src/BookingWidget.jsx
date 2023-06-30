import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    const { user } = useContext(UserContext)


    useEffect(() => {
        if (user) {
            setName(user.name)
        }
    }, [user])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }


    async function bookThisPlace() {

        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights * place.price
        });

        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow shadow-black p-4 rounded-2xl mt-5">
            <div className="text-2xl font-semibold text-center">
                Price : ₹{place.price} / per night
            </div>
            <div className="border rounded-2xl my-2">
                <div className="flex">
                    <div className=" py-2 px-4 ">
                        <label>Check In : </label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-2 px-4 border-l">
                        <label>Check Out : </label>
                        <input type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-2 px-4 border-t">
                    <label>No. of Guests </label>
                    <input type="number"
                        value={numberOfGuests}
                        onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-2 px-4 border-t">
                        <label>Your Full Name</label>
                        <input type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)} />
                        <label>Phone No.</label>
                        <input type="tel"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)} />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary">Book this place <br />
            </button>
            <div className="text-center">
                {numberOfNights > 0 && (
                    <span className="text-lg font-medium">Total Price : ₹{numberOfNights * place.price}</span>
                )}
            </div>
        </div>
    )
}