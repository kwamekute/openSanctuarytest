import HostListings from "./hostlistings"
import HostRequests from "./hostrequests"
import HostProfile from "./hostprofile";



export default function HostMain(Props) {
    console.log(Props.tab);
    console.log(Props.user);
   const content =
    Props.tab === "HostProfile" ? (
      <HostProfile user={Props.user} />
    ) : Props.tab === "Listings" ? (
      <HostListings user={Props.user} />
    ) : (
      <HostRequests user={Props.user} />
    );

  return (
    <div className="w-full">
      {content}
    </div>
  );
}
