import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        if(!id) {
            return ;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
        })

    }, [id])

    async function savePlace(ev) {
        ev.preventDefault()
        const placeData = {title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests}
        if(id) {
            //update place
            await axios.put('/places', {
                id,...placeData
            })
            setRedirect(true)
        }
        else {
            //new place
            await axios.post('/places', placeData)
            setRedirect(true)
        }
    }

    if(redirect) {
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                <h2 className="text-2xl mt-4 mb-1">Title</h2>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)}
                    placeholder="Title, for example : My lovely apartment" />
                <h2 className="text-2xl mt-4 mb-1">Address</h2>
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}
                    placeholder="Address" />
                <h2 className="text-2xl mt-4 mb-1">Photos</h2>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                <div>
                    <h2 className="text-2xl mt-4 mb-1">Description</h2>
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)}
                        placeholder='Description of this place' />
                    <h2 className="text-2xl mt-4 mb-1">Perks</h2>
                    <p className="text-gray-500 text-sm">Select the perks that applies to your place</p>
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <Perks selected={perks} onChange={setPerks} />
                    </div>
                </div>
                <h2 className="text-2xl mt-4 mb-1">Extra Info</h2>
                <p className="text-gray-500 text-sm">House rules, etc</p>
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                <h2 className="text-2xl mt-4 mb-1">Check In & Out Times</h2>
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1">Check In Time</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                            placeholder=" 14 (24hr format)" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check Out Time</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                            placeholder=" 16 (24hr format)" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max no. of Guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}
                            placeholder=" 5" />

                    </div>
                </div>
                <div className="my-4">
                    <button className=" primary">Save</button>
                </div>
            </form>
        </div>
    )
}