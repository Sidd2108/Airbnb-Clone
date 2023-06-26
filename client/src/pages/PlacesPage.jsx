import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    async function addPhotoByLink(ev) {
        ev.preventDefault()
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink})
        setAddedPhotos(prev=>{
            return [...prev, filename]
        })
        setPhotoLink('')
    
    }
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData()
        for(let i = 0; i < files.length; i++) {
            data.append('photos', files[i])

        }
        axios.post('/upload', data, {
            headers: {'Content-type' : 'multipart/form-data'}
        }).then(response=>{
            const {data: filenames} = response
            setAddedPhotos(prev=>{
                return [...prev, ...filenames];
            })
        })
    }

    return (
        <div>
            {action !== 'new' && (

                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add new Place
                    </Link>
                </div>
            )}

            {action === 'new' && (
                <div>
                    <form >
                        <h2 className="text-2xl mt-4 mb-1">Title</h2>
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)}
                         placeholder="Title, for example : My lovely apartment" />
                        <h2 className="text-2xl mt-4 mb-1">Address</h2>
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}
                         placeholder="Address" />
                        <h2 className="text-2xl mt-4 mb-1">Photos</h2>
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}
                            placeholder="Upload photos via Link .....jpg" />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-full">Add&nbsp;photos</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link=>(
                                <div className="h-32 flex">
                                    <img className="rounded-2xl w-full object-cover" src={"http://localhost:4000/uploads/" + link} alt="" />
                                </div>
                            ))}
                            <label className=" h-32 cursor-pointer flex items-center gap-2 justify-center border bg-transparent p-2 rounded-2xl text-xl text-gray-600">
                                <input type="file" multiple className="hidden" onChange = {uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </label>
                        </div>
                        <div>
                            <h2 className="text-2xl mt-4 mb-1">Description</h2>
                            <textarea value={description} onChange={ev => setDescription(ev.target.value)}
                            placeholder='Description of this place' />
                            <h2 className="text-2xl mt-4 mb-1">Perks</h2>
                            <p className="text-gray-500 text-sm">Select the perks that applies to your place</p>
                            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                                <Perks selected={perks} onChange={setPerks}/>
                            </div>
                        </div>
                        <h2 className="text-2xl mt-4 mb-1">Extra Info</h2>
                            <p className="text-gray-500 text-sm">House rules, etc</p>
                            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        <h2 className="text-2xl mt-4 mb-1">Check In & Out Times</h2>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check In Time</h3>
                                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                                placeholder=" 14 (24hr format)"/>
                            </div>
                            <div>
                            <h3 className="mt-2 -mb-1">Check Out Time</h3>
                                <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                                 placeholder=" 16 (24hr format)"/>
                            </div>
                            <div>
                            <h3 className="mt-2 -mb-1">Max no. of Guests</h3>
                                <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}
                                placeholder=" 5"/>

                            </div>
                        </div>
                        <div className="my-4">
                        <button className=" primary">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}