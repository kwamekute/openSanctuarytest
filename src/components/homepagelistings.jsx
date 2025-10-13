import property from '../assets/property.png'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function HomeListings() {
 const [listings, setListings] = useState([]);
     const navigate = useNavigate();


 useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:3000/listing");
        const data = await res.json();
        setListings(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
    fetchListings();
  }, []);
   return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Listings</h1>
<div className="flex gap-4">
  {listings.map((listing) => (
    <div
      key={listing.listing_id}
      onClick={() => navigate(`/host/listing/${listing.listing_id}`)}
      className="h-[200px] w-[200px] bg-white rounded-[5%] shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
    >
      {/* Image */}
      {listing.images?.length > 0 ? (
        <img
          src={listing.images[0]}
          alt={listing.description}
          className="h-[120px] w-full object-cover rounded-t-[5%]"
        />
      ) : (
        <div className="h-[120px] flex items-center justify-center bg-gray-100 text-gray-400">
          No Image
        </div>
      )}

      {/* Info */}
      <div className="px-2 py-1">
        <p className="text-[14px] font-bold leading-[20px] text-[#222222] truncate">
          {listing.city}
        </p>
        <p className="text-[12px] font-normal text-[#222222] truncate">
          {listing.description || "Untitled Listing"}
        </p>
        <p className="text-[12px] font-normal text-[#222222]">
          {listing.capacity} guests
        </p>
        <p className="text-[14px] font-medium text-[#222222]">
          ${listing.price}/hr
        </p>
      </div>
    </div>
  ))}
</div>


    </div>
  );
}
     