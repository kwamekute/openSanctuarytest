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
      {/* 🖼️ Image */}
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

      {/* 🏡 Info */}
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
     
//    useEffect(() => {
//     fetch("https://picsum.photos/200") // always returns a random image
//       .then((response) => {
//         // response.url gives the redirected image URL
//         setImageURL(response.url);
//       })
//       .catch((error) => console.error("Error fetching image:", error));
//   }, []);
//     return (
//         <>
//             <div className="w-full px-6">
//                 <div className="py-6">
//                     <span className="text-[20px] font-semibold leading-6 text-[#222222]">Popular Spaces</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <div className="h-[200px] w-[200px] border-red rounded-[5%]">
//                                 <img src={imageURL} alt="property" className="h-auto w-auto rounded-[5%]" />
//                                 <p className="text-[14px] font-bold leading-[20.02px] text-[#222222]">
//                                     Conference Space in Toronto
//                                 </p>
//                                 <p className="text-[14px] font-normal leading-[20.02px] text-[#222222]">
//                                     $20/hr 
//                                 </p>
//                             </div>
//                     {/* {[...Array(6)].map((_, i) => (
//                         <>
//                             <div key={i} className="h-[200px] w-[200px] border-red rounded-[5%]">
//                                 <img src={imageURL} alt="property" className="h-auto w-auto rounded-[5%]" />
//                                 <p className="text-[14px] font-bold leading-[20.02px] text-[#222222]">
//                                     Toronto
//                                 </p>
//                                 <p className="text-[14px] font-normal leading-[20.02px] text-[#222222]">
//                                     West-Wing Spaces
//                                 </p>
//                                 <p className="text-[14px] font-normal leading-[20.02px] text-[#222222]">
//                                     100 guests
//                                 </p>
//                                 <p className="text-[14px] font-normal leading-[20.02px] text-[#222222]">
//                                     $20/hr
//                                 </p>
//                             </div>

//                         </>
//                     ))} */}
//                 </div>


//             </div>
//         </>
//     )
