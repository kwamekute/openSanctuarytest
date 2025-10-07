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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
           onClick={() => navigate(`host/listing/${listing.listing_id}`)}
            key={listing.listing_id}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
          >
            {/* 🖼️ First image as cover */}
            {listing.images?.length > 0 && (
              <img
                src={listing.images[0]}
                alt={listing.description}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">
                {listing.description}
              </h2>
              <p className="text-sm text-gray-600">{listing.city}</p>
              <p className="text-gray-800 font-medium mt-2">
                ${listing.price} / hr
              </p>

              {/* Show thumbnails */}
              {/* {listing.images?.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {listing.images.slice(1).map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt=""
                      className="h-16 w-16 rounded object-cover"
                    />
                  ))}
                </div>
              )} */}
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
