import HostListings from "./hostlistings"
import HostRequests from "./hostrequests"


export default function HostMain(Props) {
    console.log(Props.tab)
    return (
        <>
            <div className="border-red w-full h-20">
                {
                    Props.tab == 'Listings' ? <HostListings /> : <HostRequests />
                }
            </div>
        </>
    )
}