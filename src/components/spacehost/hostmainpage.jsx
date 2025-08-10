import HostListings from "./hostlistings"
import HostRequests from "./hostrequests"



export default function HostMain(Props) {
    console.log(Props.tab)
    return (
        <>
            <div className="w-full">
                {
                    Props.tab == 'Listings' ? (<HostListings />) : <HostRequests />
                }
            </div>
        </>
    )
}