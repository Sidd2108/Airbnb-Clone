import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile'
    }
    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null)
    }

    if (!ready) {
        return ('Loading.....')
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }



    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="inline-flex items-center flex-col gap-1 bg-gray-100 p-3 mx-3 rounded-xl">
                    <div className="">
                        <span className="text-xl font-medium ">My Details : </span> <br />
                        <span className="text-lg font-normal"> Name : <span className="font-medium text-xl">{user.name}</span></span> <br />
                        <span className="text-lg font-normal"> Email : <span className="font-medium text-xl">{user.email}</span></span> <br />

                    </div>
                    <button onClick={logout} className=" bg-primary mt-3 p-2 w-3/6 rounded-2xl text-lg text-white">Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <div>
                    <PlacesPage />
                </div>
            )}
        </div>
    );
}